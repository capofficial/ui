<script>
	import { toasts } from '@lib/stores'
	import { hideToast } from '@lib/ui'
	import { CHECKMARK_CIRCLE_INVERTED_ICON, XMARK_ICON } from '@lib/icons'
</script>

<style>

	.toast-container {
		position: fixed;
		bottom: 10px;
		left: var(--base-padding);
		z-index: 2000;
	}

	.toast {
		border-radius: var(--base-radius);
		display: flex;
		align-items: center;
		padding: var(--semi-padding);
		max-width: 260px;
		word-break: break-word;
		font-weight: 500;
		background-color: var(--primary);
		color: var(--primary-darkest);
		margin-bottom: var(--semi-padding);
		cursor: pointer;
	}

	:global(.toast svg) {
		width: 16px;
		fill: currentColor;
		margin-right: 6px;
	}

</style>

<div class='toast-container'>
{#each $toasts as toast}
	<div class={`toast success`} data-intercept="true" on:click={() => {hideToast(toast.id)}}>
		{@html CHECKMARK_CIRCLE_INVERTED_ICON} {toast.message}
	</div>
{/each}
</div>