// Error strings

const DEFAULT_ERROR = "Unidentified error. Check browser console or show details for more.";

const ERROR_STRINGS = {
	'user denied': null,
	'user rejected': null,
	'insufficient balance': "You have insufficient funds to complete this transaction.",
	'exceeds balance': "You have insufficient funds to complete this transaction.",
	'allowance': "You have to approve spending this ERC20 before depositing.",
	'!paused': 'New orders and/or deposits are currently paused.',
	'!tp-invalid': 'The TP price is not valid.',
	'!sl-invalid': 'The SL price is not valid.',
	'!tpsl-invalid': 'The TP/SL prices are not valid.',
	'!order-type': 'The order type is not valid.',
	'!price': 'Price is required.',
	'!asset': 'This asset is not supported.',
	'!min-size': 'The order size is below the minimum size (about $10 or 0.01 ETH).',
	'!market-exists': 'This market does not exist.',
	'!market-closed': 'This market is currently closed.',
	'!banned-user': 'This address is banned from submitting orders.',
	'!expiry-value': 'The expiry value is invalid.',
	'!user-oco': 'The OCO must be the order ID of an order under your account.',
	'!reduce-only': 'This market is currently accepting only reduce-only orders.',
	'!margin': 'Order margin is invalid.',
	'!min-leverage': 'Leverage must be at least 1.',
	'!max-leverage': 'Leverage exceeds the maximum allowed on this market.',
	'!order': 'The order does not exist.',
	'!pool-balance': 'Not enough balance is available in the pool.',
	'!amount': 'Amount is invalid.',
	'!position': 'Position not found.',
	'!upl': 'Unrealized P/L is not enough to cover margin removal.',
	'!market-risk': 'The market risk threshold / profit limit has been reached.',
	'!pool-risk': 'The pool risk threshold / profit limit has been reached.',
	'gas': "Insufficient funds or gas. Deposit more funds into your wallet or try adjusting the gas limit.",
	'nonce': 'Invalid transaction nonce. Please try again or try resetting your Metamask account.',
	'insufficienttxfunds': "You don't have enough funds to complete this transaction."
};

export function parseError(e) {
	console.log('e', typeof(e), e);
	if (!e) return DEFAULT_ERROR;
	if (typeof(e) == 'string') return e;
	let error_string = '';
	if (e.data && e.data.message) {
		error_string = e.data.message;
	} else if (e.message) {
		error_string = e.message;
	} else {
		return DEFAULT_ERROR;
	}
	error_string = error_string.toLowerCase();
	for (const key in ERROR_STRINGS) {
		if (error_string.includes(key)) return ERROR_STRINGS[key];
	}
	console.error(e);
	return DEFAULT_ERROR;
}
