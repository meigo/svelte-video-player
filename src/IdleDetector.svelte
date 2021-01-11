<script>
  import { onDestroy } from "svelte";

  export let isIdle = true;

  let reset = false;
  let timeout;
  const interval = setInterval(checkReset, 250);

  function checkReset() {
    if (reset) {
      isIdle = false;
      reset = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isIdle = true;
      }, 2000);
    }
  }

  onDestroy(() => {
    clearTimeout(timeout);
    clearInterval(interval);
  });
</script>

<svelte:window
  on:pointermove={() => (reset = true)}
  on:keydown={() => (reset = true)} />
