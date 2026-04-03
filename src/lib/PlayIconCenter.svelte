<script lang="ts">
	import { getPlayerConfig } from './context.js';
	import { fade } from 'svelte/transition';
	import PlayPauseIcon from './PlayPauseIcon.svelte';

	interface Props {
		hidden?: boolean;
	}

	let { hidden = false }: Props = $props();

	const cfg = getPlayerConfig();
</script>

{#if !hidden}
	<div
		class="player-icon"
		style="background-color:{cfg.color}; border-color:{cfg.focusColor};"
		transition:fade={{ duration: 500 }}
	>
		<PlayPauseIcon paused />
	</div>
{/if}

<style>
	.player-icon {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 100%;
		border-style: none;
		border-radius: 9999px;
		border-width: 2px;
		padding: 20%;
	}
</style>
