<script lang="ts">
	interface Props {
		playerBgColor: string;
		borderRadius: string;
		aspectRatio: number;
	}

	let { playerBgColor, borderRadius, aspectRatio }: Props = $props();
</script>

<span
	class="aspect"
	style="padding-top:{aspectRatio * 100}%; background-color:{playerBgColor}; border-radius:{borderRadius}"
></span>

<style>
	.aspect {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		overflow: hidden;
		border-radius: 8px;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		mask-image: -webkit-radial-gradient(white, black);
	}
</style>
