<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		size?: string;
		active?: boolean;
	}

	let { size = '100%', active = false }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');
</script>

<div class="caption-icon" style="width:{size};">
	<svg viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">
		<g fill="none" stroke={cfg.iconColor} stroke-width="5">
			<rect x="20" y="28" width="60" height="44" rx="4" fill={active ? cfg.iconColor : 'none'} />
			<text
				x="50" y="57"
				text-anchor="middle"
				font-size="26"
				font-weight="bold"
				stroke="none"
				fill={active ? cfg.color : cfg.iconColor}
			>CC</text>
		</g>
	</svg>
</div>

<style>
	.caption-icon {
		position: relative;
		height: 100%;
	}
</style>
