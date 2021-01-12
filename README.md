<div align="center">
  <img src="./svp.svg" alt="svp" width="200" alt="SVP logo" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://badgen.net/npm/v/svelte-video-player" alt="version" />
  </a>
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://badgen.net/npm/license/svelte-video-player" alt="licence" />
  </a>
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://badgen.net/npm/dependents/svelte-video-player" alt="dependents" />
  </a>
</div>

# Svelte Video Player

## Basic video player component for svelte.

Controls are tabbable and respond to key presses (enter/space/arrows) where applicable.

Starting a player will pause previously playing video player instance.

Fullscreen functionality is disabled on iPhone, other than that should function fairly smoothly in both desktop and mobile browsers.

## Demo

https://svelte-video-player.netlify.app/

## Installation

```bash
yarn add svelte-video-player

or

npm install svelte-video-player
```

## Props / Defaults

- `width` : `1920` - For calculating aspect ratio for responsive design.
- `height` : `1080` - For calculating aspect ratio for responsive design.
- `poster` - Absolute or relative URL of poster image.
- `source` - Absolute or relative URL (or array of those) of video source. Supported formats are `webm`, `mp4` and `ogg`.
- `controlsHeigh` : `55px`
- `trackHeight` : `6px`
- `thumbSize` : `15px`
- `centerIconSize` : `60px`
- `playerBgColor` : `black`
- `color` : `#FF3E00`
- `focusColor` : `white`
- `barsBgColor` : `white`
- `iconColor` : `white`
- `bufferedColor` : `#FF9600`
- `chunkBars` : `false`
- `loop` : `false`

## Usage

See [Example App.svelte](./example/src/App.svelte).

If aspect ratio of the video is other than default 16:9 provide `width` and `height` props to player for calculating aspect ratio to prevent [CLS](https://web.dev/cls/).
Real size of video player will be determined by it's parent element.

```js
<VideoPlayer poster="poster_url" source="video_url" />
```

```js
<VideoPlayer width="500" height="500" poster="./local_poster.jpg" source="./local_video.mp4" loop />
```

```js
<script>
  import VideoPlayer from 'svelte-video-player';

  const poster = 'https://www.server.com/poster.jpg';
  const source = [
    'https://www.server.com/video.webm',
    'https://www.server.com/video.mp4',
    'https://www.server.com/video.ogv',
  ];
</script>

<VideoPlayer {poster} {source} />;
```
