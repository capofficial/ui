<script>
	import { formatForDisplay } from '@lib/formatters'
	import { balance, upl, equity, lockedMargin, freeMargin, marginLevel } from '@lib/stores'

	import { showModal } from '@lib/ui'
</script>

<style>
	.account {
		padding: 20px;
	}
	.data {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>

<div class="account">
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
			<div class="value">{formatForDisplay($marginLevel)}%</div>
		</div>
	</div>
	<div class="buttons">
		<button on:click|stopPropagation={() => {showModal('Deposit')}}>Deposit</button>
		<button on:click|stopPropagation={() => {showModal('Withdraw')}}>Withdraw</button>
	</div>
</div>