import { ethers } from 'ethers'
import { writable, derived } from 'svelte/store'
import { getUserSetting } from './utils'
import { DEFAULT_LOCALE, DEFAULT_MARKET, DEFAULT_CURRENCY, DEFAULT_LEVERAGE, BPS_DIVIDER, DEFAULT_MARKETS_SORT_KEY, DEFAULT_ORDERS_SORT_KEY, DEFAULT_POSITIONS_SORT_KEY } from './config'

// Language
export const locale = writable(getUserSetting('locale') || DEFAULT_LOCALE);

// Router
export const component = writable();
export const pageName = writable();

// Modal
export const activeModal = writable();

// Error
export const activeError = writable();

// Contracts
export const provider = writable();
export const chainId = writable();
export const signer = writable();
export const address = writable();
export const unsupportedNetwork = writable();

// Account
export const balance = writable();
export const allowance = writable();

// Markets
export const selectedMarket = writable(getUserSetting('selectedMarket') || DEFAULT_MARKET);
export const markets = writable({}); // with prices
export const fundingRate = writable();
export const OILong = writable();
export const OIShort = writable();
export const selectedMarketInfo = derived([markets, selectedMarket], ([$markets, $selectedMarket]) => {
	return $markets[$selectedMarket] || {};
}, {});

// New Order
export const isLong = writable(true);
export const orderType = writable(0);
export const size = writable();
export const price = writable();
export const tpPrice = writable();
export const slPrice = writable();
export const hasTPSL = writable(false);
export const leverage = writable(DEFAULT_LEVERAGE);
export const isReduceOnly = writable(false);
export const submittingOrder = writable(false);

export const buyingPower = derived([balances, leverage, selectedAsset], ([$balances, $leverage, $selectedAsset]) => {
	if (!$selectedAsset || !$balances[$selectedAsset] || !$leverage) return 0;
	return $balances[$selectedAsset] * $leverage;
}, 0);

export const maxSize = derived([balances, leverage, currentFeeRebate, selectedMarketInfo, selectedAsset], ([$balances, $leverage, $currentFeeRebate, $selectedMarketInfo, $selectedAsset]) => {
	if (!$balances[$selectedAsset] || !$selectedMarketInfo) return 0;
	if (!$currentFeeRebate) $currentFeeRebate = 0;

	// console.log('maxSize recalc', $balances[$selectedAsset], $leverage, $currentFeeRebate, $selectedMarketInfo, $selectedAsset);
	// console.log('$leverage', $leverage);
	
	let gasFee = 0;
	if ($selectedAsset == 'ETH') gasFee = 0.002;

	if (!$selectedMarketInfo.fee) return $balances[$selectedAsset] * $leverage * 1 - gasFee;

	const balanceAfterFees = $balances[$selectedAsset] * (1 - $leverage * $selectedMarketInfo.fee / BPS_DIVIDER) - gasFee;

	if (balanceAfterFees < 0) return 0;

	return balanceAfterFees * $leverage * 1;

}, 0);

export const margin = derived([size, leverage], ([$size, $leverage]) => {
	if (!$size || !$leverage) return 0;
	const margin = Math.ceil(10**8 * ($size || 0)) / (10**8 * $leverage);
	return margin;
}, 0);