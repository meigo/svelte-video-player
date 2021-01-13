<script>
  export let color = "white";
  export let opacity = 1;
  export let ranges = []; // [{start, end}, ...]
</script>

<style>
  .chunk-bar {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .chunk {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
  }
</style>

<div class="chunk-bar">
  {#each ranges as range}
    <div
      class="chunk"
      style="background-color:{color}; opacity:{opacity}; transform: translateX({range.start * 100}%) scaleX({range.end - range.start});" />
  {/each}
</div>
