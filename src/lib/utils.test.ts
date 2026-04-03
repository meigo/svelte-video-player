import { describe, it, expect, vi } from 'vitest';
import { extensionToMimeType, prepareVideoSources, formatTime, uid, preloadImage } from './utils.js';

describe('extensionToMimeType', () => {
	it('returns correct mime type for mp4', () => {
		expect(extensionToMimeType('video.mp4')).toBe('video/mp4');
	});

	it('returns correct mime type for webm', () => {
		expect(extensionToMimeType('video.webm')).toBe('video/webm');
	});

	it('returns correct mime type for ogv', () => {
		expect(extensionToMimeType('video.ogv')).toBe('video/ogg');
	});

	it('returns correct mime type for m3u8', () => {
		expect(extensionToMimeType('stream.m3u8')).toBe('application/x-mpegURL');
	});

	it('returns undefined for unknown extension', () => {
		expect(extensionToMimeType('video.avi')).toBeUndefined();
	});

	it('handles URLs with query params', () => {
		expect(extensionToMimeType('video.mp4?token=abc')).toBe('video/mp4');
	});

	it('handles URLs with hash', () => {
		expect(extensionToMimeType('video.webm#t=10')).toBe('video/webm');
	});

	it('returns undefined for no extension', () => {
		expect(extensionToMimeType('https://example.com/stream')).toBeUndefined();
	});

	it('returns correct mime type for mpd', () => {
		expect(extensionToMimeType('stream.mpd')).toBe('application/dash+xml');
	});

	it('handles full URLs with paths', () => {
		expect(extensionToMimeType('https://cdn.example.com/videos/test.mp4')).toBe('video/mp4');
	});

	it('handles URLs with both query params and hash', () => {
		expect(extensionToMimeType('video.mp4?token=abc#t=10')).toBe('video/mp4');
	});
});

describe('prepareVideoSources', () => {
	it('returns empty array for undefined', () => {
		expect(prepareVideoSources(undefined)).toEqual([]);
	});

	it('returns empty array for empty string', () => {
		expect(prepareVideoSources('')).toEqual([]);
	});

	it('handles single string source', () => {
		expect(prepareVideoSources('video.mp4')).toEqual([
			{ src: 'video.mp4', type: 'video/mp4' }
		]);
	});

	it('handles array of sources', () => {
		const result = prepareVideoSources(['video.mp4', 'video.webm']);
		expect(result).toEqual([
			{ src: 'video.mp4', type: 'video/mp4' },
			{ src: 'video.webm', type: 'video/webm' }
		]);
	});

	it('handles source without extension', () => {
		expect(prepareVideoSources('https://example.com/stream')).toEqual([
			{ src: 'https://example.com/stream' }
		]);
	});

	it('handles mixed sources with and without extensions', () => {
		const result = prepareVideoSources(['video.mp4', 'https://example.com/stream']);
		expect(result).toEqual([
			{ src: 'video.mp4', type: 'video/mp4' },
			{ src: 'https://example.com/stream' }
		]);
	});

	it('handles empty array', () => {
		expect(prepareVideoSources([])).toEqual([]);
	});

	it('handles HLS source', () => {
		expect(prepareVideoSources('stream.m3u8')).toEqual([
			{ src: 'stream.m3u8', type: 'application/x-mpegURL' }
		]);
	});

	it('handles DASH source', () => {
		expect(prepareVideoSources('stream.mpd')).toEqual([
			{ src: 'stream.mpd', type: 'application/dash+xml' }
		]);
	});
});

describe('formatTime', () => {
	it('formats zero seconds', () => {
		expect(formatTime(0)).toBe('00:00');
	});

	it('formats seconds under a minute', () => {
		expect(formatTime(35)).toBe('00:35');
	});

	it('formats minutes and seconds', () => {
		expect(formatTime(125)).toBe('02:05');
	});

	it('formats with hours when flag is set', () => {
		expect(formatTime(3661, true)).toBe('01:01:01');
	});

	it('shows only minutes:seconds by default', () => {
		expect(formatTime(3661, false)).toBe('01:01');
	});

	it('formats with leading zeros', () => {
		expect(formatTime(5)).toBe('00:05');
	});

	it('handles exactly one hour', () => {
		expect(formatTime(3600, true)).toBe('01:00:00');
	});

	it('defaults to zero when called with no args', () => {
		expect(formatTime()).toBe('00:00');
	});

	it('handles large durations', () => {
		expect(formatTime(36000, true)).toBe('10:00:00');
	});
});

describe('uid', () => {
	it('returns unique IDs', () => {
		const id1 = uid();
		const id2 = uid();
		expect(id1).not.toBe(id2);
	});

	it('returns string starting with svp-', () => {
		expect(uid()).toMatch(/^svp-/);
	});

	it('generates sequential IDs', () => {
		const id1 = uid();
		const id2 = uid();
		const num1 = parseInt(id1.replace('svp-', ''));
		const num2 = parseInt(id2.replace('svp-', ''));
		expect(num2).toBe(num1 + 1);
	});
});

describe('preloadImage', () => {
	it('resolves with undefined for empty url', async () => {
		const result = await preloadImage('');
		expect(result).toBeUndefined();
	});

	it('creates an Image and sets src', async () => {
		const listeners: Record<string, EventListener> = {};
		const mockImage = {
			addEventListener: vi.fn((event: string, handler: EventListener) => {
				listeners[event] = handler;
			}),
			set src(value: string) {
				// Simulate successful load
				if (listeners['load']) {
					listeners['load'](new Event('load'));
				}
			}
		};

		vi.spyOn(globalThis, 'Image').mockImplementation(() => mockImage as unknown as HTMLImageElement);

		const result = await preloadImage('test.jpg');
		expect(result).toBe(mockImage);

		vi.restoreAllMocks();
	});

	it('resolves with undefined on error', async () => {
		const listeners: Record<string, EventListener> = {};
		const mockImage = {
			addEventListener: vi.fn((event: string, handler: EventListener) => {
				listeners[event] = handler;
			}),
			set src(_value: string) {
				if (listeners['error']) {
					listeners['error'](new Event('error'));
				}
			}
		};

		vi.spyOn(globalThis, 'Image').mockImplementation(() => mockImage as unknown as HTMLImageElement);

		const result = await preloadImage('bad.jpg');
		expect(result).toBeUndefined();

		vi.restoreAllMocks();
	});
});
