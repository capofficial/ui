import { get } from 'svelte/store'
import { ethers } from 'ethers'
import { ADDRESS_ZERO, BPS_DIVIDER } from './config'
import { locale, upl } from './stores'
import { getChainData } from './utils'
import { DEFAULT_CHAIN_ID, CHAINDATA } from './config'

export function formatUnits(amount, decimals) {
	if (!amount) return 0;
	if (!decimals) decimals = getChainData('currencyDecimals') || 18;
	return ethers.utils.formatUnits(amount || 0, decimals);
}

export function parseUnits(amount, decimals) {
	if (!amount || isNaN(amount)) amount = '0';
	if (typeof(amount) == 'number') amount = "" + amount;
	if (!decimals) decimals = getChainData('currencyDecimals') || 18;
	return ethers.utils.parseUnits(amount, decimals);
}

export function createOrderTuple(params) {

	return {
		orderId: 0,
		user: ADDRESS_ZERO,
		market: params.market,
		margin: params.margin,
		size: params.size,
		price: params.price || 0,
		fee: params.fee || 0,
		isLong: params.isLong,
		orderType: params.orderType || 0,
		isReduceOnly: params.isReduceOnly || false,
		timestamp: 0
	};

}

export function getLabelForKey(key) {
	switch(key) {
		case 'id':
			return 'ID';
		case 'se':
			return 'S/E';
		case 'orderId':
			return 'ID';
		case 'timestamp':
			return 'Time';
		case 'isLong':
			return 'Side';
		case 'market':
			return 'Market';
		case 'orderType':
			return 'Type';
		case 'upl':
			return 'P/L';
		case 'pnl':
			return 'P/L';
		case 'isReduceOnly':
			return 'Reduce-Only';
		case 'cancelOrderId':
			return 'OCO';
		case 'liqprice':
			return 'Liq. Price';
		default:
			return key;
	}
}

export function formatMarketName(name, graySecondary) {
	if (!name) return;
	name = name.replace('-', '/');
	if (graySecondary) {
		name = name.replace('/USD', `<span class='grayed'>/USD</span>`).replace('USD/', `<span class='grayed'>USD/</span>`);
	}
	return name;
}

export function formatDate(timestamp) {
	if (!timestamp || timestamp * 1 == 0) return;
	// timestamp in seconds
	return new Date(timestamp*1000).toLocaleString(get(locale));
}

export function letterify(amount) {
	if (amount >= 10**9) return Math.round(amount/10**9) + 'B';
	if (amount >= 10**6) return Math.round(amount/10**6) + 'M';
	if (amount >= 10**3) return Math.round(amount/10**3) + 'K';
}

export function formatForDisplay(amount, fix) {

	amount = amount * 1;

	if (!amount || isNaN(amount)) return 0;

	if (!fix && (amount * 1).toFixed(6)*1 == Math.round(amount * 1)) return Math.round(amount);
	
	if (fix) return (amount*1).toFixed(fix);

	if (amount * 1 >= 10000 || amount * 1 <= -10000) {
		return Math.round(amount*1);
	} else if (amount * 1 >= 10 || amount * 1 <= -10) {
		return (amount * 1).toFixed(2);
	} else if (amount * 1 >= 1 || amount * 1 <= -1) {
		return +(amount * 1).toFixed(4);
	} else if (amount * 1 >= 0.01 || amount * 1 <= -0.01) {
		return +(amount * 1).toFixed(5);
	} else {
		return +(amount * 1).toFixed(6);
	}

}

export function numberWithCommas(amount) {   // Get Commafied Value 
	let formattedAmount = formatForDisplay(amount) * 1;
    return formattedAmount.toLocaleString(get(locale));
}

export function formatOrderType(orderType) {
	if (!orderType) return 'Market';
	if (orderType == 1) return 'Limit';
	if (orderType == 2) return 'Stop';
}

export function formatSide(isLong, isReduceOnly, pnl) {
	if (isReduceOnly && isLong || isLong && pnl) {
		return 'Close Short';
	} else if (isReduceOnly && !isLong || !isLong && pnl) {
		return 'Close Long';
	} else if (isLong) {
		return 'Long';
	} else {
		return 'Short';
	}
}

export function formatPnl(pnl, isPercent) {
	let string = '';
	if (pnl == undefined) return string;
	if (pnl > 0) {
		string += '+';
	} else if (pnl > 0) {
		string += '-';
	}
	string += formatForDisplay(pnl, isPercent ? 2 : null) || 0;
	if (isPercent) string += '%';
	return string;
}

