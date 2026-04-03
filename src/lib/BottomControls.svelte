<script lang="ts">
	import { getPlayerConfig } from './context.js';
	import type { Snippet } from 'svelte';

	interface Props {
		hidden: boolean;
		isPointerOver?: boolean;
		children?: Snippet;
	}

	let { hidden, isPointerOver = $bindable(false), children }: Props = $props();

	const cfg = getPlayerConfig();

	let lastFocusElement: Element | null = $state(null);
	let wasTabDown = $state(false);

	function onPointerOver() {
		isPointerOver = true;
	}

	function onPointerOut() {
		isPointerOver = false;
	}

	function onTransitionEnd(e: TransitionEvent) {
		if (e.propertyName === 'visibility') {
			if (!hidden && wasTabDown) {
				(lastFocusElement as HTMLElement)?.focus({ preventScroll: true });
			} else {
				lastFocusElement = document.activeElement;
			}
		}
	}
</script>

<svelte:window
	onpointermove={() => (wasTabDown = false)}
	onkeydown={(e) => (wasTabDown = e.code === 'Tab')}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:hidden
	class="controls"
	style="height:{cfg.controlsHeight}; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.2) 80%);"
	onpointerover={onPointerOver}
	onpointerout={onPointerOut}
	ontransitionend={onTransitionEnd}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.controls {
		position: relative;
		box-sizing: border-box;
		min-height: 40px;
		max-height: 150px;
		top: 100%;
		transform: translateY(-100%);
		padding: 10px;
		display: flex;
		gap: 6px;
		visibility: visible;
		transition:
			transform 0.5s ease,
			visibility 0.5s linear;
	}

	.hidden {
		visibility: hidden;
		transform: translateY(100%);
	}

	@media (prefers-reduced-motion: reduce) {
		.controls {
			transition: none;
		}
	}
</style>
