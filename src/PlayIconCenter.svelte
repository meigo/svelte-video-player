<script>
  import { getContext } from "svelte";
  import PlayPauseIcon from "./PlayPauseIcon.svelte";

  export let visible;

  const cfg = getContext("config");

  $: hidden = !visible;
</script>

<style>
  .player-icon {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    border-style: none;
    border-radius: 9999px;
    border-width: 2px;
    transition: opacity 0.5s ease, visibility 0.5s linear;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
</style>

<div
  class:hidden
  class="player-icon"
  style="background-color:{$cfg.color}; border-color:{$cfg.focusColor};;">
  <PlayPauseIcon paused />
</div>
