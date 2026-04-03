<script lang="ts">
	import throttle from './libs/throttle.js';
	import { formatTime } from './utils.js';

	interface Props {
		duration: number;
		currentTime: number;
		remaining?: boolean;
	}

	let { duration, currentTime, remaining = false }: Props = $props();

	let ft = $state('0:00');
	let hours = $derived(duration >= 3600);

	const setTime = throttle(
		() => {
			const t = remaining ? duration - currentTime : currentTime;
			ft = (remaining ? '-' : '') + formatTime(t, hours);
		},
		250,
		true
	);

	$effect(() => {
		if (currentTime !== undefined) setTime();
	});
</script>

<div class="time">
	<span class="text">{ft}</span>
</div>

<style>
	.time {
		position: relative;
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 6px;
	}
	.text {
		position: relative;
		font-family: 'Lucida Sans Typewriter', 'Lucida Console', monaco, 'Bitstream Vera Sans Mono',
			monospace;
		font-size: 1rem;
		line-height: 1rem;
		color: white;
	}
</style>
