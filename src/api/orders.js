import { get } from 'svelte/store'
import { getContract } from '@lib/contracts'
import { address, orders, selectedMarket, margin, size, price, orderType, isReduceOnly, isLong, hasTPSL, tpPrice, slPrice } from '@lib/stores'
import { parseUnits, createOrderTuple } from '@lib/formatters'
import { getChainData } from '@lib/utils'
import { showToast, showError } from '@lib/ui'

export async function getUserOrders() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Store'});
	orders.set([...await contract.getUserOrders(_address)].reverse());
}

export async function submitOrder() {

	const contract = getContract({name: 'Cap'});

	// Params
	const market = get(selectedMarket);
	const _isLong = get(isLong);

	let cleaningDecimals = getChainData('currencyDecimals');
	if (cleaningDecimals > 10) cleaningDecimals = 10;
	let marginCleaned = (Math.ceil(get(margin) * 10**cleaningDecimals) / 10**cleaningDecimals).toFixed(cleaningDecimals);
	let sizeCleaned = (Math.floor(get(size) * 10**cleaningDecimals) / 10**cleaningDecimals).toFixed(cleaningDecimals);

	let _margin = parseUnits(marginCleaned);
	const _size = parseUnits(sizeCleaned);
	let _price = parseUnits(get(price), 18);
	const _orderType = get(orderType);
	const _isReduceOnly = get(isReduceOnly);
	let _hasTPSL = get(hasTPSL);

	if (_orderType == 0) _price = parseUnits(0);
	if (_isReduceOnly) _margin = parseUnits(0);

	const _tpPrice = _hasTPSL ? parseUnits(get(tpPrice), 18) : 0;
	const _slPrice = _hasTPSL ? parseUnits(get(slPrice), 18) : 0;

	try {

		let tx, receipt;

		const orderTuple = createOrderTuple({
			market,
			isLong: _isLong,
			margin: _margin,
			size: _size,
			price: _price,
			orderType: _orderType,
			isReduceOnly: _isReduceOnly
		});

		tx = await contract.submitOrder(orderTuple, _tpPrice, _slPrice);

		receipt = await tx.wait();

		if (receipt && receipt.status == 1) {
			showToast('Order submitted.');
			getUserOrders();
		}

	} catch(e) {
		showError(e);
	}

}

export async function updateOrder() {

	

}

export async function cancelOrder(orderId) {

}

export async function cancelAllOrders() {

}