<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display History a list of past positions
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- History should show direction, market, close price, and P/L. Click on a history item to show all details in a modal.
	*/

  let mockData = [
		{
			marketSymbol: "ETH/USD",
			isLong: true,
            closePrice: 1243.43,
            pnl: 45214,
            pnlPercent: 32.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            closePrice: 16789.43,
            pnl: 23179,
            pnlPercent: 2.89,
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            closePrice: 1.01,
            pnl: 75863,
            pnlPercent: 271.54,
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            closePrice: 15.43,
            pnl: 378937,
            pnlPercent: 574.89,
		},
    {
			marketSymbol: "ETH/USD",
			isLong: true,
            closePrice: 1243.43,
            pnl: 45214,
            pnlPercent: 32.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            closePrice: 16789.43,
            pnl: 23179,
            pnlPercent: 2.89,
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            closePrice: 1.01,
            pnl: 75863,
            pnlPercent: 271.54,
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            closePrice: 15.43,
            pnl: 378937,
            pnlPercent: 574.89,
		},
    {
			marketSymbol: "ETH/USD",
			isLong: true,
            closePrice: 1243.43,
            pnl: 45214,
            pnlPercent: 32.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            closePrice: 16789.43,
            pnl: 23179,
            pnlPercent: 2.89,
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            closePrice: 1.01,
            pnl: 75863,
            pnlPercent: 271.54,
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            closePrice: 15.43,
            pnl: 378937,
            pnlPercent: 574.89,
		},
    {
			marketSymbol: "ETH/USD",
			isLong: true,
            closePrice: 1243.43,
            pnl: 45214,
            pnlPercent: 32.89,
		},
        {
			marketSymbol: "BTC/USD",
			isLong: true,
            closePrice: 16789.43,
            pnl: 23179,
            pnlPercent: 2.89,
		},
        {
			marketSymbol: "EUR/USD",
			isLong: false,
            closePrice: 1.01,
            pnl: 75863,
            pnlPercent: 271.54,
		},
        {
			marketSymbol: "SOL/USD",
			isLong: false,
            closePrice: 15.43,
            pnl: 378937,
            pnlPercent: 574.89,
		},
    ]

</script>

<div class='history'>
	<div class='header'>
		<div class='label'>
			History
		</div>
	</div>
	<div class='simpletable'>
		{#each mockData as data}
		<div class='rows'>
			<div class='firstitem'>{data.marketSymbol}</div>
            {#if data.isLong}
                <div class='green'>Long</div>
            {:else}
                <div class='red'>Short</div>
            {/if}
            <div>{data.closePrice}</div>
            <div class='lastitem'>{data.pnl}</div>
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .rows:hover {
	  background-color: var(--layer100);
  }

  .firstitem {
    text-align: left;
  }

  .lastitem {
    text-align: right;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

</style>
