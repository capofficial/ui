<script>
	/* TODO
	- For a boilerplate, see Account.svelte
	- Should have a header with the the selectedMarket and latest price (spaced between), as well as the funding rate
		- Should have an info icon to display market info modal when clicked
	- Below that, have a simple chart like the one chainlink displays for its data. See https://data.chain.link/arbitrum/mainnet/crypto-usd/eth-usd (History section). We can likely pull from the same API they're using to get the latest 100 points. Unclear whether lightweight-charts is needed. Probably a simple line chart library is sufficient.
	- Below that, have the new order form.
		- First row
			- Market, Limit, Stop
			- In the top right, click to see a drop down that allows toggling TP/SL and Reduce Only
		- Below that, the Size input field
			- it should have a Size Slider
		- Below that, all the other potential input fields, like Price, TP, SL
		- Below that, two buttons: Buy/Long and Sell/Short
		- Below the buy button: Margin and its value
		- Below the sell button: Fee and its value
	*/
</script>

new order