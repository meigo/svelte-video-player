<script>
  import { getContext } from "svelte";

  export let size = "100%";
  export let filled = true;
  export let muted;

  const cfg = getContext("config");
</script>

<style>
  .volume-icon {
    position: absolute;
  }
</style>

<div class="volume-icon" style="width:{size};">
  <svg viewBox="0 0 100 100" stroke-linecap="round" stroke-linejoin="round">
    <g fill="none" stroke={$cfg.iconColor} stroke-width="5">
      <path
        fill={filled ? $cfg.iconColor : 'none'}
        d="M33.913 38.955l14.58-11.046v44.918l-14.58-11.045H22.154V38.955h11.759z" />
      <g visibility={!muted ? 'visible' : 'hidden'}>
        <path d="M68.27 31.776c10.039 10.058 10.039 26.39 0 36.448" />
        <path d="M61.062 38.986c6.067 6.079 6.067 15.949 0 22.028" />
      </g>
      <g visibility={muted ? 'visible' : 'hidden'}>
        <path d="M59.644 41.173l17.621 17.658" />
        <path d="M77.265 41.173L59.644 58.831" />
      </g>
    </g>
  </svg>
</div>
