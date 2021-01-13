<script>
  import { onDestroy } from "svelte";
  import debounce from "./libs/debounce.js";

  export let isIdle = false;

  let timeout;

  function onActivity(e) {
    isIdle = false;
    setIdleTimeout();
  }

  const setIdleTimeout = debounce(
    () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isIdle = true;
      }, 2000);
    },
    250,
    true
  );

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<svelte:window on:pointermove={onActivity} on:keydown={onActivity} />
