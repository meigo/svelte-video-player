<div align="center">
  <img src="./svp_animated.svg" alt="SVP logo" width="200" />
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
  <a href="https://npmjs.org/package/svelte-video-player">
    <img src="https://img.shields.io/npm/types/typescript?style=flat-square" alt="typescript" />
  </a>
</div>

# Svelte Video Player

A video player component for Svelte 5 with HLS/DASH streaming, subtitles, picture-in-picture, playback rate control, quality selection, and Media Session API support.

Controls are fully keyboard-accessible. Starting a player pauses any previously playing instance. Fullscreen is disabled on iPhone but works on other mobile and desktop browsers.

## Demo

https://svelte-video-player.netlify.app/

## Installation

```bash
npm install svelte-video-player
```

Requires Svelte 5.

## Usage

Provide `width` and `height` props matching the video's real dimensions to calculate the correct aspect ratio and prevent [CLS](https://web.dev/cls/). The player's actual size is determined by its parent element.

```svelte
<script>
  import VideoPlayer from 'svelte-video-player';
</script>

<VideoPlayer
  poster="https://example.com/poster.jpg"
  source="https://example.com/video.mp4"
/>
```

### Multiple sources

Pass an array to provide fallback formats:

```svelte
<VideoPlayer
  source={['video.mp4', 'video.webm']}
/>
```

### HLS streaming

HLS streams are auto-detected from `.m3u8` URLs. [hls.js](https://github.com/video-dev/hls.js) is lazy-loaded only when needed.

```svelte
<VideoPlayer source="https://example.com/stream.m3u8" />
```

### DASH streaming

DASH streams are auto-detected from `.mpd` URLs. [dashjs](https://github.com/Dash-Industry-Forum/dash.js) is lazy-loaded only when needed.

```svelte
<VideoPlayer source="https://example.com/stream.mpd" />
```

### Subtitles / Captions

A CC toggle button appears automatically when tracks are provided. Track selection is available in the settings menu. The `crossorigin` attribute is set automatically when tracks are present.

```svelte
<VideoPlayer
  source="video.mp4"
  tracks={[
    { src: '/subs/en.vtt', srclang: 'en', label: 'English', default: true },
    { src: '/subs/es.vtt', srclang: 'es', label: 'Spanish' }
  ]}
/>
```

### Chapters

```svelte
<VideoPlayer
  source="video.mp4"
  chapters={[
    { time: 0, label: 'Intro' },
    { time: 60, label: 'Chapter 1' },
    { time: 180, label: 'Chapter 2' }
  ]}
/>
```

### Media Session

Integrate with the browser's Media Session API for OS-level media controls:

```svelte
<VideoPlayer
  source="video.mp4"
  mediaSession={{
    title: 'My Video',
    artist: 'Author',
    album: 'Collection',
    artwork: [{ src: '/art.jpg', sizes: '512x512', type: 'image/jpeg' }]
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `width` | `number \| string` | `1920` | Real video width for aspect ratio calculation |
| `height` | `number \| string` | `1080` | Real video height for aspect ratio calculation |
| `poster` | `string` | `''` | Poster image URL |
| `source` | `string \| string[]` | `''` | Video source URL(s) — supports `mp4`, `webm`, `ogg`, `m3u8`, `mpd` |
| `loop` | `boolean` | `false` | Loop playback |
| `autoplay` | `boolean` | `false` | Autoplay on load |
| `playsinline` | `boolean` | `true` | Play inline on mobile |
| `preload` | `string` | `'metadata'` | Preload behavior (`none`, `metadata`, `auto`) |
| `crossorigin` | `string` | `undefined` | CORS mode (auto-set to `anonymous` when tracks are provided) |
| `skipSeconds` | `number \| string` | `5` | Seconds to skip with arrow keys |
| `controlsOnPause` | `boolean` | `true` | Show controls when paused |
| `timeDisplay` | `boolean` | `true` | Show current time / duration |
| `remainingTime` | `boolean` | `false` | Show remaining time instead of current time |
| `playbackRateControl` | `boolean` | `true` | Enable playback rate control in settings menu |
| `tracks` | `TextTrackConfig[]` | `[]` | Subtitle/caption tracks |
| `chapters` | `Chapter[]` | `[]` | Chapter markers on the progress bar |
| `mediaSession` | `MediaSessionConfig` | `undefined` | Media Session API metadata |

### Styling props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `color` | `string` | `'#FF3E00'` | Main color of controls |
| `playerBgColor` | `string` | `'black'` | Player background color |
| `iconColor` | `string` | `'white'` | Button icon color |
| `focusColor` | `string` | `'white'` | Focus outline color |
| `barsBgColor` | `string` | `'white'` | Track background color |
| `borderColor` | `string` | `'none'` | Player border color (set to a color value to show border) |
| `controlsHeight` | `string` | `'55px'` | Height of bottom control bar |
| `trackHeight` | `string` | `'4px'` | Height of playbar and volume tracks |
| `thumbSize` | `string` | `'15px'` | Size of slider thumbs |
| `centerIconSize` | `string` | `'60px'` | Size of center play icon |
| `borderRadius` | `string` | `'8px'` | Player corner radius |
| `buttonBorderRadius` | `string` | `'50%'` | Button corner radius |

## Keyboard shortcuts

| Key | Action |
|:----|:-------|
| Space | Play / Pause |
| Left / Right arrow | Skip backward / forward |
| Tab | Navigate controls |
| Enter / Space | Activate focused control |
| Escape | Close settings menu |
| < / > | Decrease / Increase playback rate |

## SSR

The component renders a server-side placeholder matching the video's aspect ratio. The full player hydrates on the client.

## License

[MIT](LICENSE)
