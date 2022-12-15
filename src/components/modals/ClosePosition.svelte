<script>
	
	import { onMount } from 'svelte'
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
	import LabelValue from '@components/layout/LabelValue.svelte'

</script>

<style>

	.row {
		display: flex;
		align-items: center;
		height: 26px;
		justify-content: space-between;
	}

	.button {
		margin-top: 20px;
	}
</style>

<Modal title='Close Position' width={340}>
	
	<div class='container'>

		<!-- <form on:submit|preventDefault={submit}>

			<div class='group'>
				<Input label='Size to Close' asset={data.asset} bind:value={amount} />
			</div>

			<div class='row'>
				<LabelValue label='Max' value={`${formatForDisplay(data.size)} ${data.asset}`} on:click={() => amount = data.size} isClickable={true} />
			</div>

			<div class='row'>
				<LabelValue label='P/L (approx)' value={`${pnl ? `${formatPnl(pnl)} ${data.asset}` : '-'}`} />
			</div>

			<div class='row'>
				<LabelValue label='Size to Close (%)' value={`${formatForDisplay(sizeToClosePercent)}%`} />
			</div>

			<OrderDetails market={data.market} asset={data.asset} size={amount} isClose={true} clickableFee={false} />

			<div class="button">
				{#if data.asset != 'ETH' && $allowances[data.asset]?.['FundStore'] * 1 == 0}
				<Button noSubmit={true} isLoading={isApproving} label={`Approve ${data.asset}`} on:click={_approveAsset} />
				{:else}
				<Button isSmall={true} isLoading={isSubmitting} label={`Submit Close Order`} />
				{/if}
			</div>

		</form> -->

	</div>

</Modal>
