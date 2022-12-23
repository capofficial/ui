<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display Positions
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- Position should show the market, direction, entry price, size, and P/L, as well as X to close. Click on a position to show all details in a modal.
		- The UPLs are pulled directly from the contract (in @api/positions: getUserPositionsWithUpls). No need to calculate them client side.
	*/

    import { XMARK_ICON } from '@lib/icons'

    import { address } from '@lib/stores'
    import { getUserPositionsWithUpls } from '@api/positions'

    let mockData = [
		{
			marketSymbol: "ETH/USD",
			isLong: true,
            entryPrice: 1192.12,
            size: 345350,
            pnl: 2342.43,
            pnlPercent: 32.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            entryPrice: 16789.43,
            size: 123453,
            pnl: 78378.43,
            pnlPercent: 23.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            entryPrice: 16789.43,
            size: 123453,
            pnl: 78378.43,
            pnlPercent: 23.89,
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            entryPrice: 1.01,
            size: 123447,
            pnl: 4563.43,
            pnlPercent: 12.89,
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            entryPrice: 15.43,
            size: 3245350,
            pnl: 2452.43,
            pnlPercent: 785.89,
		},
    ]
  
  let isLoading = true, t1;

  async function fetchData() {
		clearTimeout(t1);
		const done = await getUserPositionsWithUpls();
		if (done) isLoading = false;
		t1 = setTimeout(fetchData, 5000);
	}

	$: fetchData($address);

  

</script>

<div class='positions'>
	<!-- <div class='header'>
		<div class='label'>
			Positions
		</div>
	</div> -->
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
            <div>{data.pnl}</div>
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

  .rows:hover {
	  background-color: var(--layer100);
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

</style>