export function formatMarket(market) {

	if (!market) return;

	return {
		'Name': market.symbol,
		'Price': market.price,
		'Funding Factor': `${formatForDisplay(100 * market.fundingFactor / BPS_DIVIDER)}%`,
		'Max Leverage': `${market.maxLeverage}x`,
		'Max Open Interest': formatForDisplay(formatUnits(market.maxOI, 6)),
		'Min Size': formatForDisplay(formatUnits(market.minSize, 6)),
		'Min Settlement Time': `${market.minSettlementTime}s`,
		'Fee': `${formatForDisplay(100 * market.fee / BPS_DIVIDER)}%`,
	}

}

export function formatHistory(history) {

	if (!history) return;

	let historyData
	if (history.status == 'liquidated')
	{
		historyData = {
			'Market': history.market,
			'Side': `Liquidated ${formatSide(history.isLong)}`,
			'Price': `${formatForDisplay(Number(formatUnits(history.price, 18)))}`,
			'Size': `${formatForDisplay(Number(formatUnits(history.size), 6))}`,
			'Margin': `${formatForDisplay(Number(formatUnits(history.margin), 6))}`,
			'PnL': `${formatForDisplay(Number(formatUnits(history.pnl), 6))}`,
			'Fee': `${formatForDisplay(Number(formatUnits(history.fee), 6))}`,
			'Date': `${formatDate(history.timestamp)}`
		}
	}
	else if (history.status == 'cancelled')
	{
		historyData = {
			'Market': history.market,
			'Side': `Cancel ${formatSide(history.isLong, history.isReduceOnly, history.pnl)}`,
			'Price': `${formatForDisplay(Number(formatUnits(history.price, 18)))}`,
			'Size': `${formatForDisplay(Number(formatUnits(history.size), 6))}`,
			'Margin': `${formatForDisplay(Number(formatUnits(history.margin), 6))}`,
			'PnL': `${formatForDisplay(Number(formatUnits(history.pnl), 6))}`,
			'Fee': `${formatForDisplay(Number(formatUnits(history.fee), 6))}`,
			'Date': `${formatDate(history.timestamp)}`
		}
	}
	else
	{
		historyData = {
			'Market': history.market,
			'Side': `${formatSide(history.isLong, history.isReduceOnly, history.pnl)}`,
			'Price': `${formatForDisplay(Number(formatUnits(history.price, 18)))}`,
			'Size': `${formatForDisplay(Number(formatUnits(history.size), 6))}`,
			'Margin': `${formatForDisplay(Number(formatUnits(history.margin), 6))}`,
			'PnL': `${formatForDisplay(Number(formatUnits(history.pnl), 6))}`,
			'Fee': `${formatForDisplay(Number(formatUnits(history.fee), 6))}`,
			'Date': `${formatDate(history.timestamp)}`
		}
	}

	return historyData

}

export function formatGraphCandle(candle) {

	if (!candle) return;

	return [
		candle.timestamp,
		formatUnits(candle.l) * 1,
		formatUnits(candle.h) * 1,
		formatUnits(candle.o) * 1,
		formatUnits(candle.c) * 1
	];

}

export function formatOrder(order) {
	if (!order) return;
	order = Object.assign({}, order);
	const asset = getLabelForAsset(order.asset);
	let units = asset == 'USDC' ? 6 : 18;
	order.assetAddress = order.asset;
	order.asset = asset;
	order.margin = formatUnits(order.margin, units);
	order.size = formatUnits(order.size, units);
	order.price = formatUnits(order.price);
	order.fee = formatUnits(order.fee, units);
	order.leverage = order.margin * 1 > 0 ? Math.ceil(order.size * 1000 / order.margin)/1000 * 1 : 0;
	return order;
}

export function formatPosition(position) {
	if (!position) return;
	position = Object.assign({}, position);
	const asset = getLabelForAsset(position.asset);
	let units = asset == 'USDC' ? 6 : 18;
	position.assetAddress = position.asset;
	position.asset = asset;
	position.margin = formatUnits(position.margin, units);
	position.size = formatUnits(position.size, units);
	position.price = formatUnits(position.price);
	position.leverage = Math.ceil(position.size * 1000 / position.margin)/1000;
	return position;
}

export function formatPositionNew(position) {
	if (!position) return;

	position = {
		user: position.user,
		market: position.market,
		price: formatUnits(position.price, 18),
		size: formatUnits(position.size, 6),
		margin: formatUnits(position.margin, 6),
		upl: formatUnits(position.upl, 6),
		isLong: position.isLong,
		fundingTracker: formatUnits(position.fundingTracker, 6),
		timestamp: position.timestamp,
	}

	return position
}

export function formatHistoryItem(item) {
	if (!item) return;
	item = Object.assign({}, item);
	const asset = getLabelForAsset(item.asset);
	let units = asset == 'USDC' ? 6 : 18;
	item.asset = asset;
	item.leverage = item.margin * 1 > 0 ? item.size * 1 / item.margin : 0;
	return item;
}