import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import debounce from './debounce.js';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('delays function call', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('resets timer on repeated calls', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced();
		vi.advanceTimersByTime(50);
		debounced();
		vi.advanceTimersByTime(50);
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(50);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('calls immediately when callFirst is true', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100, true);

		debounced();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('does not call again within wait period when callFirst is true', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100, true);

		debounced();
		debounced();
		debounced();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('allows new call after wait period when callFirst is true', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100, true);

		debounced();
		expect(fn).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(100);
		debounced();
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('calls immediately when wait is 0', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 0);

		debounced();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('passes arguments to the function', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced('a', 'b');
		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledWith('a', 'b');
	});

	it('returns function result when callFirst is true', () => {
		const fn = vi.fn(() => 42);
		const debounced = debounce(fn, 100, true);

		expect(debounced()).toBe(42);
	});

	it('returns undefined when not callFirst', () => {
		const fn = vi.fn(() => 42);
		const debounced = debounce(fn, 100);

		expect(debounced()).toBeUndefined();
	});
});
