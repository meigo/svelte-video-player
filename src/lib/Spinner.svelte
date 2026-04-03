<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		size?: string;
		color?: string;
		hidden?: boolean;
	}

	let { size = '60px', color = '#FFF', hidden = false }: Props = $props();
</script>

{#if !hidden}
	<div
		class="spinner"
		style="width:{size}; height:{size};"
		in:fade={{ delay: 500, duration: 500 }}
		out:fade={{ duration: 100 }}
	>
		<div class="circle bg" style="border-color:{color};"></div>
		<div class="circle rotating" style="border-color:{color} {color} transparent transparent;"></div>
	</div>
{/if}

<style>
	.spinner {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.circle {
		box-sizing: border-box;
		position: absolute;
		height: 100%;
		width: 100%;
		border-width: 2px;
		border-style: solid;
		border-radius: 50%;
	}

	.bg {
		opacity: 0.25;
	}

	.rotating {
		animation: 1s linear 0s infinite normal none running rotate;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rotating {
			animation: none;
		}
	}
</style>
