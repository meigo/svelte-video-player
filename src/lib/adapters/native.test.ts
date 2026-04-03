import { describe, it, expect, vi } from 'vitest';
import { NativeAdapter } from './native.js';

function createMockVideo(): HTMLVideoElement {
	return {
		src: '',
		load: vi.fn(),
		removeAttribute: vi.fn()
	} as unknown as HTMLVideoElement;
}

describe('NativeAdapter', () => {
	it('has no quality levels', () => {
		const adapter = new NativeAdapter();
		expect(adapter.levels).toEqual([]);
	});

	it('currentLevel is -1', () => {
		const adapter = new NativeAdapter();
		expect(adapter.currentLevel).toBe(-1);
	});

	it('attach sets video src', () => {
		const adapter = new NativeAdapter();
		const video = createMockVideo();

		adapter.attach(video, 'test.mp4');
		expect(video.src).toBe('test.mp4');
	});

	it('detach removes src and reloads', () => {
		const adapter = new NativeAdapter();
		const video = createMockVideo();

		adapter.attach(video, 'test.mp4');
		adapter.detach();

		expect(video.removeAttribute).toHaveBeenCalledWith('src');
		expect(video.load).toHaveBeenCalled();
	});

	it('detach does nothing if no video attached', () => {
		const adapter = new NativeAdapter();
		// Should not throw
		adapter.detach();
	});

	it('destroy detaches and clears reference', () => {
		const adapter = new NativeAdapter();
		const video = createMockVideo();

		adapter.attach(video, 'test.mp4');
		adapter.destroy();

		expect(video.removeAttribute).toHaveBeenCalledWith('src');
		// After destroy, detach should be safe to call again (no-op)
		adapter.detach();
	});

	it('setLevel is a no-op', () => {
		const adapter = new NativeAdapter();
		// Should not throw
		adapter.setLevel();
	});
});
