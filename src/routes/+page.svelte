<script lang="ts">
	import VideoPlayer from '$lib/VideoPlayer.svelte';

	// Sintel - Blender Open Movie (W3C hosted)
	const poster: string = 'https://media.w3.org/2010/05/sintel/poster.png';
	const source: string[] = [
		'https://media.w3.org/2010/05/sintel/trailer.mp4',
		'https://media.w3.org/2010/05/sintel/trailer.webm'
	];

	// Tears of Steel - Blender Open Movie
	const poster2: string = 'https://media.w3.org/2010/05/sintel/poster.png';
	const source2: string = 'https://media.w3.org/2010/05/video/movie_300.mp4';

	const posterKaka: string = './kaka_walk.jpg';
	const sourceKaka: string[] = ['./kaka_walk.mp4'];

	let controlsHeight = $state(60);
	let trackHeight = $state(6);
	let thumbSize = $state(15);
	let centerIconSize = $state(60);
	let color = $state('#FF3E00');
	let playerBgColor = $state('#EEEEEE');
	let barsBgColor = $state('#FFFFFF');
	let focusColor = $state('#FFFFFF');
	let iconColor = $state('#FFFFFF');
	let loop = $state(false);
	let autoplay = $state(false);
	let playsinline = $state(true);
	let borderRadius = $state(8);
	let skipSeconds = $state(10);
	let controlsOnPause = $state(true);
	let timeDisplay = $state(true);
	let remainingTime = $state(false);
	let playbackRateControl = $state(true);
</script>

<main>
	<img class="center" src="./svp_animated.svg" height="50" alt="SVP logo" />
	<h1>Demo</h1>

	<div style="min-height:20px; margin-bottom:10px;">
		<a href="https://npmjs.org/package/svelte-video-player">
			<img
				class="center"
				height="20"
				src="https://img.shields.io/npm/v/svelte-video-player?style=flat-square"
				alt="version"
			/>
		</a>
	</div>

	<p>
		I will here give a brief sketch of the progress of opinion on the Origin of Species. Until
		recently the great majority of naturalists believed that species were immutable productions, and
		had been separately created. This view has been ably maintained by many authors. Some few
		naturalists, on the other hand, have believed that species undergo modification, and that the
		existing forms of life are the descendants by true generation of pre existing forms.
	</p>

	<VideoPlayer
		width="2048"
		height="858"
		{poster}
		{source}
		controlsHeight="{controlsHeight}px"
		thumbSize="{thumbSize}px"
		trackHeight="{trackHeight}px"
		centerIconSize="{centerIconSize}px"
		borderRadius="{borderRadius}px"
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
			><span>Controls On Pause</span><input type="checkbox" bind:checked={controlsOnPause} /></label
		>
		<label><span>Time Display</span><input type="checkbox" bind:checked={timeDisplay} /></label>
		<label><span>Remaining Time</span><input type="checkbox" bind:checked={remainingTime} /></label>
		<label><span>Playback Rate</span><input type="checkbox" bind:checked={playbackRateControl} /></label>
		<label><span>Color</span><input type="color" bind:value={color} /></label>
		<label><span>Player Bg Color</span><input type="color" bind:value={playerBgColor} /></label>
		<label><span>Bars Bg Color</span><input type="color" bind:value={barsBgColor} /></label>
		<label><span>Icon Color</span><input type="color" bind:value={iconColor} /></label>
		<label><span>Focus Color</span><input type="color" bind:value={focusColor} /></label>
	</div>

	<p>
		Passing over allusions to the subject in the classical writers (Aristotle, in his "Physicae
		Auscultationes" (lib.2, cap.8, s.2), after remarking that rain does not fall in order to make
		the corn grow, any more than it falls to spoil the farmer's corn when threshed out of doors,
		applies the same argument to organisation; and adds (as translated by Mr. Clair Grece, who
		first pointed out the passage to me), "So what hinders the different parts (of the body) from
		having this merely accidental relation in nature? as the teeth, for example, grow by necessity,
		the front ones sharp, adapted for dividing, and the grinders flat, and serviceable for
		masticating the food; since they were not made for the sake of this, but it was the result of
		accident.
	</p>

	<VideoPlayer
		width="1920"
		height="804"
		poster={poster2}
		source={source2}
		{playerBgColor}
		skipSeconds="3"
	/>

	<p>
		And in like manner as to other parts in which there appears to exist an adaptation to an end.
		Wheresoever, therefore, all things together (that is all the parts of one whole) happened like
		as if they were made for the sake of something, these were preserved, having been appropriately
		constituted by an internal spontaneity; and whatsoever things were not thus constituted,
		perished and still perish.
		<span class="video-player-inline">
			<VideoPlayer
				width="540"
				height={540}
				{playerBgColor}
				poster={posterKaka}
				source={sourceKaka}
				loop
				skipSeconds="2"
			/>
		</span>
		But as his opinions fluctuated greatly at different periods, and as he does not enter on the causes
		or means of the transformation of species, I need not here enter on details. Lamarck was the first
		man whose conclusions on the subject excited much attention. This justly celebrated naturalist first
		published his views in 1801; he much enlarged them in 1809 in his "Philosophie Zoologique", and subsequently,
		1815, in the Introduction to his "Hist. Nat. des Animaux sans Vertebres".
	</p>

	<div class="video-player-grid">
		<VideoPlayer
			width="1920"
			height="1080"
			poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.jpg?width=1280"
			source="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/medium.mp4"
			playerBgColor="black"
			skipSeconds="1.5"
		/>
		<VideoPlayer
			width="1920"
			height="1080"
			source="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			skipSeconds={3}
			{playerBgColor}
		/>
	</div>

</main>

<style>
	:global(body) {
		background-color: #ffffff;
		font-family: system-ui, -apple-system, sans-serif;
		margin: 0;
	}

	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 10px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3rem;
		font-weight: 100;
		text-align: center;
		line-height: 90%;
		padding-top: 0.2rem;
		padding-bottom: 1rem;
	}

	p {
		padding: 1.5rem 0;
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
		font-size: 75%;
		background-color: rgb(245, 245, 245);
		padding-top: 1rem;
		border-radius: 5px;
	}

	.config-grid label {
		display: block;
		min-height: 35px;
		width: 9rem;
	}

	.config-grid label input {
		float: right;
	}

	input[type='range'],
	input[type='color'] {
		width: 50px;
	}

	input[type='checkbox'] {
		transform: scale(1.1);
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
		margin-bottom: 1rem;
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
	}
</style>
