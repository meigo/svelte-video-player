<script>
  import { getContext } from "svelte";

  export let size = "100%";
  export let isFullscreen;

  const cfg = getContext("config");
</script>

<style>
  .fullscreen-icon {
    position: absolute;
  }
</style>

<div class="fullscreen-icon" style="width:{size};">
  <svg viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">
    <g fill="none" stroke={$cfg.iconColor} stroke-width="5">
      <g visibility={!isFullscreen ? 'visible' : 'hidden'}>
        <path d="M71 60.5V71H60" />
        <path d="M40 71H29V60.5" />
        <path d="M29 40.5V29h11" />
        <path d="M60 29h11v11.5" />
      </g>
      <g visibility={isFullscreen ? 'visible' : 'hidden'}>
        <path d="M60 71V60.5h11" />
        <path d="M29 60.5h11V71" />
        <path d="M40 29v11.5H29" />
        <path d="M71 40.5H60V29" />
      </g>
    </g>
  </svg>
</div>
