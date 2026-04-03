<script lang="ts">
	import Slider from './Slider.svelte';

	interface Props {
		width?: string;
		volume?: number;
	}

	let { width = '100px', volume = $bindable(1) }: Props = $props();
</script>

<div class="volume-control">
	<Slider bind:value={volume} {width} aria-label="Volume" />
</div>

<style>
	.volume-control {
		display: none;
		height: 100%;
	}

	@media (hover: hover) and (pointer: fine) {
		.volume-control {
			display: contents;
		}
	}
</style>
