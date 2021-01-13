<script>
  import throttle from "./libs/throttle";
  import { createEventDispatcher } from "svelte";
  import { getContext } from "svelte";

  import Bar from "./Bar.svelte";
  import Chunkbar from "./Chunkbar.svelte";
  import Thumb from "./Thumb.svelte";

  export let isBottomControlsVisible;
  export let marginX = "10px";
  export let currentTime = 0;
  export let duration = 0;
  export let buffered = [];
  export let played = [];
  export let paused;
  export let isScrubbing;

  const dispatch = createEventDispatcher();

  const cfg = getContext("config");

  let playbarElement;
  let isPointerDown;
  let rect;
  let wasPaused;
  let _buffered;
  let _played;
  let _currentTimePercentage;

  $: {
    if (isBottomControlsVisible && $cfg.chunkBars) {
      updateChunkBarsThrottled(currentTime); // Optimize with throttle
    }
  }

  $: {
    if (isBottomControlsVisible) {
      if (isScrubbing) updateTime(currentTime);
      else updateTimeThrottled(currentTime); // Optimize with throttle when playing
    }
  }

  function updateTime() {
    _currentTimePercentage = currentTime / duration;
  }

  const updateTimeThrottled = throttle(
    (time) => {
      _currentTimePercentage = time / duration;
    },
    250,
    true
  );

  const updateChunkBarsThrottled = throttle(
    (time) => {
      _buffered = buffered.map((item) => {
        return { start: item.start / duration, end: item.end / duration };
      });

      _played = played.map((item) => {
        return { start: item.start / duration, end: item.end / duration };
      });
    },
    250,
    true
  );

  function onPointerDown(e) {
    e.preventDefault(); // Prevent focusing
    isPointerDown = true;
    wasPaused = paused;
    paused = true;
    rect = playbarElement.getBoundingClientRect();
    pointerXToCurrentTime(e.clientX);
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;
    isScrubbing = true;
    pointerXToCurrentTime(e.clientX);
  }

  function onPointerUp(e) {
    if (!isPointerDown) return;
    paused = wasPaused;
    isPointerDown = false;
    isScrubbing = false;
    dispatch("pointerup");
  }

  function pointerXToCurrentTime(clientX) {
    const value =
      Math.min(Math.max(clientX - rect.x, 0), rect.width) / rect.width;
    currentTime = duration * value;
  }
</script>

<style>
  .playbar {
    position: relative;
    min-width: 50px;
    height: 100%;
    flex-grow: 4;
    cursor: pointer;
    outline: none;
    touch-action: none; /* Disable panning (scrolling) on pointermove */
  }

  .playbar:focus .bars {
    outline-style: dotted;
  }

  .bars {
    position: relative;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 9999px;
    overflow: hidden;
    outline-offset: 3px;
    outline-width: 2px;
    outline-style: none;
  }

  .chunkbars {
    position: absolute;
    width: 100%;
    height: 30%;
  }
</style>

<svelte:window on:pointermove={onPointerMove} on:pointerup={onPointerUp} />

<div
  class="playbar"
  tabindex="0"
  bind:this={playbarElement}
  on:pointerdown={onPointerDown}
  style="margin:0 {marginX};">
  <div
    class="bars"
    style="height:{$cfg.trackHeight}; outline-color:{$cfg.focusColor};">
    <Bar color={$cfg.barsBgColor} opacity={1} value={1} />
    <Bar color={$cfg.color} value={_currentTimePercentage} />
    {#if $cfg.chunkBars}
      <div class="chunkbars">
        <Chunkbar color={$cfg.bufferedColor} opacity={1} ranges={_buffered} />
        <Chunkbar color={$cfg.color} opacity={1} ranges={_played} />
      </div>
    {/if}
  </div>
  <Thumb positionValue={_currentTimePercentage} active={isPointerDown} />
</div>
