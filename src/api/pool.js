import { get } from 'svelte/store'
import { BPS_DIVIDER } from '@lib/config'
import { getContract } from '@lib/contracts'
import { address, poolBalance, bufferBalance, userPoolBalance, poolWithdrawalFee } from '@lib/stores'
import { formatUnits } from '@lib/formatters'
import { showToast, showError } from '@lib/ui'

export async function addLiquidity(amount) {
	const contract = getContract({name: 'Pool', hasSigner: true});
	try {
		let tx = await contract.addLiquidity(amount);
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Add Liquidity succeeded.');
			getPoolBalance();
			getUserPoolBalance();
			return true;
		}
	} catch(e) {
		showError(e);
	}
}

export async function removeLiquidity(amount) {
	const contract = getContract({name: 'Pool', hasSigner: true});
	try {
		let tx = await contract.removeLiquidity(amount);
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Remove Liquidity succeeded.');
			getPoolBalance();
			getUserPoolBalance();
			return true;
		}
	} catch(e) {
		showError(e);
	}
}

export async function getPoolBalance() {
	const contract = getContract({name: 'Store'});
	poolBalance.set(formatUnits(await contract.poolBalance()));
}

export async function getBufferBalance() {
	const contract = getContract({name: 'Store'});
	bufferBalance.set(formatUnits(await contract.bufferBalance()));
}

export async function getPoolWithdrawalFee() {
	const contract = getContract({name: 'Store'});
	poolWithdrawalFee.set(await contract.poolWithdrawalFee() / BPS_DIVIDER);
}

export async function getUserPoolBalance() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	userPoolBalance.set(formatUnits(await contract.getUserPoolBalance(_address)));
}