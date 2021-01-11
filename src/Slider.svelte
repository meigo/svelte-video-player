<script>
  import { getContext } from "svelte";

  import Thumb from "./Thumb.svelte";
  import Bar from "./Bar.svelte";

  export let width = "150px";
  export let marginX = "10px";
  export let value = 0.5;

  let sliderElement;
  let isPointerDown;
  let rect;

  const cfg = getContext("config");

  function onPointerDown(e) {
    e.preventDefault(); // Prevent focusing
    isPointerDown = true;
    rect = sliderElement.getBoundingClientRect();
    pointerXToValue(e.clientX);
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;
    pointerXToValue(e.clientX);
  }

  function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
  }

  function onKeydown(e) {
    switch (e.code) {
      case "ArrowLeft":
      case "ArrowDown":
        keydownAddToValue(e, -0.1);
        break;
      case "ArrowRight":
      case "ArrowUp":
        keydownAddToValue(e, 0.1);
        break;
    }
  }

  function keydownAddToValue(e, v) {
    e.preventDefault(); // Prevent page scroll
    e.stopPropagation();
    value = Math.min(Math.max(value + v, 0), 1);
  }

  function pointerXToValue(clientX) {
    value = Math.min(Math.max(clientX - rect.x, 0), rect.width) / rect.width;
  }
</script>

<style>
  .slider {
    position: relative;
    flex-grow: 1;
    min-width: 25px;
    height: 100%;
    outline: none;
  }

  .slider:focus .bars {
    outline-style: dotted;
  }

  .bars {
    position: relative;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    outline-offset: 3px;
    outline-width: 2px;
    outline-style: none;
    border-radius: 9999px;
    overflow: hidden;
  }
</style>

<svelte:window on:pointermove={onPointerMove} on:pointerup={onPointerUp} />

<div
  class="slider"
  style="max-width:{width}; margin:0 {marginX};"
  tabindex="0"
  bind:this={sliderElement}
  on:pointerdown={onPointerDown}
  on:keydown={onKeydown}>
  <div
    class="bars"
    style="height:{$cfg.trackHeight}; outline-color:{$cfg.focusColor};">
    <Bar color={$cfg.barsBgColor} opacity={1} value={1} />
    <Bar color={$cfg.color} opacity={1} {value} />
  </div>
  <Thumb positionValue={value} active={isPointerDown} />
</div>
