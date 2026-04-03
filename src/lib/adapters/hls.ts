import type { SourceAdapter, QualityLevel } from '../types.js';

interface HlsEvents {
	MANIFEST_PARSED: string;
	LEVEL_SWITCHED: string;
}

interface HlsLevel {
	height: number;
	width: number;
	bitrate: number;
}

interface HlsInstance {
	loadSource(src: string): void;
	attachMedia(video: HTMLVideoElement): void;
	detachMedia(): void;
	destroy(): void;
	on(event: string, callback: (...args: unknown[]) => void): void;
	off(event: string, callback: (...args: unknown[]) => void): void;
	levels: HlsLevel[];
	currentLevel: number;
}

interface HlsConstructor {
	new (): HlsInstance;
	isSupported(): boolean;
	Events: HlsEvents;
}

export class HlsAdapter implements SourceAdapter {
	private hls: HlsInstance | null = null;
	private video: HTMLVideoElement | null = null;
	private _levels: QualityLevel[] = [];
	private _currentLevel: number = -1;
	private Hls: HlsConstructor | null = null;

	get levels(): QualityLevel[] {
		return this._levels;
	}

	get currentLevel(): number {
		return this._currentLevel;
	}

	async attach(video: HTMLVideoElement, src: string): Promise<void> {
		this.video = video;

		// Native HLS support (Safari)
		if (video.canPlayType('application/vnd.apple.mpegURL')) {
			video.src = src;
			return;
		}

		if (!this.Hls) {
			// @ts-expect-error -- hls.js is an optional peer dependency
			const mod = await import('hls.js');
			this.Hls = (mod.default || mod) as unknown as HlsConstructor;
		}

		if (!this.Hls.isSupported()) {
			video.src = src;
			return;
		}

		this.hls = new this.Hls();

		this.hls.on(this.Hls.Events.MANIFEST_PARSED, () => {
			if (this.hls) {
				this._levels = this.hls.levels.map((l) => ({
					height: l.height,
					width: l.width,
					bitrate: l.bitrate,
					label: `${l.height}p`
				}));
			}
		});

		this.hls.on(this.Hls.Events.LEVEL_SWITCHED, (...args: unknown[]) => {
			const data = args[1] as { level: number };
			this._currentLevel = data.level;
		});

		this.hls.loadSource(src);
		this.hls.attachMedia(video);
	}

	detach(): void {
		if (this.hls) {
			this.hls.detachMedia();
		} else if (this.video) {
			this.video.removeAttribute('src');
			this.video.load();
		}
	}

	setLevel(index: number): void {
		if (this.hls) {
			this.hls.currentLevel = index;
		}
	}

	destroy(): void {
		if (this.hls) {
			this.hls.destroy();
			this.hls = null;
		}
		this._levels = [];
		this._currentLevel = -1;
		this.video = null;
	}
}
