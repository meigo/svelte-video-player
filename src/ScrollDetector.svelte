<script>
  import { onDestroy } from "svelte";

  export let isScrolling = false;

  let reset;
  let timeout;
  const interval = setInterval(checkScroll, 100);

  function checkScroll() {
    if (reset) {
      isScrolling = true;
      reset = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }
  }

  function onWindowScroll(e) {
    reset = true;
  }

  onDestroy(() => {
    clearTimeout(timeout);
    clearInterval(interval);
  });
</script>

<svelte:window on:scroll={onWindowScroll} />
