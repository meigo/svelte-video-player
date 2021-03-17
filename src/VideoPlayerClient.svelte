<script context="module">
  let currentVideo;

  function onPlay(e) {
    if (currentVideo && currentVideo !== e.target) currentVideo.pause(); // Pause other videos
    currentVideo = e.target;
  }
</script>

<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { uid, preloadImage, prepareVideoSources } from './utils.js';

  import Poster from './Poster.svelte';
  import Controls from './Controls.svelte';
  import CenterIcons from './CenterIcons.svelte';
  import BottomControls from './BottomControls.svelte';
  import Playbar from './Playbar.svelte';
  import PlayPauseButton from './PlayPauseButton.svelte';
  import VolumeButton from './VolumeButton.svelte';
  import VolumeControl from './VolumeControl.svelte';
  import FullscreenButton from './FullscreenButton.svelte';
  import FullscreenManager from './FullscreenManager.svelte';
  import IdleDetector from './IdleDetector.svelte';
  import ScrollDetector from './ScrollDetector.svelte';
  import Spinner from './Spinner.svelte';
  import Time from './Time.svelte';

  //-------------------------------------------------------------------------------------------------------------------
  // PROPS
  //-------------------------------------------------------------------------------------------------------------------

  export let width;
  export let height;
  export let poster;
  export let source;
  export let controlsHeight;
  export let trackHeight;
  export let thumbSize;
  export let centerIconSize;
  export let playerBgColor;
  export let color;
  export let focusColor;
  export let barsBgColor;
  export let iconColor;
  export let bufferedColor;
  export let chunkBars;
  export let borderRadius;
  export let loop;
  export let skipSeconds;
  export let aspectRatio;
  export let controlsOnPause;
  export let timeDisplay;

  $: _sources = prepareVideoSources(source);
  $: _skipSeconds = parseFloat(skipSeconds);

  //-------------------------------------------------------------------------------------------------------------------
  // REACTIVE CONFIG CONTEXT
  //-------------------------------------------------------------------------------------------------------------------

  const config = writable({});
  setContext('config', config);

  $: $config.controlsHeight = controlsHeight;
  $: $config.thumbSize = thumbSize;
  $: $config.trackHeight = trackHeight;
  $: $config.centerIconSize = centerIconSize;
  $: $config.color = color;
  $: $config.playerBgColor = playerBgColor;
  $: $config.focusColor = focusColor;
  $: $config.barsBgColor = barsBgColor;
  $: $config.iconColor = iconColor;
  $: $config.bufferedColor = bufferedColor;
  $: $config.chunkBars = chunkBars;
  $: $config.loop = loop;
  $: $config.borderRadius = borderRadius;
  $: $config.controlsOnPause = controlsOnPause;
  $: $config.timeDisplay = timeDisplay;

  //-------------------------------------------------------------------------------------------------------------------
  // VIDEO ELEMENT BINDINGS
  //-------------------------------------------------------------------------------------------------------------------

  let videoPlayerElement;
  let videoElement;
  let currentTime = 0;
  let duration;
  let buffered = []; // [{start, end}]
  let played = []; // [{start, end}]
  let seeking;
  let ended;
  let paused = true;
  let volume = 1;
  let muteVolume = 1;

  $: muted = volume == 0;

  $: {
    if (ended) {
      currentTime = 0;
      if (loop) videoElement.play();
    }
  }

  //-------------------------------------------------------------------------------------------------------------------
  // APP STATE FLAGS
  //-------------------------------------------------------------------------------------------------------------------

  let isVideoData = false;
  let isPointerOverVideo = false;
  let isPointerOverControls = false;
  let isBuffering = false;
  let isFullscreenEnabled = false;
  let isFullscreen = false;
  let isIdle = false;
  let isScrolling = false;
  let isScrubbing = false;
  let isKeyDown = false;

  $: isPosterVisible = !isVideoData || (paused && currentTime == 0);

  $: isBottomControlsVisible = isVideoData && ((paused && controlsOnPause) || (isPointerOverVideo && !isIdle));

  $: isSpinnerVisible = seeking || isBuffering;

  $: isCenterIconVisibile = !isVideoData || (paused && !isScrubbing);

  //-------------------------------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  //-------------------------------------------------------------------------------------------------------------------

  function onVideoLoadedData(e) {
    isVideoData = true;
  }

  function onVideoPlaying(e) {
    isBuffering = false;
  }

  function onVideoWaiting(e) {
    isBuffering = true;
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onPlayerPointerOver(e) {
    isPointerOverVideo = true;
  }

  function onPlayerPointerOut(e) {
    isPointerOverVideo = false;
  }

  function onPlayerPointerUp(e) {
    if (!isPointerOverControls && !isScrolling) {
      paused = !paused;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onWindowKeyDown(e) {
    if (currentVideo !== videoElement) return;
    switch (e.code) {
      case 'Tab':
        if (isKeyDown) break; // Prevent long press
        if (!isBottomControlsVisible) {
          e.stopPropagation();
          e.preventDefault();
          isBottomControlsVisible = true;
        }
        break;
      case 'Space':
        if (isKeyDown) break; // Prevent long press
        e.preventDefault(); // Prevent page scroll
        currentVideo.paused ? currentVideo.play() : currentVideo.pause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        timeJump(true);
        break;
      case 'ArrowRight':
        e.preventDefault();
        timeJump();
        break;
    }
    isKeyDown = true;
  }

  function onWindowKeyUp(e) {
    if (currentVideo !== videoElement) return;
    isKeyDown = false;
  }

  function timeJump(back) {
    const t = videoElement.currentTime;
    const d = videoElement.duration;
    if (back) videoElement.currentTime = t > _skipSeconds ? t - _skipSeconds : 0;
    else videoElement.currentTime = t + _skipSeconds < d ? t + _skipSeconds : d - 0.2;
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onFullscreenButtonPointerUp(e) {
    isFullscreen = !isFullscreen;
  }

  function onPlaybarPointerUp(e) {
    if (videoElement != videoElement) paused = false;
  }

  function onPlayPauseButtonPointerUp(e) {
    paused = !paused;
  }

  function onVolumeButtonPointerUp(e) {
    if (!muted) {
      muteVolume = volume;
      volume = 0;
    } else {
      volume = muteVolume;
      muteVolume = 1;
    }
  }

  function togglePause() {
    paused = !paused;
  }
</script>

<!--------------------------------------------------------------------------------------------------------------------
 STYLE
 --------------------------------------------------------------------------------------------------------------------->
<style>
  :global(video::-webkit-media-controls) {
    display: none !important; /* Hide fullscreen native controls */
  }

  .aspect {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; /* default 1:1 */
    overflow: hidden;
    border-radius: 8px;
    /* Safari overflow:hidden fix */
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

<!--------------------------------------------------------------------------------------------------------------------
 MARKUP
 --------------------------------------------------------------------------------------------------------------------->

<svelte:window on:keydown={onWindowKeyDown} on:keyup={onWindowKeyUp} />

<div
  class="aspect"
  style="padding-top:{aspectRatio * 100}%; background-color:{playerBgColor}; border-radius:{borderRadius}">
  {#await preloadImage(poster)}
    <div>
      <Spinner color={iconColor} size="60px" />
    </div>
  {:then}
    <div
      id="video-player-{uid()}"
      tabindex={isVideoData ? '0' : '-1'}
      bind:this={videoPlayerElement}
      on:pointerover={onPlayerPointerOver}
      on:pointerout={onPlayerPointerOut}
      on:pointerup={onPlayerPointerUp}>
      <video
        {width}
        {height}
        bind:this={videoElement}
        bind:currentTime
        bind:duration
        bind:buffered
        bind:seeking
        bind:played
        bind:ended
        bind:paused
        bind:volume
        on:loadeddata|once={onVideoLoadedData}
        on:play={onPlay}
        on:playing={onVideoPlaying}
        on:waiting={onVideoWaiting}
        preload="none">
        <track kind="captions" />
        {#each _sources as { src, type }}
          <source {src} {type} />
        {/each}
        <p>Sorry, your browser doesn't support HTML5 videos.</p>
      </video>

      {#if poster && isPosterVisible}
        <Poster src={poster} />
      {/if}

      <Controls>
        <BottomControls hidden={!isBottomControlsVisible} bind:isPointerOver={isPointerOverControls}>
          <PlayPauseButton on:pointerup={onPlayPauseButtonPointerUp} {paused} />
          <Playbar
            {duration}
            {buffered}
            {played}
            {isBottomControlsVisible}
            bind:currentTime
            bind:paused
            bind:isScrubbing
            on:pointerup={onPlaybarPointerUp} />
          {#if timeDisplay}
            <Time {duration} {currentTime} />
          {/if}
          <VolumeButton on:pointerup={onVolumeButtonPointerUp} {muted} />
          <VolumeControl bind:volume />
          {#if isFullscreenEnabled}
            <FullscreenButton on:pointerup={onFullscreenButtonPointerUp} {isFullscreen} />
          {/if}
        </BottomControls>
        <CenterIcons
          isIconVisible={isCenterIconVisibile}
          {isSpinnerVisible}
          {isBuffering}
          on:togglePause={togglePause} />
      </Controls>
    </div>
  {:catch error}
    <p style="color:red;">{error}</p>
  {/await}

  <!-- <BufferingDetector {currentTime} {paused} bind:isBuffering /> -->

  <IdleDetector bind:isIdle />

  <ScrollDetector bind:isScrolling />

  <FullscreenManager element={videoPlayerElement} bind:isFullscreenEnabled bind:isFullscreen />
</div>
