<script>
  import { getContext } from "svelte";

  import PlayIconCenter from "./PlayIconCenter.svelte";
  import Spinner from "./Spinner.svelte";

  export let isBuffering;
  export let isSpinnerVisible;
  export let isIconVisible;

  let offsetWidth;

  const cfg = getContext("config");
</script>

<style>
  .center-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div
  class="center-icons"
  style="width:{$cfg.centerIconSize}; height:{$cfg.centerIconSize};"
  bind:offsetWidth>
  <PlayIconCenter hidden={!isIconVisible} />
  <Spinner
    hidden={!isSpinnerVisible}
    color={isBuffering ? $cfg.color : $cfg.iconColor}
    size="{offsetWidth + 10}px" />
</div>
