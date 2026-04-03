<script lang="ts">
	import { getPlayerConfig } from './context.js';
	import Slider from './Slider.svelte';
	import VolumeButton from './VolumeButton.svelte';

	interface Props {
		volume?: number;
		muted: boolean;
		onmutetoggle?: () => void;
	}

	let { volume = $bindable(1), muted, onmutetoggle }: Props = $props();

	const cfg = getPlayerConfig();

	let thumbMargin = $derived(`calc(${cfg.thumbSize} / 2 + 2px)`);

	let hovered = $state(false);
	let dragging = $state(false);
	let wasDragging = $state(false);
	let focused = $state(false);
	let expanded = $derived(hovered || dragging || focused);

	function onWindowPointerUp() {
		wasDragging = dragging;
		dragging = false;
	}

	function onMutePointerUp() {
		if (wasDragging) {
			wasDragging = false;
			return;
		}
		onmutetoggle?.();
	}
</script>

<svelte:window onpointerup={onWindowPointerUp} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="volume-group"
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
	onpointerdown={() => (dragging = true)}
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
>
	<VolumeButton onpointerup={onMutePointerUp} {muted} />
	<div class="volume-slider" class:expanded style="--thumb-size:{cfg.thumbSize};">
		<Slider bind:value={volume} width="100%" marginX={thumbMargin} aria-label="Volume" />
	</div>
</div>

<style>
	.volume-group {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.volume-slider {
		height: 100%;
		width: 0;
		margin-left: 0;
		overflow: hidden;
		transition: width 0.2s ease, margin-left 0.2s ease;
	}

	.volume-slider.expanded {
		margin-left: 6px;
	}

	@media (hover: hover) and (pointer: fine) {
		.volume-slider.expanded {
			width: calc(80px + var(--thumb-size, 15px));
		}
	}
</style>
