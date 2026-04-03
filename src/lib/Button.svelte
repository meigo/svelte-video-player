<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		round?: boolean;
		'aria-label'?: string;
		onpointerup?: () => void;
		children?: Snippet;
	}

	let { round = false, 'aria-label': ariaLabel, onpointerup, children }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let offsetHeight = $state(0);

	function onPointerDown(e: PointerEvent) {
		e.preventDefault();
	}
</script>

<button
	type="button"
	class="button"
	style="width:{offsetHeight}px; min-width:{offsetHeight}px; background-color:{cfg.color}; border-color:{cfg.focusColor}; border-radius:{round ? '9999px' : '10px'};"
	aria-label={ariaLabel}
	title={ariaLabel}
	bind:offsetHeight
	onpointerdown={onPointerDown}
	{onpointerup}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.button {
		box-sizing: border-box;
		position: relative;
		height: 100%;
		border-style: none;
		border-radius: 10px;
		border-width: 2px;
		outline: none;
		cursor: pointer;
		padding: 0;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	@media (hover: hover) and (pointer: fine) {
		.button:focus-visible {
			border-style: solid;
		}
	}
</style>
