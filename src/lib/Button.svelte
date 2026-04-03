<script lang="ts">
	import { getPlayerConfig } from './context.js';
	import type { Snippet } from 'svelte';

	interface Props {
		'aria-label'?: string;
		onpointerup?: () => void;
		children?: Snippet;
	}

	let { 'aria-label': ariaLabel, onpointerup, children }: Props = $props();

	const cfg = getPlayerConfig();

	let offsetHeight = $state(0);

	function onPointerDown(e: PointerEvent) {
		e.preventDefault();
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onpointerup?.();
		}
	}
</script>

<button
	type="button"
	class="button"
	style="width:{offsetHeight}px; min-width:{offsetHeight}px; background-color:{cfg.color}; border-color:{cfg.focusColor}; border-radius:{cfg.buttonBorderRadius};"
	aria-label={ariaLabel}
	title={ariaLabel}
	bind:offsetHeight
	onpointerdown={onPointerDown}
	{onpointerup}
	onkeydown={onKeyDown}
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
		border-width: 3px;
		outline: none;
		cursor: pointer;
		padding: 8px;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	@media (hover: hover) and (pointer: fine) {
		.button:hover::after {
			content: '';
			position: absolute;
			inset: 0;
			background-color: rgba(255, 255, 255, 0.1);
			border-radius: inherit;
		}

		.button:focus-visible {
			border-style: solid;
		}
	}
</style>
