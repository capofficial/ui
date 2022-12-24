<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display History a list of past positions
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- History should show direction, market, close price, and P/L. Click on a history item to show all details in a modal.
	*/

  import Table from '@components/layout/table/Table.svelte'
  import Row from '@components/layout/table/Row.svelte'
  import Cell from '@components/layout/table/Cell.svelte'

  import { formatMarketName, formatSide } from '@lib/formatters'

  let columns = [
      {key: 'market', gridTemplate: '1.5fr', sortable: true},
      {key: 'isLong', gridTemplate: '1.5fr', sortable: true},
      {key: 'price', gridTemplate: '1.5fr', sortable: true},
      {key: 'pnl', gridTemplate: '1fr', sortable: true},
    ]

  let history = [
    {
      market: "ETH-USD",
      isLong: true,
      price: 1243.43,
      pnl: 23,
    },
    {
      market: "BTC-USD",
      isLong: true,
      price: 16789.43,
      pnl: 2.89,
    },
    {
      market: "EUR-USD",
      isLong: false,
      price: 1.01,
      pnl: 513.89,
    },
    {
      market: "SOL-USD",
      isLong: true,
      price: 15.43,
      pnl: -574.89,
    },
    {
      market: "AAVE-USD",
      isLong: true,
      price: 52.43,
      pnl: 44.89,
    },
  ]

</script>

<div class='history-section'>
	<div class='header'>
		<div class='label'>
			History
		</div>
	</div>
	<Table
  columns={columns}
  isLoading={false}
  isEmpty={history.length == 0}
  >
    <div class='history-table'>
      {#each history as history}
      <Row>
        <Cell><a href={`/trade/${history.market}`}>{formatMarketName(history.market)}</a></Cell>
        <Cell hasClass={history.isLong ? 'green' : 'red'}>{formatSide(history.isLong)}</Cell>
        <Cell>{history.price}</Cell>
        <Cell>{history.pnl}</Cell>
      </Row>
      {/each}
    </div>
  </Table>
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

  .history-section {
      height: 250px;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }

</style>