<script>

	import Account from './account/Account.svelte'
	import NewOrder from './new-order/NewOrder.svelte'
	import Trades from './trades/Trades.svelte'

</script>

<style>
	.grid {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: 280px 1fr;
		grid-template-areas: 
			"account newOrder"
			"trades trades";
		grid-gap: 8px;
		max-width: var(--container-width);
		margin: 0 auto;
	}
	.new-order {
		grid-area: newOrder;
		background-color: var(--layer50);
		border: 1px solid var(--layerDark);
	}
	.trades {
		grid-area: trades;
		background-color: var(--layer50);
		border: 1px solid var(--layerDark);
	}
	.account {
		grid-area: account;
		background-color: var(--layer50);
		border: 1px solid var(--layerDark);
	}
</style>

<div class='grid'>
	<div class='account'><Account /></div>
	<div class='new-order'><NewOrder /></div>
	<div class='trades'><Trades /></div>
</div>