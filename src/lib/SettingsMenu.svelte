<script lang="ts">
	import type { TextTrackConfig, QualityLevel } from './types.js';
	import Button from './Button.svelte';
	import SettingsIcon from './SettingsIcon.svelte';

	interface Props {
		playbackRate: number;
		playbackRates: number[];
		playbackRateControl: boolean;
		tracks: TextTrackConfig[];
		activeTrackIndex: number;
		qualityLevels: QualityLevel[];
		currentQualityLevel: number;
		isPipEnabled: boolean;
		isPip: boolean;
		onplaybackratechange?: (rate: number) => void;
		oncaptionselect?: (index: number) => void;
		onqualityselect?: (index: number) => void;
		onpiptoggle?: () => void;
	}

	let {
		playbackRate,
		playbackRates,
		playbackRateControl,
		tracks,
		activeTrackIndex,
		qualityLevels,
		currentQualityLevel,
		isPipEnabled,
		isPip,
		onplaybackratechange,
		oncaptionselect,
		onqualityselect,
		onpiptoggle
	}: Props = $props();

	let menuOpen = $state(false);
	let activeSubmenu: 'main' | 'speed' | 'captions' | 'quality' = $state('main');
	let wrapperEl: HTMLDivElement | undefined = $state();
	let panelEl: HTMLDivElement | undefined = $state();

	let hasItems = $derived(
		playbackRateControl || tracks.length > 0 || qualityLevels.length > 0 || isPipEnabled
	);

	let panelRight = $state(0);

	function updatePanelRight() {
		if (!wrapperEl) return;
		const player = wrapperEl.closest('.aspect') as HTMLElement;
		if (!player) return;
		const playerRect = player.getBoundingClientRect();
		const wrapperRect = wrapperEl.getBoundingClientRect();
		panelRight = wrapperRect.right - playerRect.right + 4;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
		activeSubmenu = 'main';
		if (menuOpen) updatePanelRight();
	}

	function closeMenu() {
		menuOpen = false;
		activeSubmenu = 'main';
	}

	function onWindowPointerDown(e: PointerEvent) {
		if (menuOpen && wrapperEl && !wrapperEl.contains(e.target as Node)) {
			closeMenu();
		}
	}

	let switchingSubmenu = false;

	function onWrapperFocusOut(e: FocusEvent) {
		if (switchingSubmenu) return;
		const wrapper = e.currentTarget as HTMLElement;
		requestAnimationFrame(() => {
			if (!wrapper.contains(document.activeElement)) {
				closeMenu();
			}
		});
	}

	function focusFirstRow() {
		switchingSubmenu = true;
		requestAnimationFrame(() => {
			panelEl?.querySelector<HTMLElement>('.menu-row')?.focus();
			switchingSubmenu = false;
		});
	}

	function switchSubmenu(submenu: 'main' | 'speed' | 'captions' | 'quality') {
		switchingSubmenu = true;
		activeSubmenu = submenu;
		requestAnimationFrame(() => {
			switchingSubmenu = false;
		});
	}

	function onKeyDown(e: KeyboardEvent) {
		if (!menuOpen) return;
		if (e.key === 'Escape') {
			closeMenu();
			return;
		}
		if (e.key === 'Enter' || e.key === ' ') {
			const target = e.target as HTMLElement;
			if (target.classList.contains('menu-row')) {
				e.preventDefault();
				e.stopPropagation();
				target.click();
				focusFirstRow();
			}
		}
	}

	function selectRate(rate: number) {
		onplaybackratechange?.(rate);
		closeMenu();
	}

	function selectCaption(index: number) {
		oncaptionselect?.(index);
		closeMenu();
	}

	function selectQuality(index: number) {
		onqualityselect?.(index);
		closeMenu();
	}

	function togglePip() {
		onpiptoggle?.();
		closeMenu();
	}

	let captionLabel = $derived(activeTrackIndex >= 0 ? tracks[activeTrackIndex]?.label : 'Off');

	let qualityLabel = $derived(
		currentQualityLevel === -1
			? 'Auto'
			: (qualityLevels[currentQualityLevel]?.label ??
					`${qualityLevels[currentQualityLevel]?.height}p`)
	);
</script>

