<script lang="ts">
	import { getPlayerConfig } from './context.js';
	import Thumb from './Thumb.svelte';
	import Bar from './Bar.svelte';

	interface Props {
		width?: string;
		marginX?: string;
		value?: number;
		'aria-label'?: string;
	}

	let {
		width = '150px',
		marginX = '10px',
		value = $bindable(0.5),
		'aria-label': ariaLabel = 'Volume'
	}: Props = $props();

	let sliderElement: HTMLDivElement;
	let isPointerDown = $state(false);
	let rect: DOMRect;

	const cfg = getPlayerConfig();

	function onPointerDown(e: PointerEvent) {
		e.preventDefault();
		isPointerDown = true;
		rect = sliderElement.getBoundingClientRect();
		pointerXToValue(e.clientX);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isPointerDown) return;
		pointerXToValue(e.clientX);
	}

	function onPointerUp() {
		if (!isPointerDown) return;
		isPointerDown = false;
	}

	function onKeydown(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'ArrowDown':
				keydownAddToValue(e, -0.1);
				break;
			case 'ArrowRight':
			case 'ArrowUp':
				keydownAddToValue(e, 0.1);
				break;
		}
	}

	function keydownAddToValue(e: KeyboardEvent, v: number) {
		e.preventDefault();
		e.stopPropagation();
		value = Math.min(Math.max(value + v, 0), 1);
	}

	function pointerXToValue(clientX: number) {
		value = Math.min(Math.max(clientX - rect.x, 0), rect.width) / rect.width;
	}
</script>

<svelte:window onpointermove={onPointerMove} onpointerup={onPointerUp} />

<div
	class="slider"
	style="max-width:{width}; margin:0 {marginX};"
	tabindex="0"
	role="slider"
	aria-label={ariaLabel}
	aria-valuemin={0}
	aria-valuemax={1}
	aria-valuenow={Math.round(value * 100) / 100}
	aria-valuetext="{Math.round(value * 100)}%"
	bind:this={sliderElement}
	onpointerdown={onPointerDown}
	onkeydown={onKeydown}
>
	<div class="bars" style="height:{cfg.trackHeight}; outline-color:{cfg.focusColor};">
		<Bar color={cfg.barsBgColor} opacity={1} value={1} />
		<Bar color={cfg.color} opacity={1} {value} />
	</div>
	<Thumb positionValue={value} active={isPointerDown} />
</div>

<style>
	.slider {
		position: relative;
		flex-grow: 1;
		min-width: 25px;
		height: 100%;
		outline: none;
	}

	.slider:focus-visible .bars {
		outline-style: dotted;
	}

	.bars {
		position: relative;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		outline-offset: 3px;
		outline-width: 2px;
		outline-style: none;
		border-radius: 9999px;
		overflow: hidden;
	}
</style>
