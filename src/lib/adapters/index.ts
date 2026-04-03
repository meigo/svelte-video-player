import type { SourceAdapter } from '../types.js';
import { NativeAdapter } from './native.js';

export async function createAdapter(mimeType?: string): Promise<SourceAdapter> {
	if (mimeType === 'application/x-mpegURL') {
		const { HlsAdapter } = await import('./hls.js');
		return new HlsAdapter();
	}
	if (mimeType === 'application/dash+xml') {
		const { DashAdapter } = await import('./dash.js');
		return new DashAdapter();
	}
	return new NativeAdapter();
}

export { NativeAdapter } from './native.js';
export type { SourceAdapter } from '../types.js';
