<script>
  import Button from "./Button.svelte";
  import FullscreenIcon from "./FullscreenIcon.svelte";

  export let isFullscreen;
</script>

<Button on:pointerup>
  <FullscreenIcon {isFullscreen} />
</Button>
