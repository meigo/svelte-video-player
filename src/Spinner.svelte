<script>
  export let size = "60px";
  export let color = "#FFF";
  export let visible;

  $: hidden = !visible;
</script>

<style>
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.5s ease, visibility 0.5s linear;
    transition-delay: 0.5s;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
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

<div class:hidden class="container" style="width:{size}; height:{size};">
  <div class="circle bg" style="border-color:{color};" />
  <div
    class="circle rotating"
    style="border-color:{color} {color} transparent transparent;" />
</div>
