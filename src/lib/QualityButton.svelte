<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig, QualityLevel } from './types.js';
	import Button from './Button.svelte';
	import QualityIcon from './QualityIcon.svelte';

	interface Props {
		levels: QualityLevel[];
		currentLevel: number;
		onselect?: (index: number) => void;
	}

	let { levels, currentLevel, onselect }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');

	let menuOpen = $state(false);

	function onButtonPointerUp() {
		menuOpen = !menuOpen;
	}

	function selectLevel(index: number) {
		onselect?.(index);
		menuOpen = false;

		// Persist preference
		try {
			localStorage.setItem('svp-quality', String(index));
		} catch {
			// localStorage not available
		}
	}

	function onWindowPointerDown() {
		if (menuOpen) menuOpen = false;
	}

	let currentLabel = $derived(
		currentLevel === -1
			? 'Auto'
			: levels[currentLevel]?.label ?? `${levels[currentLevel]?.height}p`
	);
</script>

<svelte:window onpointerdown={onWindowPointerDown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="quality-wrapper"
	onpointerdown={(e) => e.stopPropagation()}
>
	<Button onpointerup={onButtonPointerUp} aria-label="Quality: {currentLabel}">
		<QualityIcon />
	</Button>
	{#if menuOpen}
		<div class="quality-menu" style="background-color:{cfg.color}; border-color:{cfg.focusColor};">
			<button
				type="button"
				class="menu-item"
				class:selected={currentLevel === -1}
				style="color:{cfg.iconColor};"
				onpointerup={() => selectLevel(-1)}
			>Auto</button>
			{#each levels as level, i (level.height)}
				<button
					type="button"
					class="menu-item"
					class:selected={currentLevel === i}
					style="color:{cfg.iconColor};"
					onpointerup={() => selectLevel(i)}
				>{level.label ?? `${level.height}p`}</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.quality-wrapper {
		position: relative;
		height: 100%;
	}

	.quality-menu {
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
