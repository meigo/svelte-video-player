<script lang="ts">
	import VideoPlayer from '$lib/VideoPlayer.svelte';

	const poster: string =
		'https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.jpg?width=1280';
	const source: string =
		'https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/medium.mp4';

	// Sintel trailer (Blender Open Movie)
	const source2: string = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
	const poster2: string = 'https://media.w3.org/2010/05/sintel/poster.png';

	const posterKaka: string = './kaka_walk.jpg';
	const sourceKaka: string[] = ['./kaka_walk.mp4'];

	// HLS test stream (Apple)
	const hlsSource: string =
		'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8';

	// DASH test stream (Big Buck Bunny)
	const dashSource: string = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';

	let controlsHeight = $state(60);
	let trackHeight = $state(4);
	let thumbSize = $state(15);
	let centerIconSize = $state(60);
	let color = $state('#FF3E00');
	let playerBgColor = $state('#111111');
	let barsBgColor = $state('#FFFFFF');
	let focusColor = $state('#FFFFFF');
	let iconColor = $state('#FFFFFF');
	let borderColor = $state('#333333');
	let loop = $state(false);
	let autoplay = $state(false);
	let playsinline = $state(true);
	let borderRadius = $state(8);
	let buttonBorderRadius = $state(50);
	let skipSeconds = $state(10);
	let controlsOnPause = $state(true);
	let timeDisplay = $state(true);
	let remainingTime = $state(false);
	let playbackRateControl = $state(true);
	let currentTime = $state(0);
</script>

