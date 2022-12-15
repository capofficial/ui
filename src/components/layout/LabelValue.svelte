<script>

	import tooltip from '@lib/tooltip'
	import { formatForDisplay } from '@lib/formatters'
	import { PENCIL_ICON, RULER_ICON, RULER_FILLED_ICON } from '@lib/icons'

	export let label;
	export let value;
	export let formatValue = false;
	export let note = false;
	export let isClickable = false;
	export let noPadding = false;
	export let isSecondaryColor = false;
	export let hasPadding = false;
	export let hasSemiPadding = false;
	export let fullOpacityLabel = false;
	
	let tooltipOptions = {
		content: note,
		allowHTML: true
	};

</script>

<style>

	.flex-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--text0);
		flex: 1 1 auto;
		font-size: 90%;
	}
	.flex-row.padded {
		padding: var(--base-padding);
	}
	.flex-row.semipadded {
		padding: var(--semi-padding) 0;
	}

	.flex-row.noPadding {
		padding-bottom: 0 !important;
	}

	.label {
		cursor: default;
		text-transform: capitalize;
		color: var(--text400);
	}
	.label.hasNote {
		cursor: help;
	}
	.label.fullOpacity {
		color: var(--text0);
	}

	.value {

	}

	.clickable {
		cursor: pointer;
		color: var(--primary);
	}
	.clickable.secondary {
		color: var(--secondary);
	}

	

</style>

<div class='flex-row' class:padded={hasPadding} class:semipadded={hasSemiPadding} class:noPadding={noPadding}>
	<div class='label' class:fullOpacity={fullOpacityLabel} class:hasNote={note != false} use:tooltip={tooltipOptions}>{label}</div>
	<div class='value' on:click|stopPropagation class:clickable={isClickable} class:secondary={isSecondaryColor}>
		{#if formatValue} 
			{formatForDisplay(value)}
		{:else}
			{@html value}
		{/if}
	</div>
</div>