<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		playbackRate: number;
		onpointerup?: () => void;
	}

	let { playbackRate, onpointerup }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let offsetHeight = $state(0);

	function onPointerDown(e: PointerEvent) {
		e.preventDefault();
	}
</script>

<button
	type="button"
	class="rate-button"
	style="min-width:{offsetHeight}px; background-color:{cfg.color}; border-color:{cfg.focusColor};"
	aria-label="Playback rate {playbackRate}x"
	title="Playback rate {playbackRate}x"
	bind:offsetHeight
	onpointerdown={onPointerDown}
	{onpointerup}
>
	<span class="rate-text" style="color:{cfg.iconColor};">{playbackRate}×</span>
</button>

<style>
	.rate-button {
		box-sizing: border-box;
		position: relative;
		height: 100%;
		border-style: none;
		border-radius: 10px;
		border-width: 2px;
		outline: none;
		cursor: pointer;
		padding: 0 6px;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	@media (hover: hover) and (pointer: fine) {
		.rate-button:focus-visible {
			border-style: solid;
		}
	}

	.rate-text {
		font-family: 'Lucida Sans Typewriter', 'Lucida Console', monaco, 'Bitstream Vera Sans Mono',
			monospace;
		font-size: 0.85rem;
		line-height: 1rem;
		white-space: nowrap;
		user-select: none;
	}
</style>
