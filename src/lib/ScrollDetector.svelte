<script lang="ts">
	import { onDestroy } from 'svelte';
	import debounce from './libs/debounce.js';

	interface Props {
		isScrolling?: boolean;
	}

	let { isScrolling = $bindable(false) }: Props = $props();

	let timeout: ReturnType<typeof setTimeout>;

	function onScroll() {
		isScrolling = true;
		setScrollEndTimeout();
	}

	const setScrollEndTimeout = debounce(
		() => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				isScrolling = false;
			}, 100);
		},
		100,
		true
	);

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<svelte:window onscroll={onScroll} />
