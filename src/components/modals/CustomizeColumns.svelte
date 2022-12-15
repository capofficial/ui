<script>
	
	import Modal from './Modal.svelte'
	import Checkbox from '@components/layout/Checkbox.svelte'

	import { ordersColumnsToShow, positionsColumnsToShow, historyColumnsToShow } from '@lib/stores'
	import { getLabelForKey } from '@lib/formatters'

	export let data;

	let isColumnShown = {};

	let columnsShown;
	if (data.panel == 'orders') {
		for (const key of $ordersColumnsToShow) {
			isColumnShown[key] = true;
		}
	}
	if (data.panel == 'positions') {
		for (const key of $positionsColumnsToShow) {
			isColumnShown[key] = true;
		}
	}
	if (data.panel == 'history') {
		for (const key of $historyColumnsToShow) {
			isColumnShown[key] = true;
		}
	}

	function trackColumnShownChange(isColumnShown) {
		// set store
		let columnsToShow = [];
		for (const col of data.allColumns) {
			if (isColumnShown[col.key]) columnsToShow.push(col.key);
		}
		if (data.panel == 'orders') {
			ordersColumnsToShow.set(columnsToShow);
		}
		if (data.panel == 'positions') {
			positionsColumnsToShow.set(columnsToShow);
		}
		if (data.panel == 'history') {
			historyColumnsToShow.set(columnsToShow);
		}
	}

	$: trackColumnShownChange(isColumnShown);

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

<Modal title='Columns To Show' width={240}>
	
	<div class='container'>
		{#each data.allColumns as col}
			<div class='row'>
				<Checkbox label={getLabelForKey(col.key)} bind:value={isColumnShown[col.key]} disabled={col.permanent} />
			</div>
		{/each}
	</div>

</Modal>
