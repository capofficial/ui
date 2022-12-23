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
		margin: 0px auto;
	}

	.positions-orders {
		grid-area: positions-orders;
	}

	.positions {
		grid-area: positions;
		background-color: var(--layer50);
	}
	.orders {
		grid-area: orders;
		background-color: var(--layer50);
	}
	.history {
		grid-area: history;
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
			<a class:active={panel == 'positions'} on:click={() => {panel = 'positions'}}>Positions</a>
			<a class:active={panel == 'orders'} on:click={() => {panel = 'orders'}}>Orders</a>
		</div>
		{#if panel == 'positions'}<div class='positions'><Positions /></div>{/if}
		{#if panel == 'orders'}<div class='orders'><Orders /></div>{/if}
	</div>		
	<div class='history'><History /></div>
</div>
