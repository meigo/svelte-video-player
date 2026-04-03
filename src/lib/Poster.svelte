<script lang="ts">
	interface Props {
		src: string;
	}

	let { src }: Props = $props();

	function onError(e: Event) {
		(e.currentTarget as HTMLImageElement).style.display = 'none';
	}
</script>

<img {src} class="poster" alt="Video poster" onerror={onError} />

<style>
	.poster {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
