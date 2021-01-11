<script>
  import { getContext } from "svelte";

  export let size = "100%";
  export let visible = true;
  export let filled = false;
  export let paused;

  const cfg = getContext("config");
</script>

<style>
  .container {
    position: absolute;
  }
</style>

<div
  class="container"
  style="width:{size}; display:{visible ? 'block' : 'none'};">
  <svg
    viewBox="0 0 100 100"
    width="100%"
    stroke-linecap="round"
    stroke-linejoin="round">
    <path
      visibility={!paused ? 'visible' : 'hidden'}
      d="M40 29v42M60 29v42"
      stroke={$cfg.iconColor}
      stroke-width="5" />
    <path
      visibility={paused ? 'visible' : 'hidden'}
      d="M40 29v42l26-21-26-21z"
      fill={filled ? $cfg.iconColor : 'none'}
      stroke={$cfg.iconColor}
      stroke-width="5" />
  </svg>
</div>
