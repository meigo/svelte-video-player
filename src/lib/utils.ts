import type { VideoSource } from './types.js';

const mimeTypes: Record<string, string> = {
	mp4: 'video/mp4',
	ogv: 'video/ogg',
	webm: 'video/webm',
	m3u8: 'application/x-mpegURL',
	mpd: 'application/dash+xml'
};

export function extensionToMimeType(filename: string): string | undefined {
	const ext = (filename.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
	return ext ? mimeTypes[ext] : undefined;
}

export function prepareVideoSources(source: string | string[] | undefined): VideoSource[] {
	if (!source) return [];
	const sources = Array.isArray(source) ? source : [source];
	return sources.map((item) => {
		const type = extensionToMimeType(item);
		return type ? { src: item, type } : { src: item };
	});
}

let counter = 0;
export function uid(): string {
	return `svp-${++counter}`;
}

export async function preloadImage(url: string): Promise<HTMLImageElement | void> {
	if (!url) return;
	return new Promise((resolve) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image), { once: true });
		image.addEventListener('error', () => resolve(), { once: true });
		image.src = url;
	});
}

export function formatTime(seconds: number = 0, showHours: boolean = false): string {
	const s = new Date(seconds * 1000).toISOString().substring(11, 19);
	return showHours ? s : s.substring(3);
}
