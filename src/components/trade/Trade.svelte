<script>

	import Account from './account/Account.svelte'
	import NewOrder from './new-order/NewOrder.svelte'
	import Trades from './trades/Trades.svelte'
	import Markets from './markets/Markets.svelte'

</script>

<style>
	.grid {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: repeat(4, 1fr);
		grid-template-areas: 
			"markets newOrder newOrder account"
			"trades trades trades trades";
		grid-gap: 1px;
		background-color: var(--layerDark);
		max-width: 1280px;
		margin: 0 auto;
		border: 1px solid var(--layerDark);
	}

	.markets {
		grid-area: markets;
		background-color: var(--layer50);
	}
	.new-order {
		grid-area: newOrder;
		background-color: var(--layer50);
	}
	.trades {
		grid-area: trades;
		background-color: var(--layer50);
	}
	.account {
		grid-area: account;
		background-color: var(--layer50);
	}
</style>

<div class='grid'>
	<div class='markets'><Markets /></div>
	<div class='new-order'><NewOrder /></div>
	<div class='account'><Account /></div>
	<div class='trades'><Trades /></div>
</div>