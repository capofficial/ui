<script>
	
	import Modal from './Modal.svelte'
	import Checkbox from '@components/layout/Checkbox.svelte'

	import { getUserHistory } from '@api/history'
	import { historyOrderStatusToShow } from '@lib/stores'
	import { saveUserSetting } from '@lib/utils'

	let isShown = {};

	for (const key of $historyOrderStatusToShow) {
		isShown[key] = true;
	}

	function trackShownChange(_isShown) {
		// set store
		let toShow = [];
		for (const col of ['cancelled', 'executed', 'liquidated']) {
			if (_isShown[col]) toShow.push(col);
		}

		if (toShow.every((val, index) => val === $historyOrderStatusToShow[index])) {
			return;
		}

		historyOrderStatusToShow.set(toShow);
		saveUserSetting('historyOrderStatusToShow', toShow);
		getUserHistory({});
	}

	$: trackShownChange(isShown);

</script>

<style>
	.row {
		padding: 5px 0;
	}
	.row:first-child {
		padding-top: 0;
	}
	.row:last-child {
		padding-bottom: 0;
	}
</style>

<Modal title='Orders To Show' width={240}>
	
	<div class='container'>
		<div class='row'>
			<Checkbox label='Cancelled' bind:value={isShown['cancelled']} />
		</div>
		<div class='row'>
			<Checkbox label='Executed' bind:value={isShown['executed']} />
		</div>
		<div class='row'>
			<Checkbox label='Liquidated' bind:value={isShown['liquidated']} />
		</div>
	</div>

</Modal>
