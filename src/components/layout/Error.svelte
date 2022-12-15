<script>

	import { draggable } from 'svelte-drag'

	import { XMARK_ICON } from '@lib/icons'
	import { hideError } from '@lib/ui'

	export let message = '';
	export let rawError = '';
	export let width = 420;

	let showRawError = false;

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
		z-index: 1002;
		padding: 0 var(--base-padding);
		outline: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal {
		width: var(--modal-width);
		border-radius: var(--base-radius);
		background-color: var(--error-light);
		color: var(--error-dark);
	}

	.modal-header {
		padding: var(--base-padding);
		border-bottom: 1px solid var(--error-border);
		cursor: move;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.modal-title {
		font-weight: 600;
		font-size: 18px;
		flex: 1 1 auto;
	}

	.close {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--error-dark);
	}
	.close :global(svg) {
		fill: currentColor;
		width: 14px;
	}

	.modal-body {
	}

	.message {
		padding: var(--base-padding);
		line-height: 1.4;
	}

	textarea {
		font-family: courier, courier new, monospace;
		width: 100%;
		box-sizing: border-box;
		outline: none;
		resize: none;
		background-color: rgba(255,255,255,0.45);
		border-radius: var(--base-radius);
		color: inherit;
		padding: 10px;
		margin: 0;
		margin-top: 5px;
		border: 1px solid var(--error-border);
	}

	.show-details {
		font-size: 85%;
	}
	
	.contact {
		border-top: 1px solid var(--error-border);
		font-size: 75%;
		padding: var(--base-padding);
	}

	a {
		color: inherit;
		cursor: pointer;
		text-decoration: underline;
	}


</style>

<div class='modal-container' style={`--modal-width: ${width}px`}>

	<div class='modal' use:draggable={{ handle: '.modal-header', bounds: 'parent' }} on:click|stopPropagation>

		<div class='modal-header'>
			<div class='modal-title'>An error has occurred</div>
			<a class='close' on:click|stopPropagation={hideError}>
				{@html XMARK_ICON}
			</a>
		</div>

		<div class='modal-body'>
			<div class='message'>
				{message}<br />
				{#if rawError}<a class='show-details' on:click={() => {showRawError = !showRawError}}>{#if showRawError}Hide{:else}Show{/if} details</a>{/if}
				{#if rawError && showRawError}
					<textarea onclick="this.focus();this.select()" rows='4' readonly="true">{rawError}</textarea>
				{/if}
			</div>
			<div class='contact'>
				If this error keeps happening, <a href='https://discord.gg/zkdr8vnujz' target='_blank'>reach out on Discord</a>.
			</div>

		</div>

	</div>

</div>