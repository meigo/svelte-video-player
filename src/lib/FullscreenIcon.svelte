<script lang="ts">
	import { getPlayerConfig } from './context.js';

	interface Props {
		isFullscreen?: boolean;
	}

	let { isFullscreen = false }: Props = $props();

	const cfg = getPlayerConfig();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke={cfg.iconColor}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="2.2"
>
	<g visibility={!isFullscreen ? 'visible' : 'hidden'}>
		<path
			d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"
		/>
	</g>
	<g visibility={isFullscreen ? 'visible' : 'hidden'}>
		<path
			d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"
		/>
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
