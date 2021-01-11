<script>
  import Slider from "./Slider.svelte";

  export let width = "100px";
  export let volume = 1;
</script>

<Slider bind:value={volume} {width} />