<main>
	<img class="center" src="./svp_animated.svg" height="50" alt="SVP logo" />
	<h1>Svelte Video Player</h1>

	<div class="badge">
		<a href="https://npmjs.org/package/svelte-video-player">
			<img
				height="20"
				src="https://img.shields.io/npm/v/svelte-video-player?style=flat-square"
				alt="version"
			/>
		</a>
	</div>

	<p class="intro">
		A video player component for Svelte 5 with HLS/DASH streaming, subtitles, picture-in-picture,
		playback rate control, quality selection, and keyboard-accessible controls. Zero dependencies.
		Works with SSR.
	</p>

	<section>
		<h2>Configurable Player</h2>
		<p>
			Every aspect of the player is customizable through props. Adjust colors, dimensions, and
			behavior using the controls below. This player includes multi-language subtitles and a
			settings menu for playback speed, caption selection, and picture-in-picture.
		</p>

		<VideoPlayer
			width="1920"
			height="1080"
			{poster}
			{source}
			controlsHeight="{controlsHeight}px"
			thumbSize="{thumbSize}px"
			trackHeight="{trackHeight}px"
			centerIconSize="{centerIconSize}px"
			borderRadius="{borderRadius}px"
			{borderColor}
			buttonBorderRadius="{buttonBorderRadius}%"
			{color}
			{playerBgColor}
			{barsBgColor}
			{iconColor}
			{focusColor}
			{loop}
			{autoplay}
			{playsinline}
			{skipSeconds}
			{controlsOnPause}
			{timeDisplay}
			{remainingTime}
			{playbackRateControl}
			bind:currentTime
			tracks={[
				{
					src: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
					srclang: 'en',
					label: 'English',
					default: true
				},
				{
					src: 'https://files.vidstack.io/sprite-fight/subs/spanish.vtt',
					srclang: 'es',
					label: 'Spanish'
				},
				{
					src: 'https://files.vidstack.io/sprite-fight/subs/german.vtt',
					srclang: 'de',
					label: 'German'
				}
			]}
		/>

		<div class="config-grid">
			<label
				><span>Controls Height</span>
				<input type="range" min="40" max="150" bind:value={controlsHeight} />
			</label>
			<label
				><span>Thumb Size</span>
				<input type="range" min="4" max="50" bind:value={thumbSize} />
			</label>
			<label
				><span>Track Height</span>
				<input type="range" min="4" max="20" bind:value={trackHeight} />
			</label>
			<label
				><span>Border Radius</span>
				<input type="range" min="0" max="25" bind:value={borderRadius} />
			</label>
			<label
				><span>Button Radius</span>
				<input type="range" min="0" max="50" bind:value={buttonBorderRadius} />
			</label>
			<label
				><span>Skip Seconds</span>
				<input type="range" min="1" max="20" bind:value={skipSeconds} />
			</label>
			<label
				><span>Center Icon Size</span>
				<input type="range" min="40" max="200" bind:value={centerIconSize} />
			</label>
			<label><span>Loop</span><input type="checkbox" bind:checked={loop} /></label>
			<label><span>Autoplay</span><input type="checkbox" bind:checked={autoplay} /></label>
			<label><span>Plays Inline</span><input type="checkbox" bind:checked={playsinline} /></label>
			<label
				><span>Controls On Pause</span><input
					type="checkbox"
					bind:checked={controlsOnPause}
				/></label
			>
			<label><span>Time Display</span><input type="checkbox" bind:checked={timeDisplay} /></label>
			<label
				><span>Remaining Time</span><input type="checkbox" bind:checked={remainingTime} /></label
			>
			<label
				><span>Playback Rate</span><input
					type="checkbox"
					bind:checked={playbackRateControl}
				/></label
			>
			<label><span>Color</span><input type="color" bind:value={color} /></label>
			<label><span>Player Bg Color</span><input type="color" bind:value={playerBgColor} /></label>
			<label><span>Bars Bg Color</span><input type="color" bind:value={barsBgColor} /></label>
			<label><span>Icon Color</span><input type="color" bind:value={iconColor} /></label>
			<label><span>Focus Color</span><input type="color" bind:value={focusColor} /></label>
			<label><span>Border Color</span><input type="color" bind:value={borderColor} /></label>
			<label><span>Current Time</span><input type="number" bind:value={currentTime} /></label>
		</div>
	</section>

	<section>
		<h2>Multiple Players</h2>
		<p>
			Only one player plays at a time — starting playback on one will pause any other active
			instance. Players can be placed in any layout: standalone, inline with text, or in a grid.
		</p>

		<VideoPlayer
			width="1920"
			height="818"
			poster={poster2}
			source={source2}
			{playerBgColor}
			borderColor="#333"
			skipSeconds="3"
		/>
	</section>

	<section>
		<h2>Inline Layout</h2>
		<p>
			The player adapts to its container width while preserving the correct aspect ratio. Set the <code
				>width</code
			>
			and <code>height</code> props to match the video's native resolution — the player uses these
			to calculate the ratio, not to set its actual size. Players can be embedded inline with text
			content, floating alongside paragraphs for a natural editorial feel.
			<span class="video-player-inline">
				<VideoPlayer
					width="540"
					height={540}
					{playerBgColor}
					borderColor="#333"
					poster={posterKaka}
					source={sourceKaka}
					loop
					skipSeconds="2"
				/>
			</span>
		</p>
		<p>
			The component renders a lightweight server-side placeholder matching the video's aspect ratio,
			then hydrates the full player on the client.
			<span class="video-player-inline video-player-inline-sm video-player-inline-right">
				<VideoPlayer
					width="540"
					height={540}
					{playerBgColor}
					borderColor="#333"
					poster={posterKaka}
					source={sourceKaka}
					loop
					skipSeconds="2"
				/>
			</span>This prevents layout shift during page load and keeps the initial HTML payload small.
			Controls appear on hover or focus and auto-hide after a period of inactivity. On touch
			devices, a single tap toggles control visibility. All player instances share a single playback
			slot — when one starts playing, any previously active player pauses automatically. This keeps
			the audio experience clean on pages with multiple embedded videos and avoids competing sound
			sources. Each instance maintains its own state for volume, playback position, and caption
			selection. The player is fully responsive and works well at any size, from small inline embeds
			to full-width layouts.
		</p>
	</section>

	<section>
		<h2>Side by Side</h2>
		<p>
			Side-by-side layouts work well for comparing content or showing related videos. Each player
			instance maintains its own state independently.
		</p>

		<div class="video-player-grid">
			<VideoPlayer
				width="1920"
				height="818"
				poster={poster2}
				source={source2}
				{playerBgColor}
				borderColor="#333"
				skipSeconds="3"
			/>
			<VideoPlayer
				width="1920"
				height="1080"
				source="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
				skipSeconds={3}
				{playerBgColor}
				borderColor="#333"
			/>
		</div>
	</section>

	<section>
		<h2>HLS Streaming</h2>
		<p>
			HLS streams are auto-detected from <code>.m3u8</code> URLs. The player lazy-loads
			<a href="https://github.com/video-dev/hls.js">hls.js</a> only when needed, keeping the base bundle
			small. Adaptive bitrate streaming adjusts quality based on network conditions. Quality levels appear
			in the settings menu when available.
		</p>
		<VideoPlayer
			width="1920"
			height="1080"
			source={hlsSource}
			playerBgColor="black"
			borderColor="#333"
		/>
	</section>

	<section>
		<h2>DASH Streaming</h2>
		<p>
			DASH streams are auto-detected from <code>.mpd</code> URLs.
			<a href="https://github.com/Dash-Industry-Forum/dash.js">dashjs</a> is lazy-loaded on demand. Like
			HLS, quality levels are exposed in the settings menu for manual override.
		</p>
		<VideoPlayer
			width="1920"
			height="1080"
			source={dashSource}
			playerBgColor="black"
			borderColor="#333"
		/>
	</section>

	<section>
		<h2>Keyboard Accessible</h2>
		<p>
			All controls are navigable with Tab and activatable with Enter or Space. Arrow keys skip
			forward and backward. The settings menu supports full keyboard navigation with Escape to
			close. Volume and caption controls expand on focus.
		</p>
	</section>
