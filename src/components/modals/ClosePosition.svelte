<script>
	/* TODO
	- should have an input for Size to close a position
	- closing a position submits a reduce only order in the opposite direction, similar to the current private beta
	- it should allow closing at a price, e.g. TP (limit order) or SL (stop order)
	- should show details like margin and fee, as well as expected P/L
	*/
	import { onMount } from 'svelte'
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
	import LabelValue from '@components/layout/LabelValue.svelte'

	import { formatPnl, formatUnits, formatForDisplay } from '@lib/formatters'
	import { focusInput, hideModal } from '@lib/ui'
	import { BPS_DIVIDER } from '@lib/config'

	import { markets } from '@lib/stores'
	import { get } from 'svelte/store'

	import { closePosition } from '@api/orders'

	export let data;

	let amount, isSubmitting, sizeToClosePercent = 0;
	let _tpPrice = 0
	let _slPrice = 0
	let invalidTP = true
	let invalidSL = true

	let _markets = get(markets)
	let stopType = 'market'

/*	async function submit() {
		if (!amount) return focusInput('Size to Close');
		isSubmitting = true;
		const success = await submitCloseOrder({
			market: data.market,
			asset: data.assetAddress,
			isLong: !data.isLong,
			size: amount
		});
		isSubmitting = false;
	}

	*/

	function setSizeToClosePercent(_amount) {
		if (!data.size) return;
		sizeToClosePercent = 100 * _amount / formatUnits(data.size, 6);
		if (sizeToClosePercent > 100) sizeToClosePercent = 100;
		console.log("data", data)
	}

	$: setSizeToClosePercent(amount);

	let estimatedPnl = 0;
	async function calculatePnl(_amount) {
		if (!_amount) {
			estimatedPnl = 0;
			return;
		}
		estimatedPnl = formatUnits(data.upl, 6) * (sizeToClosePercent / 100)
	} 

	$: calculatePnl(amount);

	let feePercent = 0
	let totalFee = 0
	function calculateFee() {
		console.log("calculating fees", _markets)
		feePercent = _markets[data.market].fee / BPS_DIVIDER
		console.log("calculating total fee", data.margin, sizeToClosePercent, feePercent)
		totalFee = ((formatUnits(data.margin, 6)) * (sizeToClosePercent / 100)) * feePercent  
	}

	$: calculateFee(amount);

	let remainingMargin = 0;
	function calculateRemainingMargin() {
		remainingMargin = (formatUnits(data.margin, 6)) - ((formatUnits(data.margin, 6)) * (sizeToClosePercent / 100)) - totalFee
	}

	$: calculateRemainingMargin(amount);

	async function submitClosePosition() {
		isSubmitting = true;

		let _orderType // 0 = market, 1 = limit, 2 = stop
		let _price

		if (stopType == 'market')
		{
			_orderType = 0
			_price = 0
		}
		else if (stopType == 'takeProfit')
		{
			_price = _tpPrice
			data.isLong ? _orderType = 1 : _orderType = 2
		}
		else if (stopType == 'stopLoss')
		{
			_price = _slPrice
			data.isLong ? _orderType = 2 : _orderType = 1
		}

		let params = {
			market: data.market,
			size: amount * 10**6,
			isLong: data.isLong,
			orderType: _orderType,
			price: _price
		}

		const success = await closePosition(params);
		isSubmitting = false;
	}

	function validateTPSL() {
		let currentPrice = _markets[data.market].price
		
		if (data.isLong)
		{
			if (_tpPrice <= currentPrice)
			{
				invalidTP = true
			}
			else
			{
				invalidTP = false
			}

			if (_slPrice >= currentPrice)
			{
				invalidSL = true
			}
			else
			{
				invalidSL = false
			}
		}
		else
		{
			if (_tpPrice >= currentPrice)
			{
				invalidTP = true
			}
			else
			{
				invalidTP = false
			}

			if (_slPrice <= currentPrice)
			{
				invalidSL = true
			}
			else
			{
				invalidSL = false
			}
		}
	}

	$: validateTPSL(_tpPrice, _slPrice)

	onMount(() => {
		focusInput('Size to Close');
	});

	/*		market: data.market,
			asset: data.assetAddress,
			isLong: !data.isLong,
			size: amount */

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

    .warning {
		line-height: 1.458;
		color: var(--secondary);
		font-size: 72%;
	}

	.bottom-spacing {
		margin-bottom: 16px;
	}

	.stop-type {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.stop-button {
		background-color: black;
		padding: 10px 10px 10px 10px;
		border-radius: var(--base-radius);
		font-weight: 500;
		color: white;
		background-color: var(--layer200);
		cursor: pointer;
		user-select: none;
	}

	.stop-button:hover:not(:active) {
		background-color: var(--layer300);
	}

	.selected {
		background-color: var(--layer400);
	}


</style>

<Modal title='Close Position' width={340}>
	
	<div class='container'>

		<form on:submit|preventDefault={submitClosePosition}>

			<div class='group'>
				<Input label='Size to Close' bind:value={amount} />
			</div>

			<div class='row'>
				<LabelValue label='Max' value={`${formatUnits(data.size, 6)}`} on:click={() => amount = formatUnits(data.size, 6)} isClickable={true} />
			</div>

			<div class='row'>
				<LabelValue label='P/L (approx)' value={estimatedPnl}/>
			</div>

			<div class='row'>
				<LabelValue label='Size to Close (%)' value={sizeToClosePercent}/>
			</div>

			
			<div class='row'>
				<LabelValue label='Remaining Margin' value={remainingMargin}/>
			</div>

			<div class='row bottom-spacing'>
				<LabelValue label='Fee' value={totalFee}/>
			</div>

			<div class='stop-type bottom-spacing'>
				<div class='stop-button' class:selected={stopType === 'takeProfit'} on:click={() => {stopType = 'takeProfit'}}>Take-Profit</div>
				<div class='stop-button' class:selected={stopType === 'market'} on:click={() => {stopType = 'market'}}>Market</div>
				<div class='stop-button' class:selected={stopType === 'stopLoss'} on:click={() => {stopType = 'stopLoss'}}>Stop-Loss</div>
			</div>

			{#if stopType == 'takeProfit'}
			<div class='group'>
				<Input label='Take Profit' bind:value={_tpPrice} />
				{#if invalidTP && data.isLong}
					<div class='warning'>Take-Profit level must be <strong>higher</strong> than the current price.</div>
				{:else if invalidTP && !data.isLong}
					<div class='warning'>Take-Profit level must be <strong>lower</strong> than the current price.</div>
				{/if}				
			</div>
			{/if}

			{#if stopType == 'stopLoss'}
			<div class='group'>
				<Input label='Stop Loss' bind:value={_slPrice} />
				{#if invalidSL && data.isLong}
					<div class='warning'>Stop-Loss level must be <strong>lower</strong> than the current price.</div>
				{:else if invalidSL && !data.isLong}
					<div class='warning'>Stop-Loss level must be <strong>higher</strong> than the current price.</div>
				{/if}
			</div>
			{/if}

			<div class="button">
				{#if stopType === 'market'}
				<Button isSmall={true} isLoading={isSubmitting} label={`Submit Close Order`} />
				{:else if stopType === 'takeProfit'}
				<Button isSmall={true} isLoading={isSubmitting} label={`Submit Take-Profit`} />
				{:else if stopType === 'stopLoss'}
				<Button isSmall={true} isLoading={isSubmitting} label={`Submit Stop-Loss`} />
				{/if}
			</div>

		</form>

	</div>

</Modal>