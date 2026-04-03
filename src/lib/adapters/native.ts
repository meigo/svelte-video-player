import type { SourceAdapter, QualityLevel } from '../types.js';

export class NativeAdapter implements SourceAdapter {
	private video: HTMLVideoElement | null = null;

	get levels(): QualityLevel[] {
		return [];
	}

	get currentLevel(): number {
		return -1;
	}

	attach(video: HTMLVideoElement, src: string): void {
		this.video = video;
		video.src = src;
	}

	detach(): void {
		if (this.video) {
			this.video.removeAttribute('src');
			this.video.load();
		}
	}

	setLevel(): void {
		// No quality selection for native playback
	}

	destroy(): void {
		this.detach();
		this.video = null;
	}
}
