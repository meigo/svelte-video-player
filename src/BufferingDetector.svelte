<script>
  import { onDestroy } from "svelte";

  export let currentTime;
  export let paused;
  export let frequency = 250;
  export let isBuffering = false;

  let lastTime = 0;

  const interval = setInterval(checkBuffering, frequency);

  function checkBuffering() {
    if (!paused) {
      let offset = (frequency - 20) / 1000;

      if (!isBuffering && currentTime < lastTime + offset) {
        isBuffering = true;
      } else if (isBuffering && currentTime > lastTime + offset) {
        isBuffering = false;
      }
    }
    lastTime = currentTime;
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>
