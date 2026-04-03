<script lang="ts">
	import { getPlayerConfig } from './context.js';

	interface Props {
		active?: boolean;
	}

	let { active = false }: Props = $props();

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
	<g visibility={active ? 'visible' : 'hidden'}>
		<rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
		<path d="M7 15h4m4 0h2M7 11h2m4 0h4" />
	</g>
	<g visibility={!active ? 'visible' : 'hidden'}>
		<path
			d="M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4M7 15h2.5"
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
