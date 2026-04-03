<script lang="ts">
	import Button from './Button.svelte';
	import PlayPauseIcon from './PlayPauseIcon.svelte';

	interface Props {
		paused: boolean;
		onpointerup?: () => void;
	}

	let { paused, onpointerup }: Props = $props();
</script>

<Button {onpointerup} aria-label={paused ? 'Play' : 'Pause'}>
	<PlayPauseIcon {paused} />
</Button>
