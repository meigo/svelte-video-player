<script module lang="ts">
	let currentVideo: HTMLVideoElement | null = null;

	function onPlay(e: Event) {
		const target = e.target as HTMLVideoElement;
		if (currentVideo && currentVideo !== target) currentVideo.pause();
		currentVideo = target;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { uid, preloadImage, prepareVideoSources } from './utils.js';
	import type { PlayerConfig, MediaSessionConfig, TextTrackConfig, Chapter } from './types.js';

	import Poster from './Poster.svelte';
	import Controls from './Controls.svelte';
	import CenterIcons from './CenterIcons.svelte';
	import BottomControls from './BottomControls.svelte';
	import Playbar from './Playbar.svelte';
	import PlayPauseButton from './PlayPauseButton.svelte';
	import VolumeButton from './VolumeButton.svelte';
	import VolumeControl from './VolumeControl.svelte';
	import PlaybackRateButton from './PlaybackRateButton.svelte';
	import PipButton from './PipButton.svelte';
	import PipManager from './PipManager.svelte';
	import FullscreenButton from './FullscreenButton.svelte';
	import FullscreenManager from './FullscreenManager.svelte';
	import MediaSessionManager from './MediaSessionManager.svelte';
	import IdleDetector from './IdleDetector.svelte';
	import ScrollDetector from './ScrollDetector.svelte';
	import CaptionButton from './CaptionButton.svelte';
	import Spinner from './Spinner.svelte';
	import Time from './Time.svelte';

	interface Props {
		width: number | string;
		height: number | string;
		poster: string;
		source: string | string[];
		controlsHeight: string;
		trackHeight: string;
		thumbSize: string;
		centerIconSize: string;
		playerBgColor: string;
		color: string;
		focusColor: string;
		barsBgColor: string;
		iconColor: string;
		borderRadius: string;
		loop: boolean;
		autoplay: boolean;
		skipSeconds: number | string;
		preload: '' | 'none' | 'metadata' | 'auto';
		crossorigin?: '' | 'anonymous' | 'use-credentials';
		playsinline: boolean;
		aspectRatio: number;
		controlsOnPause: boolean;
		timeDisplay: boolean;
		remainingTime: boolean;
		playbackRateControl: boolean;
		chapters: Chapter[];
		mediaSession?: MediaSessionConfig;
		tracks: TextTrackConfig[];
	}

	let {
		width,
		height,
		poster,
		source,
		controlsHeight,
		trackHeight,
		thumbSize,
		centerIconSize,
		playerBgColor,
		color,
		focusColor,
		barsBgColor,
		iconColor,
		borderRadius,
		loop,
		autoplay,
		skipSeconds,
		preload,
		crossorigin,
		playsinline,
		aspectRatio,
		controlsOnPause,
		timeDisplay,
		remainingTime,
		playbackRateControl,
		chapters,
		mediaSession,
		tracks
	}: Props = $props();

	let _sources = $derived(prepareVideoSources(source));
	let _skipSeconds = $derived(parseFloat(String(skipSeconds)));

	// Reactive config context using getters so children see updates
	const config: PlayerConfig = {
		get controlsHeight() { return controlsHeight; },
		get trackHeight() { return trackHeight; },
		get thumbSize() { return thumbSize; },
		get centerIconSize() { return centerIconSize; },
		get color() { return color; },
		get playerBgColor() { return playerBgColor; },
		get focusColor() { return focusColor; },
		get barsBgColor() { return barsBgColor; },
		get iconColor() { return iconColor; },
		get loop() { return loop; },
		get borderRadius() { return borderRadius; },
		get controlsOnPause() { return controlsOnPause; },
		get timeDisplay() { return timeDisplay; }
	};
	setContext<PlayerConfig>('config', config);

	// Video element bindings
	let videoPlayerElement = $state<HTMLDivElement>();
	let videoElement = $state<HTMLVideoElement>();
	let currentTime = $state(0);
	let duration = $state(0);
	let seeking = $state(false);
	let ended = $state(false);
	let paused = $state(true);
	let volume = $state(1);
	let muteVolume = $state(1);
	let playbackRate = $state(1);

	const PLAYBACK_RATES = [0.5, 1, 1.5, 2];

	let muted = $derived(volume === 0);

	$effect(() => {
		if (ended) {
			currentTime = 0;
			if (loop) videoElement?.play();
		}
	});

	$effect(() => {
		if (videoElement) videoElement.playbackRate = playbackRate;
	});

	// Initialize default caption track
	$effect(() => {
		if (tracks.length > 0) {
			const defaultIdx = tracks.findIndex((t) => t.default);
			if (defaultIdx >= 0) activeTrackIndex = defaultIdx;
		}
	});

	// Sync text track modes when activeTrackIndex changes
	$effect(() => {
		if (!videoElement) return;
		const textTracks = videoElement.textTracks;
		for (let i = 0; i < textTracks.length; i++) {
			textTracks[i].mode = i === activeTrackIndex ? 'showing' : 'hidden';
		}
	});

	// App state flags
	let isVideoData = $state(false);
	let isPointerOverVideo = $state(false);
	let isPointerOverControls = $state(false);
	let isBuffering = $state(false);
	let isFullscreenEnabled = $state(false);
	let isFullscreen = $state(false);
	let isPipEnabled = $state(false);
	let isPip = $state(false);
	let activeTrackIndex = $state(-1);
	let isIdle = $state(false);
	let isScrolling = $state(false);
	let isScrubbing = $state(false);
	let isKeyDown = $state(false);

	let isAudioOnly = $state(false);
	let playerWidth = $state(0);
	let isCompact = $derived(playerWidth > 0 && playerWidth < 480);

	let isPosterVisible = $derived(!isVideoData || isAudioOnly || (paused && currentTime === 0));
	let isBottomControlsVisible = $derived(
		isVideoData && ((paused && controlsOnPause) || (isPointerOverVideo && !isIdle))
	);
	let isSpinnerVisible = $derived(seeking || isBuffering);
	let isCenterIconVisible = $derived(!isVideoData || (paused && !isScrubbing));

	const playerId = uid();

	// Responsive breakpoints
	let resizeObserver: ResizeObserver;
	$effect(() => {
		if (videoPlayerElement) {
			resizeObserver = new ResizeObserver((entries) => {
				playerWidth = entries[0].contentRect.width;
			});
			resizeObserver.observe(videoPlayerElement);
		}
		return () => resizeObserver?.disconnect();
	});

	// Event handlers
	function onVideoLoadedData() {
		isVideoData = true;
		// Detect audio-only content
		if (videoElement && videoElement.videoWidth === 0) {
			isAudioOnly = true;
		}
	}

	function onVideoPlaying() {
		isBuffering = false;
	}

	function onVideoWaiting() {
		isBuffering = true;
	}

	function onPlayerPointerOver() {
		isPointerOverVideo = true;
	}

	function onPlayerPointerOut() {
		isPointerOverVideo = false;
	}

	let clickTimeout: ReturnType<typeof setTimeout>;

	function onPlayerPointerUp() {
		if (!isPointerOverControls && !isScrolling && !isScrubbing) {
			clearTimeout(clickTimeout);
			clickTimeout = setTimeout(() => {
				paused = !paused;
			}, 250);
		}
	}

	function onPlayerDblClick() {
		clearTimeout(clickTimeout);
		if (isFullscreenEnabled) {
			isFullscreen = !isFullscreen;
		}
	}

	function onPlayerKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'Tab':
				if (isKeyDown) break;
				if (!isBottomControlsVisible) {
					e.stopPropagation();
					e.preventDefault();
				}
				break;
			case 'Space':
				if (isKeyDown) break;
				// Only handle when the player div itself has focus, not child buttons
				if (e.target !== videoPlayerElement) break;
				e.preventDefault();
				paused = !paused;
				break;
			case 'ArrowLeft':
				e.preventDefault();
				timeJump(true);
				break;
			case 'ArrowRight':
				e.preventDefault();
				timeJump(false);
				break;
			case 'Comma':
				if (e.shiftKey) {
					e.preventDefault();
					cyclePlaybackRate(false);
				}
				break;
			case 'Period':
				if (e.shiftKey) {
					e.preventDefault();
					cyclePlaybackRate(true);
				}
				break;
		}
		isKeyDown = true;
	}

	function onPlayerKeyUp() {
		isKeyDown = false;
	}

	function timeJump(back: boolean) {
		if (!videoElement) return;
		const t = videoElement.currentTime;
		const d = videoElement.duration;
		if (back) videoElement.currentTime = t > _skipSeconds ? t - _skipSeconds : 0;
		else videoElement.currentTime = t + _skipSeconds < d ? t + _skipSeconds : d - 0.2;
	}

	function cyclePlaybackRate(faster: boolean) {
		const idx = PLAYBACK_RATES.indexOf(playbackRate);
		if (faster && idx < PLAYBACK_RATES.length - 1) {
			playbackRate = PLAYBACK_RATES[idx + 1];
		} else if (!faster && idx > 0) {
			playbackRate = PLAYBACK_RATES[idx - 1];
		}
	}

	function onPlaybackRateButtonPointerUp() {
		const idx = PLAYBACK_RATES.indexOf(playbackRate);
		playbackRate = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length];
	}

	function onCaptionSelect(index: number) {
		activeTrackIndex = index;
	}

	function onPipButtonPointerUp() {
		isPip = !isPip;
	}

	function onFullscreenButtonPointerUp() {
		isFullscreen = !isFullscreen;
	}

	function onPlayPauseButtonPointerUp() {
		paused = !paused;
	}

	function onVolumeButtonPointerUp() {
		if (!muted) {
			muteVolume = volume;
			volume = 0;
		} else {
			volume = muteVolume;
			muteVolume = 1;
		}
	}
