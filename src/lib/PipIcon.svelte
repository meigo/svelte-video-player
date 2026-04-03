<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		size?: string;
		isPip?: boolean;
	}

	let { size = '100%', isPip = false }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');
</script>

<div class="pip-icon" style="width:{size};">
	<svg viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">
		<g fill="none" stroke={cfg.iconColor} stroke-width="5">
			<!-- Outer frame -->
			<rect x="20" y="25" width="60" height="50" rx="4" />
			<!-- PiP window -->
			<rect
				x="50" y="45" width="25" height="20" rx="2"
				fill={isPip ? cfg.iconColor : 'none'}
			/>
		</g>
	</svg>
</div>

<style>
	.pip-icon {
		position: relative;
		height: 100%;
	}
</style>
