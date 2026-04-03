<script lang="ts">
	import VideoPlayerClient from './VideoPlayerClient.svelte';
	import VideoPlayerServer from './VideoPlayerServer.svelte';
	import type { MediaSessionConfig, TextTrackConfig, Chapter } from './types.js';

	interface Props {
		width?: number | string;
		height?: number | string;
		poster?: string;
		source?: string | string[];
		controlsHeight?: string;
		trackHeight?: string;
		thumbSize?: string;
		centerIconSize?: string;
		playerBgColor?: string;
		color?: string;
		focusColor?: string;
		barsBgColor?: string;
		iconColor?: string;
		borderRadius?: string;
		loop?: boolean;
		autoplay?: boolean;
		skipSeconds?: number | string;
		preload?: '' | 'none' | 'metadata' | 'auto';
		crossorigin?: '' | 'anonymous' | 'use-credentials';
		playsinline?: boolean;
		controlsOnPause?: boolean;
		timeDisplay?: boolean;
		remainingTime?: boolean;
		playbackRateControl?: boolean;
		chapters?: Chapter[];
		mediaSession?: MediaSessionConfig;
		tracks?: TextTrackConfig[];
	}

	let {
		width = 1920,
		height = 1080,
		poster = '',
		source = '',
		controlsHeight = '55px',
		trackHeight = '6px',
		thumbSize = '15px',
		centerIconSize = '60px',
		playerBgColor = 'black',
		color = '#FF3E00',
		focusColor = 'white',
		barsBgColor = 'white',
		iconColor = 'white',
		borderRadius = '8px',
		loop = false,
		autoplay = false,
		skipSeconds = 5,
		preload = 'metadata',
		crossorigin = undefined,
		playsinline = true,
		controlsOnPause = true,
		timeDisplay = true,
		remainingTime = false,
		playbackRateControl = true,
		chapters = [],
		mediaSession = undefined,
		tracks = []
	}: Props = $props();

	const isClient = typeof window !== 'undefined';

	let _width = $derived(parseInt(String(width)));
	let _height = $derived(parseInt(String(height)));
	let aspectRatio = $derived(_height / _width);
</script>

{#if isClient}
	<VideoPlayerClient
		{width}
		{height}
		{poster}
		{source}
		{controlsHeight}
		{trackHeight}
		{thumbSize}
		{centerIconSize}
		{playerBgColor}
		{color}
		{focusColor}
		{barsBgColor}
		{iconColor}
		{borderRadius}
		{loop}
		{autoplay}
		{skipSeconds}
		{preload}
		{crossorigin}
		{playsinline}
		{aspectRatio}
		{controlsOnPause}
		{timeDisplay}
		{remainingTime}
		{playbackRateControl}
		{chapters}
		{mediaSession}
		{tracks}
	/>
{:else}
	<VideoPlayerServer {playerBgColor} {borderRadius} {aspectRatio} />
{/if}
