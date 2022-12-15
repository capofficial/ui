<script>
	
	import Modal from './Modal.svelte'

	import DataList from '@components/layout/DataList.svelte'

	import { formatMarket } from '@lib/formatters'

	export let data; // market info

	let market = formatMarket(data);

	let dataList = [];
	for (const key in market) {
		dataList.push({
			label: key,
			value: market[key]
		});
	}

</script>

<style>
</style>

<Modal title='Market Details'>
	<DataList data={dataList} />
</Modal>
