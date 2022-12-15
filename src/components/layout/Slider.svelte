<script>

	import { formatForDisplay } from '@lib/formatters'

	export let value = null;
	export let maxValue;
	export let isActive = false;
	export let isSecondaryColor = false;
	export let noTooltip = false;
	export let integersOnly = false;
	export let nullValue = false;
	export let showDots = true;

	let sliderElem;
	let progressPercent;
	let sliderGrabbed = false;
	let mouseXOnSliderGrab;
	let progressPercentOnSliderGrab;

	function snapProgress(percent) {
		if(!showDots) return Math.round(percent);
		if (percent <= 2) return 0;
		if (percent >= 23 && percent <= 27) return 25;
		if (percent >= 48 && percent <= 52) return 50;
		if (percent >= 73 && percent <= 77) return 75;
		if (percent >= 98) return 100;
		return Math.round(percent);
	}

	function handleClick(e) {
		if (e.srcElement?.id != 'handle') {
			const mouseX = e.layerX || e.offsetX;
			progressPercent = snapProgress(100 * mouseX / sliderElem.offsetWidth);
		}
		grabSlider(e);
	}

	function handleMouseMove(e) {
		if (!sliderGrabbed) return;
		const mouseX = e.pageX || e.screenX || e.x;
		const xDiff = mouseX - mouseXOnSliderGrab;
		let progress = progressPercentOnSliderGrab + 100 * xDiff / sliderElem.offsetWidth;
		if (progress < 0) progress = 0;
		if (progress > 100) progress = 100;
		progressPercent = snapProgress(progress);
	}

	function grabSlider(e) {
		sliderGrabbed = true;
		mouseXOnSliderGrab = e.pageX || e.screenX || e.x;
		progressPercentOnSliderGrab = progressPercent;
		isActive = true;
	}

	function releaseSlider(e) {
		sliderGrabbed = false;
	}

	function setValue() {
		if (!maxValue || progressPercent == undefined) return;
		if (progressPercent == 0) {
			if (nullValue) {
				value = null;
			} else {
				value = 1; // min leverage
			}
			return;
		}
		value = formatForDisplay(progressPercent * maxValue / 100);
		if (integersOnly) {
			value = Math.round(value);
		}
	}

	function setProgressPercent() {
		if (!maxValue) return;
		progressPercent = Math.min(100, Math.round(100 * value / maxValue));
	}

	$: setValue(progressPercent, maxValue);
	$: setProgressPercent(value, maxValue);

	function handleBlur(e) {
		for (const elem of e.path) {
			if (elem.id == 'slider') return;
		}
		isActive = false;
	}

</script>

<style>

	.slider-container {
		position: relative;
		--base-height: 8px;
		height: var(--base-height);
	}

	.slider-overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 20;
	}

	.slider {
		background-color: var(--layer100);
		height: var(--base-height);
		position: relative;
		border-radius: 12px;
		cursor: pointer;
	}

	.slider-dot-overlay {
		position: absolute;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		user-select: none;
	}

	.slider-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--layer300);
		user-select: none;
	}
	.slider-dot.active {
		background-color: #fff;
	}

	.slider-handle {
		position: absolute;
		top: 50%;
		left: 0;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: #fff;
		transform: translateX(-50%) translateY(-50%);
		z-index: 12;
		cursor: grab;
	    cursor: -moz-grab;
	    cursor: -webkit-grab;
	    user-select: none;
	}
	.slider-handle.grabbed {
		cursor: grabbing;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
	}
	.slider-handle::before {
		position: absolute;
		top: 25px;
		left: -15px;
		width: 30px;
		background-color: #000;
		border-radius: 5px;
		color: #fff;
		content: attr(data-value);
		padding: 10px;
		transition: all 0.5s ease;
		text-align: center;
		font-size: 80%;
		font-weight: 600;
		opacity: 0;
		pointer-events: none;
		transition: all 0.25s ease;
	}
	.slider-handle.grabbed::before {
		opacity: 1;
		transition: all 0.25s ease;
	}
	.slider-handle.noTooltip::before {
		display: none;
	}

	.slider-progress {
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--primary);
		height: 100%;
		z-index: 8;
		border-radius: 12px;
		user-select: none;
	}
	.slider-progress.secondary {
		background-color: var(--secondary);
	}


</style>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={releaseSlider} on:mousedown={handleBlur} />

<div class='slider-container' id='slider'>
	<div class="slider" bind:this={sliderElem} on:mousedown={handleClick}>
		{#if showDots}
		<div class='slider-dot-overlay'>
			<div class='slider-dot' class:active={true}></div>
			<div class='slider-dot' class:active={progressPercent >= 25}></div>
			<div class='slider-dot' class:active={progressPercent >= 50}></div>
			<div class='slider-dot' class:active={progressPercent >= 75}></div>
			<div class='slider-dot'></div>
		</div>
		{/if}
		<div class='slider-handle' id='handle' data-value={`${progressPercent}%`} style={`left: ${progressPercent}%`} class:grabbed={sliderGrabbed} class:noTooltip={noTooltip}></div>
		<div class='slider-progress' class:secondary={isSecondaryColor} style={`width: ${progressPercent}%`}></div>
	</div>
</div>