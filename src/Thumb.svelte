<script>
  import { getContext } from "svelte";

  export let positionValue = 0;
  export let active = false;

  const cfg = getContext("config");

  $: tx = positionValue * 100;
</script>

<style>
  .thumb-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    pointer-events: none;
  }

  .thumb {
    position: relative;
    border-style: none;
    border-radius: 50%;
    border-width: 2px;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .active {
    border-style: solid;
  }
</style>

<div class="thumb-wrapper" style="transform: translateX({tx}%);">
  <div
    class:active
    class="thumb"
    style="width:{$cfg.thumbSize}; height:{$cfg.thumbSize}; background-color:{$cfg.color}; border-color:{$cfg.color};" />
</div>
