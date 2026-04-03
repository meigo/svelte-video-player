<script lang="ts">
	import Button from './Button.svelte';
	import PipIcon from './PipIcon.svelte';

	interface Props {
		isPip: boolean;
		onpointerup?: () => void;
	}

	let { isPip, onpointerup }: Props = $props();
</script>

<Button {onpointerup} aria-label={isPip ? 'Exit picture-in-picture' : 'Enter picture-in-picture'}>
	<PipIcon {isPip} />
</Button>
