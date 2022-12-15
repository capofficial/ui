import { ethers } from 'ethers'
import { get } from 'svelte/store'

import { ABIS } from './abis'
import { CHAINDATA } from './config'

import { provider, signer, chainId, unsupportedNetwork } from './stores'

export function getContract(params) {

	let { name, hasSigner, address } = params;

	const _provider = get(provider);
	const _signer = get(signer);
	const _chainId = get(chainId);

	if (!_chainId || !_provider) return;

	if (!CHAINDATA[_chainId]) {
		// Chain not supported
		unsupportedNetwork.set(true);
		return;
	}

	unsupportedNetwork.set(false);

	if (!address) address = CHAINDATA[_chainId].contracts[name];
	let contract = new ethers.Contract(address, ABIS[name], _provider);
	if (hasSigner) return contract.connect(_signer);
	return contract;

}