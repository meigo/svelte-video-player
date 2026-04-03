<script lang="ts">
	import Button from './Button.svelte';
	import VolumeIcon from './VolumeIcon.svelte';

	interface Props {
		muted: boolean;
		onpointerup?: () => void;
	}

	let { muted, onpointerup }: Props = $props();
</script>

<Button {onpointerup} aria-label={muted ? 'Unmute' : 'Mute'}>
	<VolumeIcon {muted} />
</Button>
