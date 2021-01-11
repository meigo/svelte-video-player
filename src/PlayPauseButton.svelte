<script>
  import Button from "./Button.svelte";
  import PlayPauseIcon from "./PlayPauseIcon.svelte";

  export let paused;
</script>

<Button on:pointerup>
  <PlayPauseIcon {paused} />
</Button>
