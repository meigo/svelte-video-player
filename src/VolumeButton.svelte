<script>
  import Button from "./Button.svelte";
  import VolumeIcon from "./VolumeIcon.svelte";

  export let muted;
</script>

<Button on:pointerup>
  <VolumeIcon {muted} />
</Button>
