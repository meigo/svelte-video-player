<script lang="ts">
	import { getPlayerConfig } from './context.js';

	interface Props {
		muted?: boolean;
	}

	let { muted = false }: Props = $props();

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
	<g visibility={!muted ? 'visible' : 'hidden'}>
		<path
			d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728"
		/>
	</g>
	<g visibility={muted ? 'visible' : 'hidden'}>
		<path
			d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6M16 9l6 6"
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
