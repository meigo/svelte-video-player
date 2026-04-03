/*!
 * just-debounce-it
 * Copyright (c) 2016 angus croll The MIT License (MIT)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait: number,
	callFirst?: boolean
): (...args: Parameters<T>) => ReturnType<T> | undefined {
	let timeout: ReturnType<typeof setTimeout> | null;
	return function (this: unknown, ...args: Parameters<T>): ReturnType<T> | undefined {
		if (!wait) {
			return fn.apply(this, args) as ReturnType<T>;
		}
		const callNow = callFirst && !timeout;
		clearTimeout(timeout!);
		timeout = setTimeout(() => {
			timeout = null;
			if (!callNow) {
				fn.apply(this, args);
			}
		}, wait);

		if (callNow) {
			return fn.apply(this, args) as ReturnType<T>;
		}
		return undefined;
	};
}
