<script>
  export let color = "white";
  export let opacity = 1;
  export let value = 0;
</script>

<style>
  .bar {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    border-style: solid;
    border-width: 1px;
    will-change: transform;
  }
</style>

<div
  class="bar"
  style="background-color:{color}; border-color:{color}; opacity:{opacity}; transform: scaleX({value});" />
