<script>
	/* TODO
	- Should list markets and their latest price pulled from getMarketsWithPrices
	- Data updated every 10s
	- To see a boilerplate of how this is done, see Account.svelte
	- Clicking on a market should load it (through the router) like in current private beta
	*/
	import { markets } from '@lib/stores'
	import { formatForDisplay, formatUnits } from '@lib/formatters'
	import { selectedMarketInfo } from "@lib/stores"

</script>

<div class='markets'>
	<div class='header'>
		<div class='label'>
			Markets
		</div>
	</div>
	<div class='simpletable'>
		{#each Object.values($markets) as market, i}
		<a class:active={market.symbol === $selectedMarketInfo.symbol} class='rows' href={`/trade/${market.symbol}`}>
			<div class='name-leverage'>
				<div>{market.symbol}</div>
				<div class='leverage'>{market.maxLeverage}x</div>
			</div>
			<div>{market.price}</div>
		</a>
		{/each}
	</div>
</div>

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
    justify-content: space-between;
  }
  .label {
    font-size: 16px;
    display: flex;
  }
	.simpletable {
		overflow-y: auto;
		scrollbar-color: var(--layer200);
		scrollbar-width: thin;
		height: 450px;
	}
	.simpletable::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 6px;
	}
	.simpletable::-webkit-scrollbar {
		width: 5px;
		background-color: transparent;
	}
	.simpletable::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: var(--layer200);
	}
  .rows {
	height: 52px;
	max-height: 52px;
	padding: 0 20px;
	border-bottom: 1px solid var(--layer0-hover);
	display: flex;
	color: white;
	text-decoration: none;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
  }

  a.active {
	background-color: var(--layer300);
  }
  
  .rows:hover {
	background-color: var(--layer100);
  }
  .leverage {
		margin-left: 6px;
		background-color: var(--layer200);
		padding: 3px 4px;
		border-radius: 3px;
		font-size: 80%;
	}
   .name-leverage {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>