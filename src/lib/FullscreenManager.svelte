<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		element?: HTMLElement;
		isFullscreen?: boolean;
		isFullscreenEnabled?: boolean;
	}

	let {
		element,
		isFullscreen = $bindable(false),
		isFullscreenEnabled = $bindable(false)
	}: Props = $props();

	isFullscreenEnabled =
		typeof document !== 'undefined' && document.fullscreenEnabled;

	function onChange() {
		if (element) {
			isFullscreen = document.fullscreenElement === element;
		}
	}

	if (typeof document !== 'undefined' && isFullscreenEnabled) {
		document.addEventListener('fullscreenchange', onChange);
	}

	$effect(() => {
		if (!isFullscreenEnabled || !element) return;
		if (isFullscreen && document.fullscreenElement !== element) {
			element.requestFullscreen();
		} else if (!isFullscreen && document.fullscreenElement === element) {
			document.exitFullscreen();
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('fullscreenchange', onChange);
		}
	});
</script>
