import { get } from 'svelte/store'
import { getContract } from '@lib/contracts'
import { address, orders } from '@lib/stores'
import { parseUnits, createOrderTuple } from '@lib/formatters'
import { getChainData } from '@lib/utils'
import { showToast, showError } from '@lib/ui'

export async function getUserOrders() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	orders.set([...await contract.getUserOrders(_address)].reverse());
}

export async function executeOrders() {
	const contract = getContract({name: 'Trade', hasSigner: true});
	try {
		let tx = await contract.executeOrders();
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Orders executed.');
			getUserOrders();
		}
	} catch(e) {
		showError(e);
	}
}

export function orderSubmitted() {}
export function closeOrderSubmitted() {}

export async function submitOrder(params) {

	const contract = getContract({name: 'Trade', hasSigner: true});

	let {
		market,
		isLong,
		margin,
		size,
		price,
		hasTPSL,
		isReduceOnly,
		orderType,
		tpPrice,
		slPrice
	} = params;

	let cleaningDecimals = getChainData('currencyDecimals');
	if (cleaningDecimals > 10) cleaningDecimals = 10;
	let marginCleaned = (Math.ceil(margin * 10**cleaningDecimals) / 10**cleaningDecimals).toFixed(cleaningDecimals);
	let sizeCleaned = (Math.floor(size * 10**cleaningDecimals) / 10**cleaningDecimals).toFixed(cleaningDecimals);

	margin = parseUnits(marginCleaned);
	size = parseUnits(sizeCleaned);
	price = parseUnits(price, 18);

	if (orderType == 0) price = parseUnits(0, 18);
	if (!price || price == 0) orderType = 0;
	if (isReduceOnly) margin = parseUnits(0);

	tpPrice = hasTPSL ? parseUnits(tpPrice, 18) : 0;
	slPrice = hasTPSL ? parseUnits(slPrice, 18) : 0;

	try {

		const orderTuple = createOrderTuple({
			market,
			isLong,
			margin,
			size,
			price,
			orderType,
			isReduceOnly
		});

		let tx = await contract.submitOrder(orderTuple, tpPrice, slPrice);

		let receipt = await tx.wait();

		if (receipt && receipt.status == 1) {
			showToast('Order submitted.');
			getUserOrders();
			return true;
		}

	} catch(e) {
		showError(e);
	}

}

export async function updateOrder(orderId, price) {
	const contract = getContract({name: 'Trade', hasSigner: true});
	try {
		let tx = await contract.updateOrder(orderId, parseUnits(price, 18));
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Order updated.');
			getUserOrders();
			return true;
		}
	} catch(e) {
		showError(e);
	}
}

export async function cancelOrder(orderId) {
	const contract = getContract({name: 'Trade', hasSigner: true});
	try {
		let tx = await contract.cancelOrder(orderId);
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Order cancelled.');
			getUserOrders();
		}
	} catch(e) {
		showError(e);
	}
}

export async function cancelAllOrders() {
	const contract = getContract({name: 'Trade', hasSigner: true});
	const _orders = get(orders);
	const orderIds = _orders.map((order) => order.orderId);
	try {
		let tx = await contract.cancelOrders(orderIds);
		let receipt = await tx.wait();
		if (receipt && receipt.status == 1) {
			showToast('Orders cancelled.');
			getUserOrders();
		}
	} catch(e) {
		showError(e);
	}
}

export async function closePosition(params) {

	const contract = getContract({name: 'Trade', hasSigner: true});

	/*
	- closing a position submits a reduce only order in the opposite direction, similar to the current private beta
	- it should allow closing at a price, e.g. TP (limit order) or SL (stop order)
	*/

	let market = params.market
	let margin = 0;
	let size = params.size;
	let price = (params.orderType != 0) ? parseUnits(params.price, 18) : 0;
	let orderType = params.orderType;
	let isReduceOnly = true;
	let isLong = !params.isLong;

	let tpPrice = 0  //parseUnits(params.tpPrice, 18);
	let slPrice = 0  //parseUnits(params.slPrice, 18);

	try {

		const orderTuple = createOrderTuple({
			market,
			isLong,
			margin,
			size,
			price,
			orderType,
			isReduceOnly
		});

		let tx = await contract.submitOrder(orderTuple, tpPrice, slPrice);

		let receipt = await tx.wait();

		if (receipt && receipt.status == 1) {
			showToast('Reduce Order submitted.');
			getUserOrders();
			return true;
		}

	} catch(e) {
		showError(e);
	}

}