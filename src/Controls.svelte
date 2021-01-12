<style>
  .overlay {
    z-index: 2147483647;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>

<div class="overlay">
  <slot />
</div>
