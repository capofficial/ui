<script>
	import Modal from './Modal.svelte'
	import { connectMetamask, connectWalletConnect } from '@lib/connect'
</script>

<style>

	.row {
		display: flex;
		align-items: center;
		padding: 0 var(--base-padding);
		border-bottom: 1px solid var(--layer2);
		font-weight: 500;
		cursor: pointer;
		height: 54px;
	}
	.row:not(.active):hover {
		background-color: var(--layer1dot5);
	}
	.row:last-child {
		border-bottom: none;
	}

	.row img {
		max-width: 36px;
		margin-right: 20px;
	}

</style>

<Modal title='Connect Your Wallet' width={300}>
	
	<div class='row' on:click|stopPropagation={() => {connectMetamask()}}>
		<img src='https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'>
		<div>MetaMask</div>
	</div>

	<div class='row' on:click|stopPropagation={() => {connectWalletConnect()}}>
		<img src='https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Blue%20(Default)/Icon.svg'>
		<div>WalletConnect</div>
	</div>

</Modal>
