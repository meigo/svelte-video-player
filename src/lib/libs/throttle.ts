/*!
 * just-throttle
 * Copyright (c) 2016 angus croll The MIT License (MIT)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function throttle<T extends (...args: any[]) => any>(
	fn: T,
	interval: number,
	callFirst?: boolean
): (...args: Parameters<T>) => ReturnType<T> | undefined {
	let wait = false;
	let callNow = false;
	return function (this: unknown, ...args: Parameters<T>): ReturnType<T> | undefined {
		callNow = callFirst! && !wait;
		if (!wait) {
			wait = true;
			setTimeout(() => {
				wait = false;
				if (!callFirst) {
					fn.apply(this, args);
				}
			}, interval);
		}
		if (callNow) {
			callNow = false;
			return fn.apply(this, args) as ReturnType<T>;
		}
		return undefined;
	};
}
