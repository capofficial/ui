<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display Orders, the list of positions that are waiting to be opened
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- Order should show the market, direction, entry price, size, as well as X to close. Click on an order to show all details in a modal.
	*/

  import { formatUnits, formatDate, formatSide, formatForDisplay, formatOrderType, formatMarketName } from '@lib/formatters'
  import { XMARK_ICON, PENCIL_ICON, LOADING_ICON } from '@lib/icons'
  import { DEFAULT_ORDERS_SORT_KEY } from '@lib/config'
  import { showModal } from '@lib/ui'

  import Table from '@components/layout/table/Table.svelte'
  import Row from '@components/layout/table/Row.svelte'
  import Cell from '@components/layout/table/Cell.svelte'

  export let allColumns;

  import { address, orders } from '@lib/stores'
  import { getUserOrders, cancelOrder } from '@api/orders'

  let isLoading = true, t;

  async function fetchData() {
    clearTimeout(t);
    const done = await getUserOrders();
    if (done) isLoading = false;
    t = setTimeout(fetchData, 5000);
  }

  $: fetchData($address);

  let ordersCancelling = {};
	async function _cancelOrder(orderId) {
		ordersCancelling[orderId] = true;
		const success = await cancelOrder(orderId);
		ordersCancelling[orderId] = false;
	}

  let sortKey = "timestamp"

  let columns = allColumns

</script>

<Table
	columns={columns}
	isLoading={false}
	isEmpty={$orders.length == 0}
>
  <div class='orders'>
		{#each $orders as order}
		<Row>
      <Cell>{formatDate(order.timestamp)}</Cell>
      <Cell hasClass={order.isLong ? 'green' : 'red'}>{formatSide(order.isLong, order.isReduceOnly)}</Cell>
      <Cell><a href={`/trade/${order.market}`}>{formatMarketName(order.market)}</a></Cell>
      <Cell>{formatForDisplay(formatUnits(order.price, 18))}</Cell>
      <Cell>{formatForDisplay(formatUnits(order.size, 6))}</Cell>
      <Cell>{formatForDisplay(formatUnits(order.margin, 6))}</Cell>
      <Cell>{formatOrderType(order.orderType)}</Cell>
      <Cell isTools={true}>
				{#if order.orderType !== 0}
          <a on:click|stopPropagation={() => { showModal('EditOrder', order) }}>{@html PENCIL_ICON}</a>
          <a on:click|stopPropagation={() => { _cancelOrder(order.orderId) }}>{#if ordersCancelling[order.orderId]}{@html XMARK_ICON}{:else}{@html XMARK_ICON}{/if}</a>
        {/if}
        </Cell>
    </Row>
		{/each}
	</div>
</Table>

<style>

a {
		color: var(--primary);
		text-decoration: none;
}

.orders {

}

</style>
