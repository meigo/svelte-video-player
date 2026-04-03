<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		videoElement?: HTMLVideoElement;
		isPip?: boolean;
		isPipEnabled?: boolean;
	}

	let {
		videoElement,
		isPip = $bindable(false),
		isPipEnabled = $bindable(false)
	}: Props = $props();

	isPipEnabled =
		typeof document !== 'undefined' && document.pictureInPictureEnabled;

	function onEnterPip() {
		isPip = true;
	}

	function onLeavePip() {
		isPip = false;
	}

	let currentElement: HTMLVideoElement | undefined;

	$effect(() => {
		if (currentElement) {
			currentElement.removeEventListener('enterpictureinpicture', onEnterPip);
			currentElement.removeEventListener('leavepictureinpicture', onLeavePip);
		}
		currentElement = videoElement;
		if (videoElement && isPipEnabled) {
			videoElement.addEventListener('enterpictureinpicture', onEnterPip);
			videoElement.addEventListener('leavepictureinpicture', onLeavePip);
		}
	});

	$effect(() => {
		if (!isPipEnabled || !videoElement) return;
		if (isPip && document.pictureInPictureElement !== videoElement) {
			videoElement.requestPictureInPicture();
		} else if (!isPip && document.pictureInPictureElement === videoElement) {
			document.exitPictureInPicture();
		}
	});

	onDestroy(() => {
		if (currentElement) {
			currentElement.removeEventListener('enterpictureinpicture', onEnterPip);
			currentElement.removeEventListener('leavepictureinpicture', onLeavePip);
		}
	});
</script>
