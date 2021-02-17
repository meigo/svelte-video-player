<script>
  export let playerBgColor;
  export let borderRadius;
  export let aspectRatio;
</script>

<style>
  .aspect {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; /* default 1:1 */
    overflow: hidden;
    border-radius: 8px;
    /* Safari overflow:hidden fix */
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    mask-image: -webkit-radial-gradient(white, black);
  }
</style>

<div
  class="aspect"
  style="padding-top:{aspectRatio * 100}%; background-color:{playerBgColor}; border-radius:{borderRadius}" />
