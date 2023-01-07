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

import { positions, orders } from '@lib/stores'

let allColumns = {
		orders: [
			//{key: 'orderId', gridTemplate: '0.4fr', sortable: true},
			{key: 'timestamp', gridTemplate: '1.75fr', sortable: true},
			{key: 'isLong', gridTemplate: '0.5fr', sortable: true},
			{key: 'market', gridTemplate: '1fr', sortable: true},
			{key: 'price', gridTemplate: '0.85fr', sortable: true},
			{key: 'size', gridTemplate: '1fr', sortable: true},
			{key: 'margin', gridTemplate: '1fr', sortable: true},
			{key: 'orderType', gridTemplate: '0.75fr', sortable: true},
			//{key: 'isReduceOnly', gridTemplate: '0.75fr', sortable: true},
			{key: 'tools', gridTemplate: '75px', sortable: false, permanent: true}
		],
		positions: [
			{key: 'timestamp', gridTemplate: '1.75fr', sortable: true},
			{key: 'isLong', gridTemplate: '0.5fr', sortable: true},
			{key: 'market', gridTemplate: '1fr', sortable: true},
			{key: 'price', gridTemplate: '0.85fr', sortable: true},
			{key: 'size', gridTemplate: '1fr', sortable: true},
			{key: 'margin', gridTemplate: '1fr', sortable: true},
			{key: 'upl', gridTemplate: '0.75fr', sortable: true},
			//{key: 'fundingTracker', gridTemplate: '1fr', sortable: true},
			{key: 'tools', gridTemplate: '75px', sortable: false, permanent: true}
		],
	}

let panel = 'positions'


</script>

<style>
	.grid {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 
			"positions-orders positions-orders history"
			"positions-orders positions-orders history";
		grid-gap: 1px;
		background-color: var(--layerDark);
		max-width: 1280px;
		height: 312px;
		margin: 0px auto;
	}

	.positions-orders {
		grid-area: positions-orders;
		height: 251px;
	}

	.positions {
		grid-area: positions;
		height: 251px;
		background-color: var(--layer50);
	}
	.orders {
		grid-area: orders;
		height: 251px;
		background-color: var(--layer50);
	}

	.history {
		grid-area: history;
		height: 312px;
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
		text-transform: uppercase;
		justify-content: baseline;
		gap: 8px;
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

<div class='grid'>
	<div class='positions-orders'>
		<div class='nav'>
			<a class:active={panel == 'positions'} on:click={() => {panel = 'positions'}}>Positions {#if $positions.length > 0}<span>({$positions.length})</span>{/if}</a>
			<a class:active={panel == 'orders'} on:click={() => {panel = 'orders'}}>Orders {#if $orders.length > 0}<span>({$orders.length})</span>{/if}</a>
		</div>
		{#if panel == 'positions'}<div class='positions'><Positions allColumns={allColumns['positions']}/></div>{/if}
		{#if panel == 'orders'}<div class='orders'><Orders allColumns={allColumns['orders']}/></div>{/if}
	</div>		
	<div class='history'>
		<div class='nav'>History</div>
		<History />
	</div>
</div>
