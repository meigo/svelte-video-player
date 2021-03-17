/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

export interface VideoPlayerProps {
  /**
   * Real width of video for calculating aspect ratio for responsive design
   * @default 1920
   */
  width?: number | string;

  /**
   * Real height of video for calculating aspect ratio for responsive design
   * @default 1080
   */
  height?: number | string;

  /**
   * Absolute or relative URL of poster image
   * @default ''
   */
  poster?: string;

  /**
   * Absolute or relative URL (or array of those) of video source. Supported formats are `webm`, `mp4` and `ogg`
   * @default ''
   */
  source?: string | string[];

  /**
   * Height of bottom control bar, rescaling included components
   * @default '55px'
   */
  controlsHeight?: string;

  /**
   * Height of playbar and volume slider tracks
   * @default '6px'
   */
  trackHeight?: string;

  /**
   * Size of playbar and volume slider thumb
   * @default '15px'
   */
  thumbSize?: string;

  /**
   * Size of center icon
   * @default '60px'
   */
  centerIconSize?: string;

  /**
   * Color of player background
   * @default 'black'
   */
  playerBgColor?: string;

  /**
   * Main color of control components
   * @default '#FF3E00'
   */
  color?: string;

  /**
   * Color of focus outlines
   * @default 'white'
   */
  focusColor?: string;

  /**
   * Background color of playbar and volume slider tracks
   * @default 'white'
   */
  barsBgColor?: string;

  /**
   * Color of button icons
   * @default 'white'
   */
  iconColor?: string;

  /**
   * Color of buffered chunks
   * @default '#FF9600'
   */
  bufferedColor?: string;

  /**
   * Display overlay with buffered and played parts of video
   * @default false
   */
  chunkBars?: boolean;

  /**
   * Rounded corner radius of the player
   * @default '8px'
   */
  borderRadius?: string;

  /**
   * Play video in loop
   * @default false
   */
  loop?: boolean;

  /**
   * Skipping time in seconds
   * @default 5
   */
  skipSeconds?: number | string;

  /**
   * Show control bar when video is paused
   * @default true
   */
  controlsOnPause?: boolean;

  /**
   * Display current time beside playbar
   * @default false
   */
  timeDisplay?: boolean;
}

export default class VideoPlayer extends SvelteComponentTyped<VideoPlayerProps, {}, {}> {}