</main>

<style>
	:global(body) {
		background-color: #0a0a0a;
		color: #c0c0c0;
		font-family: 'Lucida Console', monospace;
		margin: 0;
	}

	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 10px 16px 40px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2.4rem;
		font-weight: 100;
		text-align: center;
		line-height: 1;
		padding: 0.2rem 0 1rem;
	}

	h2 {
		color: #e0e0e0;
		font-size: 1rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border-bottom: 1px solid #222;
		padding-bottom: 0.4rem;
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.8rem;
		line-height: 1.6;
		color: #808080;
		margin: 0.5rem 0 1rem;
	}

	.intro {
		text-align: center;
		max-width: 560px;
		margin: 0 auto 2rem;
	}

	code {
		color: #c0c0c0;
		background-color: #1a1a1a;
		padding: 1px 5px;
		border-radius: 3px;
		font-size: 0.75rem;
	}

	a {
		color: #ff3e00;
	}

	section {
		margin: 2.5rem 0;
		overflow: hidden;
	}

	.badge {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.center {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.config-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0px 10px;
		justify-items: center;
		font-size: 0.65rem;
		background-color: #141414;
		border: 1px solid #222;
		border-radius: 6px;
		padding: 1rem 0.5rem;
		margin-top: 1rem;
	}

	.config-grid label {
		display: block;
		min-height: 30px;
		width: 9rem;
		color: #909090;
	}

	.config-grid label input {
		float: right;
	}

	input[type='range'] {
		width: 50px;
		accent-color: #ff3e00;
	}

	input[type='color'] {
		width: 50px;
		background: none;
		border: 1px solid #333;
		border-radius: 3px;
		padding: 0;
		height: 18px;
	}

	input[type='checkbox'] {
		accent-color: #ff3e00;
		transform: scale(1.1);
	}

	input[type='number'] {
		width: 40px;
		background-color: #1a1a1a;
		border: 1px solid #333;
		border-radius: 3px;
		color: #c0c0c0;
		padding: 2px 5px;
	}

	.video-player-inline {
		display: block;
		margin: 1rem 0;
	}

	.video-player-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 10px 0px;
		margin-top: 1rem;
	}

	@media (min-width: 640px) {
		.config-grid {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}

		.video-player-grid {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			gap: 0px 10px;
		}

		.video-player-inline {
			display: inline;
			float: left;
			width: 350px;
			margin: 1rem 1rem 1rem 0;
		}

		.video-player-inline-sm {
			width: 250px;
		}

		.video-player-inline-right {
			float: right;
			margin: 1rem 0 1rem 1rem;
		}
	}
</style>
