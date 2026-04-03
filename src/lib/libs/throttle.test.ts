import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import throttle from './throttle.js';

describe('throttle', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('calls function after interval when callFirst is false', () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 100);

		throttled();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('calls function immediately when callFirst is true', () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 100, true);

		throttled();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('suppresses calls within interval', () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 100, true);

		throttled();
		throttled();
		throttled();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('allows call again after interval expires', () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 100, true);

		throttled();
		expect(fn).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(100);
		throttled();
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('passes arguments to the function', () => {
		const fn = vi.fn();
		const throttled = throttle(fn, 100, true);

		throttled('a', 'b');
		expect(fn).toHaveBeenCalledWith('a', 'b');
	});

	it('returns function result when callFirst is true', () => {
		const fn = vi.fn(() => 42);
		const throttled = throttle(fn, 100, true);

		expect(throttled()).toBe(42);
	});

	it('returns undefined when throttled', () => {
		const fn = vi.fn(() => 42);
		const throttled = throttle(fn, 100, true);

		throttled(); // first call
		expect(throttled()).toBeUndefined(); // throttled
	});
});
