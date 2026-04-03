<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="overlay">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.overlay {
		z-index: 10;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
</style>
