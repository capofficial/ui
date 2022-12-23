<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display Orders, the list of positions that are waiting to be opened
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- Order should show the market, direction, entry price, size, as well as X to close. Click on an order to show all details in a modal.
	*/

    import { XMARK_ICON } from '@lib/icons'

    import { address } from '@lib/stores'
    import { getUserOrders } from '@api/orders'

    let mockData = [
		{
			marketSymbol: "ETH/USD",
			isLong: true,
            entryPrice: 1243.43,
            size: 45214,
            type: "Market"
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            entryPrice: 1243.43,
            size: 45214,
            type: "Limit"
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            entryPrice: 1243.43,
            size: 45214,
            type: "Market"
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            entryPrice: 1243.43,
            size: 45214,
            type: "Limit"
		},
    {
			marketSymbol: "ETH/USD",
			isLong: true,
            entryPrice: 1243.43,
            size: 45214,
            type: "Market"
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            entryPrice: 1243.43,
            size: 45214,
            type: "Limit"
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            entryPrice: 1243.43,
            size: 45214,
            type: "Market"
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            entryPrice: 1243.43,
            size: 45214,
            type: "Limit"
		},
    ]


  let isLoading = true, t;

  async function fetchData() {
    clearTimeout(t);
    const done = await getUserOrders();
    if (done) isLoading = false;
    t = setTimeout(fetchData, 5000);
  }

  $: fetchData($address);

</script>

<div class='orders'>
	<!--<div class='header'>
		<div class='label'>
			Orders
		</div>
	</div>-->
	<div class='simpletable'>
		{#each mockData as data}
		<div class='rows'>
			<div>{data.marketSymbol}</div>
            {#if data.isLong}
                <div class='green'>Long</div>
            {:else}
                <div class='red'>Short</div>
            {/if}
            <div>{data.entryPrice}</div>
            <div>{data.size}</div>
            <div>{data.type}</div>
            <div>✕</div>
		</div>
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
    height: 212px;
    overflow-y: auto;
    scrollbar-color: var(--layer200);
		scrollbar-width: thin;
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
    padding: 0 20px;
    border-bottom: 1px solid var(--layer0-hover);
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr)) 15px;
    align-items: center;
    justify-content: space-between;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

</style>
