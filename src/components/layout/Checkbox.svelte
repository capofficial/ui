
<script>
	
	import tooltip from '@lib/tooltip'

	export let label;
	export let disabled = false;
	export let value = false;
	export let isSecondaryColor = false;
	export let note = false;
	export let hasPadding = false;

	let tooltipOptions = {
		content: note
	};

</script>

<style>

	.checkbox-wrapper {
		display: flex;
		align-items: center;
		cursor: default;
	}
	.checkbox-wrapper.disabled {
		cursor: default;
	}
	.checkbox-wrapper.padded {
		padding: var(--base-padding);
	}

	.checkbox-wrapper .box {
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		margin-right: 8px;
	}

	.checkbox-wrapper .box input {
		position: absolute;
		z-index: -1;
		opacity: 0;
	}

	.checkbox-wrapper .box input:checked ~ :global(svg) {
		border: none;
		background-color: var(--primary);
		fill: var(--primary-darkest);
	}
	.checkbox-wrapper .box.secondary input:checked ~ :global(svg) {
		background-color: var(--secondary);
	}
	
	.checkbox-wrapper .box :global(svg) {
		box-sizing: border-box;
	    border: 1px solid var(--layer400);
	    border-radius: 2px;
	    max-width: 100%;
	    max-height: 100%;
	    background-color: transparent;
	    fill: transparent;
	}

	.checkbox-wrapper .box :global(svg).disabled {
		opacity: 0.5;
	}

	.checkbox-wrapper:hover .box :global(svg) {
		border-color: var(--layer500);
	}

	.label {
		text-transform: capitalize;
	}
	.label.active:not(.disabled) {
		color: var(--text0);
		font-weight: normal;
	}
	.label.hasNote {
		cursor: help;
	}

</style>

<label class='checkbox-wrapper' class:padded={hasPadding} class:disabled={disabled}>
	<div class='box' class:secondary={isSecondaryColor}>
		<input type=checkbox bind:checked={value} disabled={disabled}>
		<svg viewBox="0 0 24 24" class:disabled={disabled}><path fill-rule="evenodd" clip-rule="evenodd" d="M7.035 16.812l-.001.002 2.121 2.121.002-.002 2.121-2.12 9.19-9.192-2.12-2.121-9.191 9.19-3.536-3.534-2.121 2.12 3.535 3.536z"></path></svg>
	</div>
	<div class='label' class:disabled={disabled} class:active={value} class:hasNote={note != false} use:tooltip={tooltipOptions}>{label}</div>
</label>