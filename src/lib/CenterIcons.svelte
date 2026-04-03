<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	import PlayIconCenter from './PlayIconCenter.svelte';
	import Spinner from './Spinner.svelte';

	interface Props {
		isBuffering: boolean;
		isSpinnerVisible: boolean;
		isIconVisible: boolean;
	}

	let { isBuffering, isSpinnerVisible, isIconVisible }: Props = $props();

	let offsetWidth = $state(0);

	const cfg = getContext<PlayerConfig>('config');
</script>

<div
	class="center-icons"
	style="width:{cfg.centerIconSize}; height:{cfg.centerIconSize};"
	bind:offsetWidth
>
	<PlayIconCenter hidden={!isIconVisible} />
	<Spinner
		hidden={!isSpinnerVisible}
		color={isBuffering ? cfg.color : cfg.iconColor}
		size="{offsetWidth + 10}px"
	/>
</div>

<style>
	.center-icons {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
