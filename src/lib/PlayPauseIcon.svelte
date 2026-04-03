<script lang="ts">
	import { getContext } from 'svelte';
	import type { PlayerConfig } from './types.js';

	interface Props {
		size?: string;
		filled?: boolean;
		paused?: boolean;
	}

	let { size = '100%', filled = false, paused = true }: Props = $props();

	const cfg = getContext<PlayerConfig>('config');
</script>

<div class="play-pause-icon" style="width:{size};">
	<svg viewBox="0 0 100 100" width="100%" stroke-linecap="round" stroke-linejoin="round">
		<path
			visibility={!paused ? 'visible' : 'hidden'}
			d="M40 29v42M60 29v42"
			stroke={cfg.iconColor}
			stroke-width="5"
		/>
		<path
			visibility={paused ? 'visible' : 'hidden'}
			d="M40 29v42l26-21-26-21z"
			fill={filled ? cfg.iconColor : 'none'}
			stroke={cfg.iconColor}
			stroke-width="5"
		/>
	</svg>
</div>

<style>
	.play-pause-icon {
		position: relative;
		height: 100%;
	}
</style>
