<script>

	import { onMount, onDestroy } from 'svelte'

	import { accountHeight } from '@lib/stores'
	import { saveUserSetting } from '@lib/utils'

	let isResizing = false;
	let start;

	let startingAccountHeight;

	// TODO: update these on window resize
	const maxAccountHeight = window.innerHeight * 0.60;
	const minAccountHeight = window.innerHeight * 0.10;

	function startResize(event) {
		isResizing = true;
		start = event.pageY;
		startingAccountHeight = $accountHeight;
	}

	function stopResize() {
		isResizing = false;
	}

	function resize(event) {
		if (!isResizing) return;
		const delta = start - event.pageY;
		const newHeight = startingAccountHeight + delta;
		if (newHeight > maxAccountHeight || newHeight < minAccountHeight) return;
		accountHeight.update((ch) => newHeight);
		saveUserSetting('accountHeight', newHeight);
	}

</script>

<style>
	.handle {
		cursor: row-resize;
		user-select: none;
		height: 6px;
		box-sizing: border-box;
	}
	.inner {
		background-color: var(--layer100);
		height: 1px;
	}
	.handle:hover .inner {
		background-color: var(--layer200);
	}
</style>

<svelte:window on:mousemove={resize} on:mouseup={stopResize} />

<div class='handle' on:mousedown={startResize}>
	<div class='inner'></div>
</div>