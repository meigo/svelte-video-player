<script>
  import { getContext } from "svelte";

  export let hidden;
  export let isPointerOver;

  const cfg = getContext("config");

  let lastFocusElement;
  let wasTabDown;

  function onPointerOver(e) {
    isPointerOver = true;
  }

  function onPointerOut(e) {
    isPointerOver = false;
  }

  function onTransitionEnd(e) {
    if (e.propertyName == "visibility") {
      if (!hidden && wasTabDown) {
        lastFocusElement.focus({ preventScroll: true }); // Restore focus when controls opened by tab press
      } else {
        lastFocusElement = document.activeElement;
      }
    }
  }
</script>

<style>
  .controls {
    position: relative;
    box-sizing: border-box;
    min-height: 40px;
    max-height: 150px;
    top: 100%;
    transform: translateY(-100%);
    padding: 10px;
    display: flex;
    gap: 6px;
    visibility: visible;
    transition: transform 0.5s ease, visibility 0.5s linear;
  }

  .hidden {
    visibility: hidden;
    transform: translateY(100%);
  }
</style>

<svelte:window
  on:pointermove={() => (wasTabDown = false)}
  on:keydown={(e) => (wasTabDown = e.code === 'Tab')} />

<div
  class:hidden
  class="controls"
  style="height:{$cfg.controlsHeight}; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.2) 80%);"
  on:pointerover={onPointerOver}
  on:pointerout={onPointerOut}
  on:transitionend={onTransitionEnd}>
  <slot />
</div>
