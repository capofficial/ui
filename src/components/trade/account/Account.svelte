<script>
	import { onDestroy } from 'svelte';

	import { formatForDisplay } from '@lib/formatters'
	import { address, balance, upl, equity, lockedMargin, freeMargin, marginLevel } from '@lib/stores'

	import tooltip from '@lib/tooltip'

	import { showModal } from '@lib/ui'
	import { getUserBalance, getUserLockedMargin, getUserUpl } from '@api/account'

	let dataTimeout;
	function fetchData() {
		if (!$address) return;
		getUserBalance();
		getUserLockedMargin();
		getUserUpl();
		dataTimeout = setTimeout(fetchData, 10 * 1000);
	}

	$: fetchData($address);

	onDestroy(() => {
		clearTimeout(dataTimeout);
	});

</script>

<style>
	.header {
		height: 60px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		border-bottom: 1px solid var(--layerDark);
		font-weight: 600;
	}
	.data {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		padding: 20px;
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.label, .value {
		font-size: 14px;
	}
	button {
		flex: 50%;
		padding: 10px 5px;
		width: 75%;
	}
	.buttons {
		display: flex;
    	justify-content: space-around;
		align-items: center;
		margin: 0 20px;
		column-gap: 10px;
	}
	.gray {
		background-color: var(--layer200);
		color: white;
	}
	.gray:hover {
		background-color: var(--layer300);
	}
	@media screen and (max-width: 900px) {
		.buttons {
			flex-direction: column;
			margin: 0;
		}
		button {
			flex: 50%;
			margin: 5px 10px;
			padding: 10px 5px;
			width: 90%;
		}
	}
</style>

<div class="account">
	<div class="header">Account</div>
	<div class="data">
		<div class="row">
			<div class="label" use:tooltip={{content: 'Equals Deposits - Withdrawals + Profits or Losses.'}}>Balance</div>
			<div class="value">${formatForDisplay($balance)}</div>
		</div>
		<div class="row">
			<div class="label" use:tooltip={{content: 'Unrealized profit / loss incurred by open positions.'}}>UP/L</div>
			<div class="value">${formatForDisplay($upl)}</div>
		</div>
		<div class="row">
			<div class="label" use:tooltip={{content: 'Equals Balance + UP/L.'}}>Equity</div>
			<div class="value">${formatForDisplay($equity)}</div>
		</div>
		<div class="row">
			<div class="label" use:tooltip={{content: 'Margin currently locked in open positions.'}}>Locked Margin</div>
			<div class="value">${formatForDisplay($lockedMargin)}</div>
		</div>
		<div class="row">
			<div class="label" use:tooltip={{content: 'Margin available to open new positions, equal to Equity - Locked Margin.'}}>Free Margin</div>
			<div class="value">${formatForDisplay($freeMargin)}</div>
		</div>
		<div class="row">
			<div class="label" use:tooltip={{content: 'Equals Equity / Locked Margin. When < 100%, you can no longer open new positions. When < 20%, your account is liquidated.'}}>Margin Level</div>
			<div class="value">{$marginLevel == Infinity ? "∞" : `${formatForDisplay($marginLevel)}%`}</div>
		</div>
	</div>
	<div class='buttons'>
		<button class="primary gray" on:click|stopPropagation={() => {showModal('Deposit')}}>Deposit</button>
		<button class="primary gray" on:click|stopPropagation={() => {showModal('Withdraw')}}>Withdraw</button>
	</div>
</div>