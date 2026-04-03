<script lang="ts">
	import { getPlayerConfig } from './context.js';

	interface Props {
		paused?: boolean;
	}

	let { paused = true }: Props = $props();

	const cfg = getPlayerConfig();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke={cfg.iconColor}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="2"
>
	<g visibility={!paused ? 'visible' : 'hidden'}>
		<rect width="5" height="18" x="14" y="3" rx="1" />
		<rect width="5" height="18" x="5" y="3" rx="1" />
	</g>
	<g visibility={paused ? 'visible' : 'hidden'}>
		<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
