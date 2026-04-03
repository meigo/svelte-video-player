import type { SourceAdapter, QualityLevel } from '../types.js';

interface DashBitrateInfo {
	height: number;
	width: number;
	bitrate: number;
	qualityIndex: number;
}

interface DashInstance {
	initialize(video: HTMLVideoElement, src: string, autoPlay: boolean): void;
	reset(): void;
	destroy(): void;
	getBitrateInfoListFor(type: string): DashBitrateInfo[];
	getQualityFor(type: string): number;
	setQualityFor(type: string, index: number, replace?: boolean): void;
	updateSettings(settings: Record<string, unknown>): void;
	on(event: string, callback: (...args: unknown[]) => void): void;
	off(event: string, callback: (...args: unknown[]) => void): void;
}

interface MediaPlayerFunction {
	(): DashFactory;
}

interface DashFactory {
	create(): DashInstance;
}

interface DashModule {
	MediaPlayer: MediaPlayerFunction;
}

export class DashAdapter implements SourceAdapter {
	private dash: DashInstance | null = null;
	private video: HTMLVideoElement | null = null;
	private _levels: QualityLevel[] = [];
	private _currentLevel: number = -1;
	private dashjs: DashFactory | null = null;

	get levels(): QualityLevel[] {
		return this._levels;
	}

	get currentLevel(): number {
		return this._currentLevel;
	}

	async attach(video: HTMLVideoElement, src: string): Promise<void> {
		this.video = video;

		if (!this.dashjs) {
			const mod = await import('dashjs') as unknown as DashModule;
			this.dashjs = mod.MediaPlayer();
		}

		this.dash = this.dashjs.create();
		this.dash.initialize(video, src, false);

		this.dash.on('streamInitialized', () => {
			if (this.dash) {
				const bitrateList = this.dash.getBitrateInfoListFor('video');
				this._levels = bitrateList.map((b) => ({
					height: b.height,
					width: b.width,
					bitrate: b.bitrate,
					label: `${b.height}p`
				}));
			}
		});

		this.dash.on('qualityChangeRendered', () => {
			if (this.dash) {
				this._currentLevel = this.dash.getQualityFor('video');
			}
		});
	}

	detach(): void {
		if (this.dash) {
			this.dash.reset();
		}
	}

	setLevel(index: number): void {
		if (this.dash) {
			if (index === -1) {
				this.dash.updateSettings({
					streaming: { abr: { autoSwitchBitrate: { video: true } } }
				});
			} else {
				this.dash.updateSettings({
					streaming: { abr: { autoSwitchBitrate: { video: false } } }
				});
				this.dash.setQualityFor('video', index);
			}
		}
	}

	destroy(): void {
		if (this.dash) {
			this.dash.destroy();
			this.dash = null;
		}
		this._levels = [];
		this._currentLevel = -1;
		this.video = null;
	}
}
