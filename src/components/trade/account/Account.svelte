<script>
	import { onDestroy } from 'svelte';

	import { formatForDisplay } from '@lib/formatters'
	import { address, balance, upl, equity, lockedMargin, freeMargin, marginLevel } from '@lib/stores'

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
		text-transform: uppercase;
		font-size: 85%;
	}
	.account {
		
	}
	.data {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		padding: 20px;
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

<div class="account">
	<div class="header">Account</div>
	<div class="data">
		<div class="row">
			<div class="label">Balance</div>
			<div class="value">${formatForDisplay($balance)}</div>
		</div>
		<div class="row">
			<div class="label">UP/L</div>
			<div class="value">${formatForDisplay($upl)}</div>
		</div>
		<div class="row">
			<div class="label">Equity</div>
			<div class="value">${formatForDisplay($equity)}</div>
		</div>
		<div class="row">
			<div class="label">Locked Margin</div>
			<div class="value">${formatForDisplay($lockedMargin)}</div>
		</div>
		<div class="row">
			<div class="label">Free Margin</div>
			<div class="value">${formatForDisplay($freeMargin)}</div>
		</div>
		<div class="row">
			<div class="label">Margin Level</div>
			<div class="value">{$marginLevel == Infinity ? "∞" : `${formatForDisplay($marginLevel)}%`}</div>
		</div>
	</div>
	<div class="buttons">
		<button on:click|stopPropagation={() => {showModal('Deposit')}}>Deposit</button>
		<button on:click|stopPropagation={() => {showModal('Withdraw')}}>Withdraw</button>
	</div>
</div>