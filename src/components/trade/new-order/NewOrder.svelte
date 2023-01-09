<script>
  import { selectedMarketInfo, fundingRate } from "@lib/stores";
  import { showModal } from "@lib/ui";
  import { INFO_ICON_CIRCLE, CHEVRON_DOWN } from "@lib/icons";
  import Chart from "../Chart/Chart.svelte";
  import CreateNewOrder from "./CreateNewOrder.svelte";
  import { getFundingRate } from '@api/markets';
  import { formatForDisplay } from '@lib/formatters'
  import { setPageTitle } from '@lib/ui'
  /* TODO
	- For a boilerplate, see Account.svelte
	- Should have a header with the the selectedMarket and latest price (spaced between), as well as the funding rate
		- Should have an info icon to display market info modal when clicked
	- Below that, have a simple chart like the one chainlink displays for its data. See https://data.chain.link/arbitrum/mainnet/crypto-usd/eth-usd (History section). We can likely pull from the same API they're using to get the latest 100 points. Unclear whether lightweight-charts is needed. Probably a simple line chart library is sufficient.
	- Below that, have the new order form.
		- First row
			- Market, Limit, Stop
			- In the top right, click to see a drop down that allows toggling TP/SL and Reduce Only
		- Below that, the Size input field
			- it should have a Size Slider
		- Below that, all the other potential input fields, like Price, TP, SL
		- Below that, two buttons: Buy/Long and Sell/Short
		- Below the buy button: Margin and its value
		- Below the sell button: Fee and its value
	*/
  
  let t;
	async function fetchFundingData() {
		clearTimeout(t);
		getFundingRate($selectedMarketInfo.symbol);
		t = setTimeout(fetchFundingData, 300*1000);
	}
  $: fetchFundingData($selectedMarketInfo.symbol)

  function setPriceInTitle(marketInfo) {
    if (!marketInfo || !marketInfo.price || !marketInfo.symbol) return;
    setPageTitle(`${marketInfo.price} ${marketInfo.symbol}`);
  }

  $: setPriceInTitle($selectedMarketInfo)

</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<div class="new-order">
  <div class="header">
    <div class="selected-market">
      <a on:click|stopPropagation={() => showModal("Markets")} class='market-button'>
        <div>{$selectedMarketInfo.symbol} <span class='leverage'>{$selectedMarketInfo.maxLeverage}x</span></div> 
        <div class='down-caret'>▼</div>
      </a>
    </div>
    
    <div class="price">{$selectedMarketInfo.price}</div>

    <div class="info-icon" on:click|stopPropagation={() => showModal("MarketInfo", $selectedMarketInfo)}>
      {@html INFO_ICON_CIRCLE}
    </div>
    <div class='funding'>
      <div class='funding-label'>
        Funding 1h
      </div>
      <div>
      {#if $fundingRate > 0}
        {`+${formatForDisplay($fundingRate)}%`}
      {:else}
        {`${formatForDisplay($fundingRate)}%`}
      {/if}
      </div>
    </div>
  </div>
  <div class="chart">
    <div id="chart">
      <Chart />
    </div>
  </div>
  <div>
		<CreateNewOrder />
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
    font-size: 85%;
    justify-content: space-between;
  }
  .selected-market {
    font-size: 16px;
    display: flex;
  }
  .market-button {
    display: flex;
    gap: 16px;
  }
  .down-caret {
    font-size: 50%;
    align-self: center;
  }
  .funding-label {
    opacity: 0.5;
    font-weight: 400;
    margin-bottom: 3px;
  }
  .price {
    font-size: 16px;
    flex-grow: 1;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px;
    border-left-style: solid;
    border-left-color: var(--layerDark);
  }
  .leverage {
    margin-left: 6px;
    background-color: var(--layer200);
    padding: 3px 4px;
    border-radius: 3px;
    font-size: 80%;
  }
  .info-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 16px;
  }
  .info-icon :global(svg) {
    fill: var(--text200);
    width: 18px;
  }
  .chart {
    border-bottom: 1px solid var(--layerDark);
  }
</style>
