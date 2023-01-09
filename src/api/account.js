import { get } from 'svelte/store'
import { ethers } from 'ethers'
import { getContract } from '@lib/contracts'
import { address, balance, allowance, lockedMargin, upl } from '@lib/stores'
import { formatUnits, parseUnits } from '@lib/formatters'
import { getChainData } from '@lib/utils'
import { showToast, showError } from '@lib/ui'

export async function deposit(amount) {
	const contract = getContract({name: 'Trade', hasSigner: true});
	try {
		let tx = await contract.deposit(parseUnits(amount));
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Deposit succeeded.');
			getUserBalance();
			return true;
		}
	} catch(e) {
		showError(e);
	}
}

export async function withdraw(amount) {
	const contract = getContract({name: 'Trade', hasSigner: true});
	try {
		let tx = await contract.withdraw(parseUnits(amount));
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Withdrawal succeeded.');
			getUserBalance();
			return true;
		}
	} catch(e) {
		showError(e);
	}
}

export async function getUserBalance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	balance.set(formatUnits(await contract.getBalance(_address)));
}

export async function getUserLockedMargin() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	lockedMargin.set(formatUnits(await contract.getLockedMargin(_address)));
}

export async function getUserUpl() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Trade'});
	upl.set(formatUnits(await contract.getUpl(_address)));
}

export async function getUserWalletBalance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'ERC20', address: getChainData('currencyAddress')});
	return formatUnits(await contract.balanceOf(_address));
}

export async function getUserAllowance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'ERC20', address: getChainData('currencyAddress')});
	const spenderContract = getContract({name: 'Store'});
	allowance.set(formatUnits(await contract.allowance(_address, spenderContract.address)));
}

export async function approveCurrency() {
	const contract = getContract({name: 'ERC20', address: getChainData('currencyAddress'), hasSigner: true});
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