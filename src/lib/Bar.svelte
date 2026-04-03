<script lang="ts">
	interface Props {
		color?: string;
		opacity?: number;
		value?: number;
	}

	let { color = 'white', opacity = 1, value = 0 }: Props = $props();
</script>

<div
	class="bar"
	style="background-color:{color}; border-color:{color}; opacity:{opacity}; transform: scaleX({value});"
></div>

<style>
	.bar {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		transform-origin: 0 0;
		border-style: solid;
		border-width: 1px;
	}
</style>
