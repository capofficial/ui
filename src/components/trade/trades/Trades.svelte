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
</script>

trades: orders, positions, history