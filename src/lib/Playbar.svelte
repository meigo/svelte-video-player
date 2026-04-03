<script lang="ts">
	import throttle from './libs/throttle.js';
	import { getContext } from 'svelte';
	import type { PlayerConfig, Chapter } from './types.js';
	import { formatTime } from './utils.js';

	import Bar from './Bar.svelte';
	import Thumb from './Thumb.svelte';

	interface Props {
		isBottomControlsVisible: boolean;
		marginX?: string;
		currentTime?: number;
		duration?: number;
		paused?: boolean;
		isScrubbing?: boolean;
		chapters?: Chapter[];
		onpointerup?: () => void;
	}

	let {
		isBottomControlsVisible,
		marginX = '10px',
		currentTime = $bindable(0),
		duration = 0,
		paused = $bindable(true),
		isScrubbing = $bindable(false),
		chapters = [],
		onpointerup
	}: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let playbarElement: HTMLDivElement;
	let isPointerDown = $state(false);
	let isHovering = $state(false);
	let hoverPercent = $state(0);
	let rect: DOMRect;
	let wasPaused: boolean;
	let _currentTimePercentage = $state(0);

	let hoverTime = $derived(duration * hoverPercent);
	let hoverTimeText = $derived(formatTime(hoverTime, duration >= 3600));
	let hoverChapter = $derived(
		chapters.length > 0
			? [...chapters].reverse().find((c) => hoverTime >= c.time)
			: undefined
	);

	const updateTimeThrottled = throttle(
		(time: number) => {
			_currentTimePercentage = time / duration;
		},
		250,
		true
	);

	$effect(() => {
		if (isBottomControlsVisible) {
			if (isScrubbing) {
				_currentTimePercentage = currentTime / duration;
			} else {
				updateTimeThrottled(currentTime);
			}
		}
	});

	function onPointerDown(e: PointerEvent) {
		e.preventDefault();
		isPointerDown = true;
		wasPaused = paused;
		paused = true;
		rect = playbarElement.getBoundingClientRect();
		pointerXToCurrentTime(e.clientX);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isPointerDown) return;
		isScrubbing = true;
		pointerXToCurrentTime(e.clientX);
	}

	function onWindowPointerUp() {
		if (!isPointerDown) return;
		paused = wasPaused;
		isPointerDown = false;
		isScrubbing = false;
		onpointerup?.();
	}

	function onPlaybarPointerMove(e: PointerEvent) {
		if (!playbarElement) return;
		const r = playbarElement.getBoundingClientRect();
		hoverPercent = Math.min(Math.max((e.clientX - r.x) / r.width, 0), 1);
	}

	function onPlaybarPointerEnter() {
		isHovering = true;
	}

	function onPlaybarPointerLeave() {
		isHovering = false;
	}

	function pointerXToCurrentTime(clientX: number) {
		const value = Math.min(Math.max(clientX - rect.x, 0), rect.width) / rect.width;
		currentTime = duration * value;
	}
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onWindowPointerUp} />

<div
	class="playbar"
	tabindex="0"
	role="slider"
	aria-label="Video progress"
	aria-valuemin={0}
	aria-valuemax={Math.round(duration)}
	aria-valuenow={Math.round(currentTime)}
	aria-valuetext={formatTime(currentTime, duration >= 3600)}
	bind:this={playbarElement}
	onpointerdown={onPointerDown}
	onpointermove={onPlaybarPointerMove}
	onpointerenter={onPlaybarPointerEnter}
	onpointerleave={onPlaybarPointerLeave}
	style="margin:0 {marginX};"
>
	{#if isHovering && duration > 0}
		<div class="tooltip" style="left:{hoverPercent * 100}%;">
			<span class="tooltip-text">{hoverTimeText}</span>
			{#if hoverChapter}
				<span class="tooltip-chapter">{hoverChapter.label}</span>
			{/if}
		</div>
	{/if}
	<div class="bars" style="height:{cfg.trackHeight}; outline-color:{cfg.focusColor};">
		<Bar color={cfg.barsBgColor} opacity={1} value={1} />
		<Bar color={cfg.color} value={_currentTimePercentage} />
		{#each chapters as chapter (chapter.time)}
			{@const pos = duration > 0 ? chapter.time / duration : 0}
			{#if pos > 0 && pos < 1}
				<div class="chapter-marker" style="left:{pos * 100}%;"></div>
			{/if}
		{/each}
	</div>
	<Thumb positionValue={_currentTimePercentage} active={isPointerDown} />
</div>

<style>
	.playbar {
		position: relative;
		min-width: 50px;
		height: 100%;
		flex-grow: 4;
		cursor: pointer;
		outline: none;
		touch-action: none;
	}

	.playbar:focus-visible .bars {
		outline-style: dotted;
	}

	.bars {
		position: relative;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 9999px;
		overflow: hidden;
		outline-offset: 3px;
		outline-width: 2px;
		outline-style: none;
	}

	.chapter-marker {
		position: absolute;
		top: 0;
		width: 2px;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		transform: translateX(-50%);
		z-index: 1;
	}

	.tooltip {
		position: absolute;
		bottom: 100%;
		transform: translateX(-50%);
		margin-bottom: 8px;
		padding: 4px 8px;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 4px;
		pointer-events: none;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		z-index: 2;
	}

	.tooltip-text {
		font-family: 'Lucida Sans Typewriter', 'Lucida Console', monaco, 'Bitstream Vera Sans Mono',
			monospace;
		font-size: 0.75rem;
		line-height: 1rem;
		color: white;
	}

	.tooltip-chapter {
		font-size: 0.7rem;
		line-height: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
	}
</style>
