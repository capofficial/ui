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

	import {formatForDisplay, formatPositionNew } from '@lib/formatters'
	import { focusInput, hideModal } from '@lib/ui'
	import { BPS_DIVIDER } from '@lib/config'

	import { markets, currencyName } from '@lib/stores'
	import { get } from 'svelte/store'
	import { getUPL } from '@lib/utils'

	import { closePosition } from '@api/orders'

	export let data;

	let amount, isSubmitting, sizeToClosePercent = 0;
	let _tpPrice = 0
	let _slPrice = 0
	let tpGainPercent = 0
	let slLossPercent = 0
	let invalidTP = true
	let invalidSL = true
	let percentageInput = false

	let _markets = get(markets)
	let stopType = 'market'


	let _position = formatPositionNew(data)
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
		sizeToClosePercent = 100 * _amount / _position.size;
		if (sizeToClosePercent > 100) sizeToClosePercent = 100;
	}

	$: setSizeToClosePercent(amount);

	let estimatedPnl = 0;
	async function calculatePnl(_amount) {
		if (!_amount) {
			estimatedPnl = 0;
			return;
		}

		if (stopType === 'market')
		{
			estimatedPnl = _position.upl * (sizeToClosePercent / 100)
		}
		else if (stopType === 'takeProfit')
		{

			let tpPosition = {
				isLong: _position.isLong,
				size: amount,
				price: _position.price,
			}

			let _upl = getUPL(tpPosition, _tpPrice)
			estimatedPnl = _upl
		}
		else if (stopType === 'stopLoss')
		{
			let slPosition = {
				isLong: data.isLong,
				size: amount,
				price: _position.price
			}

			let _upl = getUPL(slPosition, _slPrice)
			estimatedPnl = _upl
		}
	} 

	$: calculatePnl(amount, _tpPrice, _slPrice, stopType);

	let feePercent = 0
	let totalFee = 0
	function calculateFee() {
		feePercent = _markets[_position.market].fee / BPS_DIVIDER
		totalFee = (_position.margin * sizeToClosePercent) * feePercent  
	}

	$: calculateFee(amount, stopType);

	let remainingMargin = 0;
	function calculateRemainingMargin() {
		remainingMargin = _position.margin - (_position.margin * (sizeToClosePercent / 100))
	}

	$: calculateRemainingMargin(amount, stopType);

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
			market: _position.market,
			size: amount * 10**6,
			isLong: _position.isLong,
			orderType: _orderType,
			price: _price
		}

		const success = await closePosition(params);
		isSubmitting = false;
		if (success) hideModal();
	}

	function validateTPSL() {
		let currentPrice = _markets[_position.market].price
		
		if (_position.isLong)
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

	$: validateTPSL(_tpPrice, _slPrice, stopType)

	function calculateTPSLPercentage() {

		if (percentageInput == false)
		{
			if (stopType === 'stopLoss')
			{
				slLossPercent = ((estimatedPnl / _position.margin) * 100).toFixed(2) * -1
			}
			else if (stopType === 'takeProfit')
			{
				tpGainPercent = ((estimatedPnl / _position.margin) * 100).toFixed(2)
			}
		}
	}

	$: calculateTPSLPercentage(_tpPrice, _slPrice, amount)

	function getTPSLFromGainLoss() {

		if (percentageInput)
		{
			let estimatedTakeProfit
			let estimatedStopLoss

			if (_position.isLong)
			{
				if (stopType === 'takeProfit')
				{
					estimatedTakeProfit = Number(_position.price) + ( Number(_position.price) * ((tpGainPercent / 100) / (amount / _position.margin)))
					_tpPrice = formatForDisplay(estimatedTakeProfit)
				}
				else if (stopType === 'stopLoss')
				{
					estimatedStopLoss = Number(_position.price) - ( Number(_position.price) * ((slLossPercent / 100) / (amount / _position.margin)))
					_slPrice = formatForDisplay(estimatedStopLoss)
				}
			}
			else
			{
				if (stopType === 'takeProfit')
				{
					estimatedTakeProfit = Number(_position.price) - ( Number(_position.price) * ((tpGainPercent / 100) / (amount / _position.margin)))
					_tpPrice = formatForDisplay(estimatedTakeProfit)
				}
				else if (stopType === 'stopLoss')
				{
					estimatedStopLoss = Number(_position.price) + ( Number(_position.price) * ((slLossPercent / 100) / (amount / _position.margin)))
					_slPrice = formatForDisplay(estimatedStopLoss)
				}
			}

			calculatePnl(amount)
			validateTPSL()
		}
	}

	$: getTPSLFromGainLoss(tpGainPercent, slLossPercent, amount)

	function onFocus() { percentageInput = true; }
	function onBlur() { percentageInput = false; }

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

	.group-tpsl {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	.tpsl-percentage {
		width: 250px;
		position: relative;
		font-size: 85%;
	}

	input {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		text-align: right;
		padding-right: 28px;
		border-radius: 6px;
		background-color: var(--layer50);
		border: 1px solid var(--layer200);
		caret-color: var(--primary);
		font-size: inherit;
		font-weight: 600;
		/*transition: padding 200ms ease-in-out;*/
	}
	input:hover {
		border-color: var(--layer300);
	}
	input:focus {
		border-color: var(--primary);
	}
	input:disabled {
		color: var(--text200);
	}	

	input::placeholder {
	  color: var(--text500);
	  opacity: 1;
	}
	input::-ms-input-placeholder{
	  color: var(--text500);
	}
	input:-ms-input-placeholder {
	  color: var(--text500);
	}

    .prefix {
		position: absolute;
		background-color: var(--layer50);
		padding-left: 14px;
		padding-right: 14px;
		margin-left: 1px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		white-space: nowrap;
		left: 0px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 500;
	}

    .suffix {
		position: absolute;
		background-color: var(--layer50);
		padding-left: 2px;
		padding-right: 14px;
		margin-right: 1px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		white-space: nowrap;
		right: 0px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 500;
	}


</style>

<Modal title='Close Position' width={380}>
	
	<div class='container'>

		<form on:submit|preventDefault={submitClosePosition}>

			<div class='group'>
				<Input label='Size to Close' bind:value={amount} />
			</div>

			<div class='row'>
				<LabelValue label='Max' value={`${_position.size} ${$currencyName}`} on:click={() => amount = _position.size} isClickable={true} />
			</div>

			<div class='row'>
				<LabelValue label='P/L (approx)' value={`${formatForDisplay(estimatedPnl)} ${$currencyName}`}/>
			</div>

			<div class='row'>
				<LabelValue label='Size to Close (%)' value={`${formatForDisplay(sizeToClosePercent)}%`}/>
			</div>

			
			<div class='row'>
				<LabelValue label='Remaining Margin' value={`${formatForDisplay(remainingMargin)} ${$currencyName}`}/>
			</div>

			<div class='row bottom-spacing'>
				<LabelValue label='Fee' value={`${formatForDisplay(totalFee)} ${$currencyName}`}/>
			</div>

			<div class='stop-type bottom-spacing'>
				<div class='stop-button' class:selected={stopType === 'takeProfit'} on:click={() => {stopType = 'takeProfit'}}>Take-Profit</div>
				<div class='stop-button' class:selected={stopType === 'market'} on:click={() => {stopType = 'market'}}>Market</div>
				<div class='stop-button' class:selected={stopType === 'stopLoss'} on:click={() => {stopType = 'stopLoss'}}>Stop-Loss</div>
			</div>

			{#if stopType == 'takeProfit'}
			<div class='group'>
				<div class='group-tpsl'>
					<Input label='Take Profit' bind:value={_tpPrice} />
					<div class='tpsl-percentage'>
						<label for='Gain' class='prefix'>
							Gain
						</label>
						<input id='Gain'  type='number' step="0.0000001" bind:value={tpGainPercent} min="0" max="10000000" maxlength="10" spellcheck="false" placeholder={`0.0`} autocomplete="off" autocorrect="off" inputmode="decimal" lang="en" on:focus={onFocus} on:blur={onBlur} >
						<label for='Gain' class='suffix'>
							%
						</label>
					</div>
				</div>
				{#if invalidTP && data.isLong}
					<div class='warning'>Take-Profit level must be <strong>higher</strong> than the current price.</div>
				{:else if invalidTP && !data.isLong}
					<div class='warning'>Take-Profit level must be <strong>lower</strong> than the current price.</div>
				{/if}				
			</div>
			{/if}

			{#if stopType == 'stopLoss'}
			<div class='group'>
				<div class='group-tpsl'>
					<Input label='Stop Loss' bind:value={_slPrice} />
					<div class='tpsl-percentage'>
						<label for='Loss' class='prefix'>
							Loss
						</label>
						<input id='Loss'  type='number' step="0.0000001" bind:value={slLossPercent} min="0" max="10000000" maxlength="10" spellcheck="false" placeholder={`0.0`} autocomplete="off" autocorrect="off" inputmode="decimal" lang="en" on:focus={onFocus} on:blur={onBlur} >
						<label for='Loss' class='suffix'>
							%
						</label>
					</div>
				</div>
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