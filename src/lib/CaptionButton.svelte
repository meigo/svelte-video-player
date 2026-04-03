<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig, TextTrackConfig } from './types.js';
	import Button from './Button.svelte';
	import CaptionIcon from './CaptionIcon.svelte';

	interface Props {
		tracks: TextTrackConfig[];
		activeTrackIndex: number;
		onselect?: (index: number) => void;
	}

	let { tracks, activeTrackIndex, onselect }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let menuOpen = $state(false);
	let active = $derived(activeTrackIndex >= 0);

	function onButtonPointerUp() {
		if (tracks.length === 1) {
			onselect?.(active ? -1 : 0);
		} else {
			menuOpen = !menuOpen;
		}
	}

	function selectTrack(index: number) {
		onselect?.(index);
		menuOpen = false;
	}

	function onWindowPointerDown() {
		if (menuOpen) menuOpen = false;
	}
</script>

<svelte:window onpointerdown={onWindowPointerDown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="caption-wrapper"
	onpointerdown={(e) => e.stopPropagation()}
>
	<Button onpointerup={onButtonPointerUp} aria-label={active ? 'Disable captions' : 'Enable captions'}>
		<CaptionIcon {active} />
	</Button>
	{#if menuOpen}
		<div class="caption-menu" style="background-color:{cfg.color}; border-color:{cfg.focusColor};">
			<button
				type="button"
				class="menu-item"
				class:selected={activeTrackIndex === -1}
				style="color:{cfg.iconColor};"
				onpointerup={() => selectTrack(-1)}
			>Off</button>
			{#each tracks as track, i (track.srclang)}
				<button
					type="button"
					class="menu-item"
					class:selected={activeTrackIndex === i}
					style="color:{cfg.iconColor};"
					onpointerup={() => selectTrack(i)}
				>{track.label}</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.caption-wrapper {
		position: relative;
		height: 100%;
	}

	.caption-menu {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 4px;
		border-radius: 6px;
		border: 1px solid;
		overflow: hidden;
		white-space: nowrap;
	}

	.menu-item {
		display: block;
		width: 100%;
		padding: 6px 14px;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 0.8rem;
		text-align: left;
	}

	.menu-item:hover {
		filter: brightness(1.3);
	}

	.menu-item.selected {
		font-weight: bold;
	}
</style>
