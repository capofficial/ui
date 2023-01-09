<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should display Positions
		- Below that, should display Orders
		- On the right side of both of those, should display History with infinite scroll
		- Orders and Positions should take up 2/3, History 1/3
	- These are pulled from the @apis
	- No sorting or column customization (keeping things simple)
	- Position should show the market, direction, entry price, size, and P/L, as well as X to close. Click on a position to show all details in a modal.
		- The UPLs are pulled directly from the contract (in @api/positions: getUserPositionsWithUpls). No need to calculate them client side.
	- Order should show the market, direction, entry price, size, as well as X to close. Click on an order to show all details in a modal.
	- History should show direction, market, close price, and P/L. Click on a history item to show all details in a modal.
	*/

//trades: orders, positions, history

import History from './History.svelte'
import Orders from './Orders.svelte'
import Positions from './Positions.svelte'

import { positions, orders, address } from '@lib/stores'
  import { getUserOrders } from '@api/orders'

let allColumns = {
		orders: [
			//{key: 'orderId', gridTemplate: '0.4fr', sortable: true},
			{key: 'timestamp', gridTemplate: '2.2fr', sortable: true},
			{key: 'isLong', gridTemplate: '1.2fr', sortable: true},
			{key: 'market', gridTemplate: '1.2fr', sortable: true},
			{key: 'price', gridTemplate: '0.85fr', sortable: true},
			{key: 'size', gridTemplate: '1fr', sortable: true},
			{key: 'margin', gridTemplate: '1fr', sortable: true},
			{key: 'orderType', gridTemplate: '0.75fr', sortable: true},
			//{key: 'isReduceOnly', gridTemplate: '0.75fr', sortable: true},
			{key: 'tools', gridTemplate: '75px', sortable: false, permanent: true}
		],
		positions: [
			{key: 'timestamp', gridTemplate: '2.2fr', sortable: true},
			{key: 'isLong', gridTemplate: '1.2fr', sortable: true},
			{key: 'market', gridTemplate: '1.2fr', sortable: true},
			{key: 'price', gridTemplate: '0.85fr', sortable: true},
			{key: 'size', gridTemplate: '1fr', sortable: true},
			{key: 'margin', gridTemplate: '1fr', sortable: true},
			{key: 'upl', gridTemplate: '0.75fr', sortable: true},
			//{key: 'fundingTracker', gridTemplate: '1fr', sortable: true},
			{key: 'tools', gridTemplate: '75px', sortable: false, permanent: true}
		],
		history: [
	      {key: 'market', gridTemplate: '1.5fr', sortable: true},
	      {key: 'isLong', gridTemplate: '1.5fr', sortable: true},
	      {key: 'price', gridTemplate: '1.5fr', sortable: true},
	      {key: 'pnl', gridTemplate: '1fr', sortable: true},
	    ]
	}

	let panel = 'positions'

	function _getOrders(addr) {
		if (!addr) return;
		getUserOrders();
	}

	$: _getOrders($address); // to show orders count

</script>

<style>

	.positions {
		max-height: 251px;
		background-color: var(--layer50);
	}
	.orders {
		max-height: 251px;
		background-color: var(--layer50);
	}

	.history {
		max-height: 312px;
		background-color: var(--layer50);
	}

	.nav {
		height: 60px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		background-color: var(--layer50);
		border-bottom: 1px solid var(--layerDark);
		font-weight: 600;
		justify-content: baseline;
		gap: 20px;
	}

	.nav a {
		border-bottom: 0px solid transparent;
		padding-top: 20px;
		padding-bottom: 20px;
		color: var(--text0);
		text-decoration: none;
		vertical-align: middle;
	}

	.nav a.active {
		padding-top: 20px;
		padding-bottom: 15px;
		border-bottom: 5px solid var(--primary);
	}

</style>

<div>
	<div class='nav'>
		<a class:active={panel == 'positions'} on:click={() => {panel = 'positions'}}>Positions {#if $positions.length > 0}<span>({$positions.length})</span>{/if}</a>
		<a class:active={panel == 'orders'} on:click={() => {panel = 'orders'}}>Orders {#if $orders.length > 0}<span>({$orders.length})</span>{/if}</a>
		<a class:active={panel == 'history'} on:click={() => {panel = 'history'}}>History</a>
	</div>
	{#if panel == 'positions'}<div class='positions'><Positions allColumns={allColumns['positions']}/></div>{/if}
	{#if panel == 'orders'}<div class='orders'><Orders allColumns={allColumns['orders']}/></div>{/if}
	{#if panel == 'history'}<div class='history'><History allColumns={allColumns['history']}/></div>{/if}
</div>
