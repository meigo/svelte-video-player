<div align="center">
  <img src="./svp_animated.svg" alt="svp" width="200" alt="SVP logo" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://img.shields.io/npm/v/svelte-video-player?style=flat-square" alt="version" />
  </a>
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://img.shields.io/npm/l/svelte-video-player?style=flat-square" alt="licence" />
  </a>
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://img.shields.io/badge/dependencies-0-green?style=flat-square" alt="dependencies" />
  </a>
</div>

# Svelte Video Player

## Basic video player component for svelte.

Controls are tabbable and respond to key presses (enter/space/arrows) where applicable.

Starting a player will pause previously playing video player instance.

Fullscreen functionality is disabled on iPhone, other than that should function fairly smoothly in both desktop and mobile browsers.

## DEMO

https://svelte-video-player.netlify.app/

## Installation

```bash
yarn add svelte-video-player
```

or

```bash
npm install svelte-video-player
```

## Props / Defaults

- `width` : `1920` - For calculating aspect ratio for responsive design.
- `height` : `1080` - For calculating aspect ratio for responsive design.
- `poster` - Absolute or relative URL of poster image.
- `source` - Absolute or relative URL (or array of those) of video source. Supported formats are `webm`, `mp4` and `ogg`.
- `borderRadius` : `8px`
- `controlsHeight` : `55px`
- `trackHeight` : `6px`
- `thumbSize` : `15px`
- `centerIconSize` : `60px`
- `playerBgColor` : `black`
- `color` : `#FF3E00`
- `focusColor` : `white`
- `barsBgColor` : `white`
- `iconColor` : `white`
- `bufferedColor` : `#FF9600`
- `chunkBars` : `false` - Visualise buffered and played parts of video.
- `loop` : `false`
- `skipSeconds` : `5` - Skip time amount when pressing left/right arrow keys

## USAGE

If aspect ratio of the video is other than default 16:9 provide `width` and `height` props to player for calculating aspect ratio to prevent [CLS](https://web.dev/cls/).
Real size of video player will be determined by it's parent element.

### IMPORT DIRECTLY TO SVELTE APPS

See [Example App.svelte](./example/src/App.svelte).

```html
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

```js
<VideoPlayer poster="poster_url" source="video_url" />
```

```js
<VideoPlayer width="500" height="500" poster="./local_poster.jpg" source="./local_video.mp4" loop />
```

### FOR NON-SVELTE USAGE LOAD PREBUILT SCRIPT AND STYLESHEET FROM unpkg.com

```html
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/svelte-video-player@latest/dist/svelte-video-player.css" />
    <script src="https://unpkg.com/svelte-video-player@latest/dist/svelte-video-player.js"></script>

    <script>
      function initPlayer() {
        let player = new VideoPlayer({
          target: document.getElementById('player'),
          props: {
            poster:
              'https://res.cloudinary.com/animaly/image/upload/c_scale,w_960/v1608783923/ntiiorkrkxba6kmooa4u.gif',
            source:
              'https://res.cloudinary.com/animaly/video/upload/ac_aac,vc_h264/v1608783907/xixhbu5v9aawqqgiafri.mp4',
            controlsHeight: '45px',
            centerIconSize: '50px',
            color: 'deepskyblue',
          },
        });
      }
    </script>
  </head>
  <body onload="initPlayer()">
    <div style="width: 400px; margin: 0 auto;">
      <div id="player" />
    </div>
  </body>
</html>
```
