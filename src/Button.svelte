<script>
  import { createEventDispatcher } from "svelte";
  import { getContext } from "svelte";

  export let tabbable = true;
  export let round = false;

  const dispatch = createEventDispatcher();

  const cfg = getContext("config");

  let offsetHeight;

  function onPointerUp(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch("pointerup");
  }

  function onKeydown(e) {
    switch (e.code) {
      case "Enter":
      case "NumpadEnter":
      case "Space":
        e.preventDefault(); // Prevent scroll
        e.stopPropagation();
        dispatch("pointerup");
        break;
    }
  }
</script>

<style>
  .player-button {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    border-style: none;
    border-radius: 10px;
    border-width: 2px;
    outline: none;
    cursor: pointer;
  }

  @media (hover: hover) and (pointer: fine) {
    .player-button:focus {
      border-style: solid;
    }
  }
</style>

<div
  class="player-button"
  style="width:{offsetHeight}px; min-width:{offsetHeight}px; background-color:{$cfg.color}; border-color:{$cfg.focusColor}; border-radius:{round ? '9999px' : '10px'};"
  tabindex={tabbable ? '0' : '-1'}
  bind:offsetHeight
  on:pointerup={onPointerUp}
  on:keydown={onKeydown}>
  <slot />
</div>
