<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { MediaSessionConfig } from './types.js';

	interface Props {
		videoElement?: HTMLVideoElement;
		mediaSession?: MediaSessionConfig;
	}

	let { videoElement, mediaSession }: Props = $props();

	const supported = typeof navigator !== 'undefined' && 'mediaSession' in navigator;

	function play() {
		videoElement?.play();
	}

	function pause() {
		videoElement?.pause();
	}

	function seekBackward() {
		if (videoElement) videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
	}

	function seekForward() {
		if (videoElement) {
			videoElement.currentTime = Math.min(
				videoElement.currentTime + 10,
				videoElement.duration
			);
		}
	}

	$effect(() => {
		if (!supported || !mediaSession) return;
		navigator.mediaSession.metadata = new MediaMetadata({
			title: mediaSession.title,
			artist: mediaSession.artist,
			album: mediaSession.album,
			artwork: mediaSession.artwork
		});
	});

	if (supported) {
		navigator.mediaSession.setActionHandler('play', play);
		navigator.mediaSession.setActionHandler('pause', pause);
		navigator.mediaSession.setActionHandler('seekbackward', seekBackward);
		navigator.mediaSession.setActionHandler('seekforward', seekForward);
	}

	$effect(() => {
		if (!supported || !videoElement) return;
		navigator.mediaSession.playbackState = videoElement.paused ? 'paused' : 'playing';
	});

	onDestroy(() => {
		if (!supported) return;
		navigator.mediaSession.setActionHandler('play', null);
		navigator.mediaSession.setActionHandler('pause', null);
		navigator.mediaSession.setActionHandler('seekbackward', null);
		navigator.mediaSession.setActionHandler('seekforward', null);
	});
</script>
