<script lang="ts">
	import Button from './Button.svelte';
	import CaptionIcon from './CaptionIcon.svelte';

	interface Props {
		active: boolean;
		ontoggle?: () => void;
	}

	let { active, ontoggle }: Props = $props();
</script>

<Button onpointerup={ontoggle} aria-label={active ? 'Disable captions' : 'Enable captions'}>
	<CaptionIcon {active} />
</Button>
