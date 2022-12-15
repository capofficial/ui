<script>

	import Ticker from './ticker/Ticker.svelte'
	import Chart from './chart/Chart.svelte'
	import Account from './account/Account.svelte'
	import NewOrder from './new-order/NewOrder.svelte'
	import Trades from './trades/Trades.svelte'
	import Markets from './markets/Markets.svelte'

	import { tradesHeight } from '@lib/stores'

</script>

<style>
	.grid {
		display: grid;
		grid-template-rows: 70px 1fr 1fr var(--trades-height);
		grid-template-columns: 320px 1fr 1fr 310px;
		grid-template-areas: 
			"ticker ticker ticker sidebar"
			"markets chart chart sidebar"
			"markets chart chart sidebar"
			"trades trades trades sidebar";
		grid-gap: 1px;
		height: calc(100vh - 80px);
		background-color: var(--layer100);
	}

	@media all and (max-width: 600px) {
		.grid {
			grid-template-rows: auto 300px 300px auto var(--trades-height);
			grid-template-columns: 1fr;
			grid-template-areas: 
				"ticker"
				"markets"
				"chart"
				"sidebar"
				"trades";
			grid-gap: 1px;
			height: auto;
		}
	}

	.ticker {
		grid-area: ticker;
		background-color: var(--layer0);
	}
	.markets {
		grid-area: markets;
		background-color: var(--layer0);
	}
	.chart {
		grid-area: chart;
		background-color: var(--layer0);
	}
	.trades {
		grid-area: trades;
		overflow: hidden;
		background-color: var(--layer0);
	}
	.sidebar {
		grid-area: sidebar;
		background-color: var(--layer0);
	}
</style>

<div class='grid' style={`--trades-height: ${$tradesHeight}px`}>
	<div class='ticker'><Ticker /></div>
	<div class='markets'><Markets /></div>
	<div class='chart'><Chart /></div>
	<div class='sidebar'>
		<Account />
		<NewOrder />
	</div>
	<div class='trades'><Trades /></div>
</div>