<script lang="ts">
	import { onDestroy } from 'svelte';
	import debounce from './libs/debounce.js';

	interface Props {
		isIdle?: boolean;
	}

	let { isIdle = $bindable(false) }: Props = $props();

	let timeout: ReturnType<typeof setTimeout>;

	function onActivity() {
		isIdle = false;
		setIdleTimeout();
	}

	const setIdleTimeout = debounce(
		() => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				isIdle = true;
			}, 2000);
		},
		250,
		true
	);

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<svelte:window onpointermove={onActivity} onkeydown={onActivity} />
