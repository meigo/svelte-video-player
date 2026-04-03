<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		size?: string;
	}

	let { size = '100%' }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');
</script>

<div class="quality-icon" style="width:{size};">
	<svg viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">
		<g fill="none" stroke={cfg.iconColor} stroke-width="5">
			<rect x="22" y="28" width="56" height="44" rx="4" />
			<text
				x="50" y="57"
				text-anchor="middle"
				font-size="24"
				font-weight="bold"
				stroke="none"
				fill={cfg.iconColor}
			>HD</text>
		</g>
	</svg>
</div>

<style>
	.quality-icon {
		position: relative;
		height: 100%;
	}
</style>