</script>

<style>
	:global(video::-webkit-media-controls) {
		display: none !important;
	}

	.aspect {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		overflow: hidden;
		border-radius: 8px;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		mask-image: -webkit-radial-gradient(white, black);
	}

	.aspect > :first-child {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		outline: none;
	}

	video {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>


<div
	class="aspect"
	role="region"
	aria-label="Video player"
	style="padding-top:{aspectRatio * 100}%; background-color:{playerBgColor}; border-radius:{borderRadius}"
>
	{#await preloadImage(poster)}
		<div>
			<Spinner color={iconColor} size="60px" />
		</div>
	{:then}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="video-player-{playerId}"
			tabindex={isVideoData ? 0 : -1}
			bind:this={videoPlayerElement}
			onpointerover={onPlayerPointerOver}
			onpointerout={onPlayerPointerOut}
			onpointerup={onPlayerPointerUp}
			ondblclick={onPlayerDblClick}
			onkeydown={onPlayerKeyDown}
			onkeyup={onPlayerKeyUp}
		>
			<video
				{width}
				{height}
				bind:this={videoElement}
				bind:currentTime
				bind:duration
				bind:seeking
				bind:ended
				bind:paused
				bind:volume
				onloadeddata={onVideoLoadedData}
				onplay={onPlay}
				onplaying={onVideoPlaying}
				onwaiting={onVideoWaiting}
				preload={preload}
				autoplay={autoplay}
				crossorigin={crossorigin}
				playsinline={playsinline}
			>
				{#each tracks as track (track.src)}
					<track kind="captions" src={track.src} srclang={track.srclang} label={track.label} />
				{/each}
				{#each _sources as { src, type } (src)}
					<source {src} {type} />
				{/each}
			</video>

			{#if poster && isPosterVisible}
				<Poster src={poster} />
			{/if}

			<Controls>
				<BottomControls hidden={!isBottomControlsVisible} bind:isPointerOver={isPointerOverControls}>
					<PlayPauseButton onpointerup={onPlayPauseButtonPointerUp} {paused} />
					<Playbar
						{duration}
						{chapters}
						{isBottomControlsVisible}
						bind:currentTime
						bind:paused
						bind:isScrubbing
					/>
					{#if timeDisplay && !isCompact}
						<Time {duration} {currentTime} remaining={remainingTime} />
					{/if}
					{#if playbackRateControl && !isCompact}
						<PlaybackRateButton {playbackRate} onpointerup={onPlaybackRateButtonPointerUp} />
					{/if}
					<VolumeButton onpointerup={onVolumeButtonPointerUp} {muted} />
					<VolumeControl bind:volume />
					{#if tracks.length > 0}
						<CaptionButton {tracks} {activeTrackIndex} onselect={onCaptionSelect} />
					{/if}
					{#if isPipEnabled && !isCompact}
						<PipButton onpointerup={onPipButtonPointerUp} {isPip} />
					{/if}
					{#if isFullscreenEnabled}
						<FullscreenButton onpointerup={onFullscreenButtonPointerUp} {isFullscreen} />
					{/if}
				</BottomControls>
				<CenterIcons
					isIconVisible={isCenterIconVisible}
					{isSpinnerVisible}
					{isBuffering}
				/>
			</Controls>
		</div>
	{:catch error}
		<p style="color:red;">{error}</p>
	{/await}

	<IdleDetector bind:isIdle />
	<ScrollDetector bind:isScrolling />
	<FullscreenManager element={videoPlayerElement} bind:isFullscreenEnabled bind:isFullscreen />
	<PipManager {videoElement} bind:isPipEnabled bind:isPip />
	{#if mediaSession}
		<MediaSessionManager {videoElement} {mediaSession} />
	{/if}
</div>
