<script>
  import { onDestroy } from "svelte";

  export let currentTime;
  export let paused;
  export let frequency = 100.0;
  export let isBuffering = false;

  let lastTime = 0;

  const interval = setInterval(checkBuffering, frequency);

  function checkBuffering() {
    let offset = (frequency - 20) / 1000;

    if (!isBuffering && currentTime < lastTime + offset && !paused) {
      isBuffering = true;
    }

    if (isBuffering && currentTime > lastTime + offset && !paused) {
      isBuffering = false;
    }
    lastTime = currentTime;
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>
