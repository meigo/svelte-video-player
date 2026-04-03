<script lang="ts">
	import Button from './Button.svelte';
	import FullscreenIcon from './FullscreenIcon.svelte';

	interface Props {
		isFullscreen: boolean;
		onpointerup?: () => void;
	}

	let { isFullscreen, onpointerup }: Props = $props();
</script>

<Button {onpointerup} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
	<FullscreenIcon {isFullscreen} />
</Button>
