import { ethers } from 'ethers'
import { writable, derived } from 'svelte/store'
import { getUserSetting } from './utils'
import { DEFAULT_LOCALE, DEFAULT_MARKET, DEFAULT_LEVERAGE, BPS_DIVIDER, DEFAULT_MARKETS_SORT_KEY, DEFAULT_ORDERS_SORT_KEY, DEFAULT_POSITIONS_SORT_KEY, DEFAULT_CHAIN_ID } from './config'

// Language
export const locale = writable(getUserSetting('locale') || DEFAULT_LOCALE);

// Currency
export const currencyName = writable();

// Settings
export const showOrdersOnChart = writable(getUserSetting('showOrdersOnChart') == undefined ? false : getUserSetting('showOrdersOnChart'));
export const showPositionsOnChart = writable(getUserSetting('showPositionsOnChart') == undefined ? false : getUserSetting('showPositionsOnChart'));

// Router
export const component = writable();
export const pageName = writable();

// Modal
export const activeModal = writable();

// Toasts
export const toasts = writable([]);

// Error
export const activeError = writable();

// Contracts
export const provider = writable();
export const chainId = writable(getUserSetting('selectedChainId') == undefined ? DEFAULT_CHAIN_ID : getUserSetting('selectedChainId'));
export const signer = writable();
export const address = writable();
export const unsupportedNetwork = writable();

// Account
export const balance = writable(0);
export const allowance = writable(0);
export const lockedMargin = writable(0);
export const upl = writable(0);

export const equity = derived([balance, upl], ([$balance, $upl]) => {
	return $balance * 1 + $upl * 1;
}, 0);
export const freeMargin = derived([equity, lockedMargin], ([$equity, $lockedMargin]) => {
	return $equity - $lockedMargin * 1;
}, 0);
export const marginLevel = derived([equity, lockedMargin], ([$equity, $lockedMargin]) => {
	return $equity * 100 / $lockedMargin * 1;
}, 0);

// Chart
export const chartHeight = writable(getUserSetting('chartHeight') || 320);
export const chartResolution = writable(getUserSetting('chartResolution') || 900)
export const chartLoading = writable(false);
export const hoveredOHLC = writable();
export const tradesHeight = writable(getUserSetting('tradesHeight') || 250);

// Pool
export const poolBalance = writable();
export const bufferBalance = writable();
export const userPoolBalance = writable();
export const poolWithdrawalFee = writable();

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
export const isReduceOnly = writable(false);
export const submittingOrder = writable(false);

export const leverage = derived([selectedMarketInfo], ([$selectedMarketInfo]) => {
	return $selectedMarketInfo?.maxLeverage;
}, DEFAULT_LEVERAGE);

export const maxSize = derived([freeMargin, leverage, selectedMarketInfo], ([$freeMargin, $leverage, $selectedMarketInfo]) => {
	if (!$leverage || !$selectedMarketInfo || !$freeMargin) return 0;
	let ms = $freeMargin * $leverage * (1 - $selectedMarketInfo.fee / BPS_DIVIDER);
	if (ms < 0) ms = 0;
	return ms;
}, 0);

export const margin = derived([size, leverage], ([$size, $leverage]) => {
	if (!$size || !$leverage) return 0;
	const margin = Math.ceil(10**8 * ($size || 0)) / (10**8 * $leverage);
	return margin;
}, 0);

// Orders
export const orders = writable([]);
export const ordersColumnsToShow = writable(getUserSetting('ordersColumnsToShow') || ['timestamp', 'isLong', 'market', 'price', 'size', 'margin', 'orderType', 'isReduceOnly', 'tools']);

// Positions
export const positions = writable([]);
export const positionsColumnsToShow = writable(getUserSetting('positionsColumnsToShow') || ['timestamp', 'isLong', 'market', 'price', 'size', 'margin', 'upl', 'funding', 'liqprice', 'tools']);

// History
export const history = writable([]);
export const historyColumnsToShow = writable(getUserSetting('historyColumnsToShow') || ['timestamp', 'isLong', 'market', 'price', 'size', 'status', 'reason', 'pnl']);
export const lastHistoryItemsCount = writable(0); // how many items were fetched on the last history page requested (used for infinite scroll)
export const historyOrderStatusToShow = writable(getUserSetting('historyOrderStatusToShow') || ['cancelled', 'executed', 'liquidated']);