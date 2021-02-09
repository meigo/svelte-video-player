<script>
  export let src;
</script>

<style>
  .poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<img {src} class="poster" alt="poster" onerror="this.style.display='none'" />
