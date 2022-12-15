import { get } from 'svelte/store'
import { ethers } from 'ethers'
import { getContract } from '@lib/contracts'
import { address, balance, allowance } from '@lib/stores'
import { formatUnits } from '@lib/formatters'
import { getChainData } from '@lib/utils'
import { showToast, showError } from '@lib/ui'

export async function getUserBalance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	balance.set(formatUnits(await contract.getBalance(_address)));
}

export async function getUserWalletBalance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'ERC20', address: getChainData('currency')});
	return formatUnits(await contract.balanceOf(_address));
}

export async function getUserAllowance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'ERC20', address: getChainData('currency')});
	const spenderContract = getContract({name: 'Store'});
	allowance.set(formatUnits(await contract.allowance(_address, spenderContract.address)));
}

export async function approveCurrency() {
	const contract = getContract({name: 'ERC20', address: getChainData('currency')});
	const spenderContract = getContract({name: 'Store'});
	const spenderAddress = spenderContract.address;
	try {
		let tx = await contract.approve(spenderAddress, ethers.constants.MaxUint256);
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Approval succeeded.', 1);
			getUserAllowance();
		}
	} catch(e) {
		showError(e);
	}
}