<script lang="ts">
	import { getPlayerConfig } from './context.js';

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
	<path
		d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"
	/>
	<circle cx="12" cy="12" r="4" />
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
