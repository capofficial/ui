<script>

	import { draggable } from 'svelte-drag'

	import { INFO_ICON, XMARK_ICON } from '@lib/icons'
	import tooltip from '@lib/tooltip'
	import { hideModal } from '@lib/ui'

	export let title = '';
	export let note = false;
	export let showHeader = false;
	export let width = 420;
	export let doneButton = false;

	let tooltipOptions = {
		content: note,
		allowHTML: true,
		maxWidth: 250
	};

</script>

<style>

	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		overflow-x: hidden;
		overflow-y: auto;
		right: 0;
		bottom: 0;
		background-color: rgb(0,0,0,0.5);
		z-index: 1000;
		padding: 0 var(--base-padding);
		outline: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal {
		width: var(--modal-width);
		border-radius: var(--base-radius);
		background-color: var(--layer25);
		border: 1px solid var(--layer200);
	}

	.modal-header {
		padding: var(--base-padding);
		border-bottom: 1px solid var(--layer200);
		cursor: move;
	}

	.modal-header .top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.modal-title {
		font-weight: 600;
		font-size: 18px;
		flex: 1 1 auto;
	}

	.info {
		display: flex;
		align-items: center;
		cursor: default;
		color: var(--text0);
		margin-right: 14px;
	}
	.info :global(svg) {
		fill: currentColor;
		width: 16px;
	}

	.close {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--primary);
	}
	.close :global(svg) {
		fill: var(--text0);
		width: 14px;
	}

	.body-wrapper {
		border-bottom-left-radius: var(--base-radius);
		border-bottom-right-radius: var(--base-radius);
		overflow: hidden;
	}

	.modal-body {
		overflow-y: scroll;
		max-height: 85vh;
	}

</style>

<div class='modal-container no-scrollbar' style={`--modal-width: ${width}px`}>

	<div class='modal' use:draggable={{ handle: '.modal-header', bounds: 'parent' }} on:click|stopPropagation>

		{#if showHeader || title}
		<div class='modal-header'>
			<div class='top'>
				<div class='modal-title'>{title}</div>
				{#if note}
					<a class='info' use:tooltip={tooltipOptions}>{@html INFO_ICON}</a>
				{/if}
				<a class='close' on:click={hideModal}>
					{#if doneButton}Done{:else}{@html XMARK_ICON}{/if}
				</a>
			</div>
		</div>
		{/if}

		<div class='body-wrapper'>
			<div class='modal-body no-scrollbar'>
				<slot></slot>
			</div>
		</div>
		
	</div>

</div>