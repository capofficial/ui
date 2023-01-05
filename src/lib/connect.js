import { ethers } from 'ethers'
import { get } from 'svelte/store'
import { DEFAULT_CHAIN_ID, CHAINDATA } from './config'
import { chainId, signer, provider, address, currencyName } from './stores'
import { showToast, hideModal } from './ui'
import { getChainData, saveUserSetting } from './utils'

let _chainId = get(chainId)
let _provider = new ethers.providers.JsonRpcProvider(CHAINDATA[_chainId].rpc);
// const alchemySettings = getChainData('alchemy');
// let _provider = new ethers.providers.AlchemyProvider(alchemySettings?.network, alchemySettings?.key);
provider.set(_provider);
currencyName.set(getChainData('currencyName'));

let _walletConnect;

export async function checkMetamaskSession() {
	if (window.ethereum) connectMetamask(true);
}

export async function connectMetamask(resume) {

	let metamask = window.ethereum;
	if (!metamask && !resume) return showToast('Metamask is not installed.');
	
	_provider = new ethers.providers.Web3Provider(metamask);

	let accounts;
	if (resume) {
		accounts = await _provider.send('eth_accounts');
	} else {
		accounts = await _provider.send("eth_requestAccounts", []);
		hideModal();
	}

	if (!accounts || !accounts.length) return;

	const network = await _provider.getNetwork();
	chainId.set(network.chainId);
	metamask.on('chainChanged', (_chainId) => {
		window.location.reload();
	});

	// provider.set(_provider);

	if (accounts.length) {
		handleAccountsChanged();
	}
	metamask.on('accountsChanged', handleAccountsChanged);

}

export async function connectWalletConnect() {

	let script = document.createElement("script");
	script.setAttribute("src", "https://unpkg.com/@walletconnect/web3-provider@1.6.6/dist/umd/index.min.js");
	document.body.appendChild(script);

	script.addEventListener("load", scriptLoaded, false);

	async function scriptLoaded() {

		_walletConnect = new WalletConnectProvider.default({
			rpc: {
				31337: CHAINDATA[31337].rpc,
				42161: CHAINDATA[42161].rpc
			}
		});

		await _walletConnect.enable();

		hideModal();

		_provider = new ethers.providers.Web3Provider(_walletConnect);

		// provider.set(_provider);
		const network = await _provider.getNetwork();
		chainId.set(network.chainId);

		handleAccountsChanged();

		// Subscribe to accounts change
		_walletConnect.on("accountsChanged", handleAccountsChanged);

		// Subscribe to chainId change
		_walletConnect.on("chainChanged", (chainId) => {
			window.location.reload();
		});

		// Subscribe to session disconnection
		_walletConnect.on("disconnect", (code, reason) => {
			console.log('disconnect', code, reason);
			window.location.reload();
		});

	}

}

export async function disconnectWallet(force) {
	if (force && _walletConnect) await _walletConnect.disconnect();
	signer.set(null);
}

export async function switchChains(chain) {

	let wallet;
	if (window.ethereum) {
		wallet = window.ethereum;
	} else {
		wallet = _walletConnect;
	}

	if (!wallet)
	{
		saveUserSetting('selectedChainId', parseInt(chain))
		window.location.reload();
	}

	try {

		let accounts = await _provider.send('eth_accounts');

		if (!accounts || !accounts.length)
		{
			saveUserSetting('selectedChainId', parseInt(chain))
			window.location.reload();
		}
		else
		{
			await wallet.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chain }],
			});

			saveUserSetting('selectedChainId', parseInt(chain))
		}

	} catch (switchError) {
		// This error code indicates that the chain has not been added to MetaMask.
		if (switchError.code === 4902) {
			try {
				await wallet.request({
					method: 'wallet_addEthereumChain',
					params: [{
						chainId: chain,
						chainName: CHAINDATA[parseInt(chain)]['chainName'],
						rpcUrls: [CHAINDATA[parseInt(chain)]['rpc']],
						nativeCurrency: {
							name: CHAINDATA[parseInt(chain)]['nativeAssetName'],
							symbol: CHAINDATA[parseInt(chain)]['nativeAssetSymbol'],
							decimals: CHAINDATA[parseInt(chain)]['nativeAssetDecimals']
						},
						blockExplorerUrls: [CHAINDATA[parseInt(chain)]['explorer']]
					}],
				});

				saveUserSetting('selectedChainId', parseInt(chain))
			} catch (addError) {
				// handle "add" error
			}
		}
		// handle other "switch" errors
	}

}

async function handleAccountsChanged() {
	const _signer = _provider.getSigner();
	signer.set(_signer);
	address.set(await _signer.getAddress());
}