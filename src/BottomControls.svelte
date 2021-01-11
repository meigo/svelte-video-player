<script>
  import { getContext } from "svelte";

  export let visible;
  export let isPointerOver;

  const cfg = getContext("config");

  $: hidden = !visible;

  function onPointerOver(e) {
    isPointerOver = true;
  }

  function onPointerOut(e) {
    isPointerOver = false;
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
    will-change: transform;
    visibility: visible;
    transition: transform 0.5s ease, visibility 0.5s linear;
  }

  .hidden {
    visibility: hidden;
    transform: translateY(100%);
  }
</style>

<div
  class:hidden
  class="controls"
  style="height:{$cfg.controlsHeight}; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.2) 80%);"
  on:pointerover={onPointerOver}
  on:pointerout={onPointerOut}>
  <slot />
</div>
