<script>
  import { fade } from "svelte/transition";

  export let size = "60px";
  export let color = "#FFF";
  export let hidden = false;
</script>

<style>
  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .circle {
    box-sizing: border-box;
    position: absolute;
    height: 100%;
    width: 100%;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;
  }

  .bg {
    opacity: 0.25;
  }

  .rotating {
    animation: 1s linear 0s infinite normal none running rotate;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

{#if !hidden}
  <div
    class="spinner"
    style="width:{size}; height:{size};"
    in:fade|global={{ delay: 500, duration: 500 }}
    out:fade|global={{ duration: 100 }}>
    <div class="circle bg" style="border-color:{color};" />
    <div
      class="circle rotating"
      style="border-color:{color} {color} transparent transparent;" />
  </div>
{/if}