<svelte:window onpointerdown={onWindowPointerDown} />

{#if hasItems}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="settings-wrapper"
		bind:this={wrapperEl}
		onfocusout={onWrapperFocusOut}
		onkeydown={onKeyDown}
	>
		<Button onpointerup={toggleMenu} aria-label="Settings">
			<SettingsIcon />
		</Button>

		{#if menuOpen}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="settings-panel" bind:this={panelEl} style="right:{panelRight}px;" onpointerup={(e) => e.stopPropagation()} onpointerdown={(e) => e.stopPropagation()}>
				{#if activeSubmenu === 'main'}
					{#if playbackRateControl}
						<button type="button" class="menu-row" onclick={() => switchSubmenu('speed')}>
							<span class="menu-label">Speed</span>
							<span class="menu-value">{playbackRate === 1 ? 'Normal' : `${playbackRate}×`} ›</span>
						</button>
					{/if}
					{#if tracks.length > 0}
						<button type="button" class="menu-row" onclick={() => switchSubmenu('captions')}>
							<span class="menu-label">Captions</span>
							<span class="menu-value">{captionLabel} ›</span>
						</button>
					{/if}
					{#if qualityLevels.length > 0}
						<button type="button" class="menu-row" onclick={() => switchSubmenu('quality')}>
							<span class="menu-label">Quality</span>
							<span class="menu-value">{qualityLabel} ›</span>
						</button>
					{/if}
					{#if isPipEnabled}
						<button type="button" class="menu-row" onclick={togglePip}>
							<span class="menu-label">{isPip ? 'Exit' : 'Enter'} PiP</span>
						</button>
					{/if}
				{:else if activeSubmenu === 'speed'}
					<button type="button" class="menu-row back" onclick={() => switchSubmenu('main')}>
						<span class="menu-label">‹ Speed</span>
					</button>
					{#each playbackRates as rate (rate)}
						<button
							type="button"
							class="menu-row"
							class:selected={playbackRate === rate}
							onclick={() => selectRate(rate)}>{rate === 1 ? 'Normal' : `${rate}×`}</button
						>
					{/each}
				{:else if activeSubmenu === 'captions'}
					<button type="button" class="menu-row back" onclick={() => switchSubmenu('main')}>
						<span class="menu-label">‹ Captions</span>
					</button>
					<button
						type="button"
						class="menu-row"
						class:selected={activeTrackIndex === -1}
						onclick={() => selectCaption(-1)}>Off</button
					>
					{#each tracks as track, i (track.srclang)}
						<button
							type="button"
							class="menu-row"
							class:selected={activeTrackIndex === i}
							onclick={() => selectCaption(i)}>{track.label}</button
						>
					{/each}
				{:else if activeSubmenu === 'quality'}
					<button type="button" class="menu-row back" onclick={() => switchSubmenu('main')}>
						<span class="menu-label">‹ Quality</span>
					</button>
					<button
						type="button"
						class="menu-row"
						class:selected={currentQualityLevel === -1}
						onclick={() => selectQuality(-1)}>Auto</button
					>
					{#each qualityLevels as level, i (level.height)}
						<button
							type="button"
							class="menu-row"
							class:selected={currentQualityLevel === i}
							onclick={() => selectQuality(i)}>{level.label ?? `${level.height}p`}</button
						>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.settings-wrapper {
		position: relative;
		height: 100%;
	}

	.settings-panel {
		position: absolute;
		bottom: 100%;
		margin-bottom: 4px;
		border-radius: 8px;
		overflow: hidden;
		min-width: 180px;
		max-height: 280px;
		overflow-y: auto;
		background-color: white;
		color: black;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
	}

	.menu-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 8px 14px;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		font-family: 'Cascadia Mono', monospace;
		font-size: 0.8rem;
		text-align: left;
		white-space: nowrap;
	}

	.menu-row:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}

	.menu-row:focus-visible {
		background-color: rgba(0, 0, 0, 0.1);
		outline: none;
	}

	.menu-row.selected {
		font-weight: bold;
	}

	.menu-row.back {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-weight: bold;
	}

	.menu-label {
		flex: 1;
	}

	.menu-value {
		opacity: 0.5;
		font-size: 0.75rem;
		margin-left: 12px;
	}
</style>
