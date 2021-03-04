<script>
  import VideoPlayerClient from './VideoPlayerClient.svelte';
  import VideoPlayerServer from './VideoPlayerServer.svelte';

  let isClient = typeof window !== 'undefined' ? true : false;

  //-------------------------------------------------------------------------------------------------------------------
  // PROPS
  //-------------------------------------------------------------------------------------------------------------------

  /**
   * Real width of video for calculating aspect ratio for responsive design
   * @type {number | string}
   */
  export let width = 1920;
  /**
   * Real height of video for calculating aspect ratio for responsive design
   * @type {number | string}
   */
  export let height = 1080;
  /**
   * Absolute or relative URL of poster image
   */
  export let poster = '';
  /**
   * Absolute or relative URL (or array of those) of video source. Supported formats are `webm`, `mp4` and `ogg`
   * @type {string | string[]}
   */
  export let source = '';
  /**
   * Height of bottom control bar, rescaling included components
   */
  export let controlsHeight = '55px';
  /**
   * Height of playbar and volume slider tracks
   */
  export let trackHeight = '6px';
  /**
   * Size of playbar and volume slider thumb
   */
  export let thumbSize = '15px';
  /**
   * Size of center icon
   */
  export let centerIconSize = '60px';
  /**
   * Color of player background
   */
  export let playerBgColor = 'black';
  /**
   * Main color of control components
   */
  export let color = '#FF3E00';
  /**
   * Color of focus outlines
   */
  export let focusColor = 'white';
  /**
   * Background color of playbar and volume slider tracks
   */
  export let barsBgColor = 'white';
  /**
   * Color of button icons
   */
  export let iconColor = 'white';
  /**
   * Color of buffered chunks
   */
  export let bufferedColor = '#FF9600';
  /**
   * Display overlay with buffered and played parts of video
   */
  export let chunkBars = false;
  /**
   * Rounded corner radius of the player
   */
  export let borderRadius = '8px';
  /**
   * Play video in loop
   */
  export let loop = false;
  /**
   * Skipping time in seconds
   * @type {number | string}
   */
  export let skipSeconds = 5;

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
    {aspectRatio} />
{:else}
  <VideoPlayerServer {playerBgColor} {borderRadius} {aspectRatio} />
{/if}
