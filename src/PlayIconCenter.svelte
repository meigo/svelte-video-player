<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import PlayPauseIcon from "./PlayPauseIcon.svelte";

  export let hidden;

  const cfg = getContext("config");
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
  }
</style>

{#if !hidden}
  <div
    class="player-icon"
    style="background-color:{$cfg.color}; border-color:{$cfg.focusColor};"
    transition:fade={{ duration: 500 }}>
    <PlayPauseIcon paused />
  </div>
{/if}
