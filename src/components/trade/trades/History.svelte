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

  import { formatMarketName, formatSide, formatUnits, formatDate, formatForDisplay } from '@lib/formatters'
  import { address } from '@lib/stores'
  import { getUserHistory } from '@api/history'
  import { showModal } from "@lib/ui";


  let columns = [
      {key: 'market', gridTemplate: '1.5fr', sortable: true},
      {key: 'isLong', gridTemplate: '1.5fr', sortable: true},
      {key: 'price', gridTemplate: '1.5fr', sortable: true},
      {key: 'pnl', gridTemplate: '1fr', sortable: true},
    ]

  let history = []

async function getHistory() {
  try {
    let _history = await getUserHistory()
    if (_history.length > 0)
    {
      history = _history
    }
  } catch (err) {
  console.log(err)
  }
}

let isLoading = true, t1;

async function fetchData() {
  clearTimeout(t1);
  const done = await getHistory();
  if (done) isLoading = false;
  t1 = setTimeout(fetchData, 10000);
}

$: fetchData($address);

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
      <div class='row' on:click|stopPropagation={() => showModal("HistoryDetails", history)}>
        <Row>
          <Cell>{formatMarketName(history.market)}</Cell>
          {#if history.status == 'liquidated'}
            <Cell hasClass={history.isLong ? 'green' : 'red'}>{`Liquidated ${formatSide(history.isLong)}`}</Cell>
          {:else if history.status == 'executed'}
            {#if history.isReduceOnly}
              <Cell hasClass={!history.isLong ? 'green' : 'red'}>{formatSide(history.isLong, history.isReduceOnly, history.pnl)}</Cell>
            {:else}  
              <Cell hasClass={history.isLong ? 'green' : 'red'}>{`Open ${formatSide(history.isLong)}`}</Cell>
            {/if}
          {:else if history.status == 'cancelled'}
            <Cell hasClass={history.isLong ? 'green' : 'red'}>{`Cancel ${formatSide(history.isLong)}`}</Cell>
          {/if}
          <Cell>{formatForDisplay(formatUnits(history.price, 18))}</Cell>
          {#if Number(formatUnits(history.pnl,6)) == 0}
            {#if history.isReduceOnly}
              <Cell>{formatForDisplay(formatUnits(history.pnl, 6))}</Cell>
            {:else}
              <Cell>-</Cell>
            {/if}
          {:else}
            <Cell hasClass={history.pnl > 0 ? 'green' : 'red'}>{formatForDisplay(formatUnits(history.pnl, 6))}</Cell>
          {/if}
        </Row>
      </div>
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

  .row {
    user-select: none;
  }

  .row:hover {
    background-color: var(--layer100);
    cursor: pointer;
  }

</style>