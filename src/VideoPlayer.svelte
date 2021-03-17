<script>
  import VideoPlayerClient from './VideoPlayerClient.svelte';
  import VideoPlayerServer from './VideoPlayerServer.svelte';

  let isClient = typeof window !== 'undefined' ? true : false;

  //-------------------------------------------------------------------------------------------------------------------
  // PROPS
  //-------------------------------------------------------------------------------------------------------------------

  export let width = 1920;
  export let height = 1080;
  export let poster = '';
  export let source = '';
  export let controlsHeight = '55px';
  export let trackHeight = '6px';
  export let thumbSize = '15px';
  export let centerIconSize = '60px';
  export let playerBgColor = 'black';
  export let color = '#FF3E00';
  export let focusColor = 'white';
  export let barsBgColor = 'white';
  export let iconColor = 'white';
  export let bufferedColor = '#FF9600';
  export let chunkBars = false;
  export let borderRadius = '8px';
  export let loop = false;
  export let skipSeconds = 5;
  export let controlsOnPause = true;
  export let timeDisplay = false;

  $: _width = parseInt(width);
  $: _height = parseInt(height);
  $: aspectRatio = _height / _width;
</script>

{#if isClient}
  <VideoPlayerClient
    {width}
    {height}
    {poster}
    {source}
    {controlsHeight}
    {trackHeight}
    {thumbSize}
    {centerIconSize}
    {playerBgColor}
    {color}
    {focusColor}
    {barsBgColor}
    {iconColor}
    {bufferedColor}
    {chunkBars}
    {borderRadius}
    {loop}
    {skipSeconds}
    {aspectRatio}
    {controlsOnPause}
    {timeDisplay} />
{:else}
  <VideoPlayerServer {playerBgColor} {borderRadius} {aspectRatio} />
{/if}
