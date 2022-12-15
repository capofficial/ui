<script>

	import { LOADING_ICON } from '@lib/icons'

	export let isRed = false;
	export let isLoading = false;
	export let label;
	export let isSmall = false;
	export let noSubmit = false;

</script>

<style>

	button {
		padding: 0 var(--base-padding);
		height: 42px;
		border-radius: var(--base-radius);
		font-weight: 600;
		color: var(--primary-darkest);
		background-color: var(--primary);
		white-space: nowrap;
		font-size: 95%;
	}
	button:hover:not(:active) {
		background-color: var(--primary-hover);
	}
	button:active {
		background-color: var(--primary-active);
	}
	button.red:hover:not(:active) {
		background-color: var(--secondary-hover);
	}
	button.red:active {
		background-color: var(--secondary-active);
	}

	button.small {
		height: 38px;
		padding: 0 16px;
		font-weight: 500;
	}

	button.red {
		color: var(--secondary-darkest);
		background-color: var(--secondary);
	}

	button.loading {
		pointer-events: none;
		cursor: default;
	}

	.loading-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-icon :global(svg) {
		fill: currentColor;
		width: 22px;
	}

</style>

<button type={noSubmit ? 'button' : 'submit'} class:small={isSmall} class:loading={isLoading} class:red={isRed} on:click|stopPropagation>
	{#if isLoading}
		<span class='loading-icon'>{@html LOADING_ICON}</span>
	{:else}
		{label}
	{/if}
</button>