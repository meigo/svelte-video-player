<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		positionValue?: number;
		active?: boolean;
	}

	let { positionValue = 0, active = false }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let tx = $derived(positionValue * 100);
</script>

<div class="thumb-wrapper" style="transform: translateX({tx}%);">
	<div
		class:active
		class="thumb"
		style="width:{cfg.thumbSize}; height:{cfg.thumbSize}; background-color:{cfg.color}; border-color:{cfg.color};"
	></div>
</div>

<style>
	.thumb-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		pointer-events: none;
	}

	.thumb {
		position: relative;
		border-style: none;
		border-radius: 50%;
		border-width: 2px;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.active {
		border-style: solid;
	}
</style>
