import { describe, it, expect } from 'vitest';
import { createAdapter, NativeAdapter } from './index.js';

describe('createAdapter', () => {
	it('returns NativeAdapter for undefined mime type', async () => {
		const adapter = await createAdapter();
		expect(adapter).toBeInstanceOf(NativeAdapter);
	});

	it('returns NativeAdapter for mp4', async () => {
		const adapter = await createAdapter('video/mp4');
		expect(adapter).toBeInstanceOf(NativeAdapter);
	});

	it('returns NativeAdapter for unknown mime type', async () => {
		const adapter = await createAdapter('video/unknown');
		expect(adapter).toBeInstanceOf(NativeAdapter);
	});
});
