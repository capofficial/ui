<script>
	
	import Modal from './Modal.svelte'
	import LabelValue from '@components/layout/LabelValue.svelte'
	import Checkbox from '@components/layout/Checkbox.svelte'

	import { showOrdersOnChart, showPositionsOnChart } from '@lib/stores'
	import { showToast } from '@lib/ui'
	import { saveUserSetting } from '@lib/utils'

	function resetUserSettings() {
		localStorage.setItem('userSettings', JSON.stringify({}));
		showToast('Settings reset.');
	}

	function saveSettings(soc, spc) {
		saveUserSetting('showOrdersOnChart', soc);
		saveUserSetting('showPositionsOnChart', spc);
	}

	$: saveSettings($showOrdersOnChart, $showPositionsOnChart);

</script>

<style>
	.row {
		border-bottom: 1px solid var(--layer2);
	}
</style>

<Modal title='Account Settings' width={300}>
	
	<div class='row'>
		<Checkbox hasPadding={true} label='Orders on chart' bind:value={$showOrdersOnChart} />
	</div>
	<div class='row'>
		<Checkbox hasPadding={true} label='Positions on chart' bind:value={$showPositionsOnChart} />
	</div>
	<LabelValue 
		label='Reset Preferences' 
		value='Reset'
		on:click={resetUserSettings}
		isClickable={true}
		hasPadding={true}
		fullOpacityLabel={true}
	/>
</Modal>
