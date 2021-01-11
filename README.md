<div align="center">
  <img src="./svp.svg" alt="svp" width="250" alt="SVP logo" />
</div>

# Svelte Video Player

Basic video player component.

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

## Usage

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

```js
<VideoPlayer poster="posterUrl" source="video_url" />
```

```js
<VideoPlayer poster="./local_poster.jpg" source="./local_video.mp4" />
```
