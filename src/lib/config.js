export const DEFAULT_LOCALE = 'en-GB';
export const DEFAULT_MARKET = 'ETH-USD';
export const DEFAULT_LEVERAGE = 50;
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const BPS_DIVIDER = 10000;
export const DEFAULT_MARKETS_SORT_KEY = ['market', false];
export const DEFAULT_ORDERS_SORT_KEY = ['orderId', true];
export const DEFAULT_POSITIONS_SORT_KEY = ['timestamp', true];
export const DEFAULT_HISTORY_SORT_KEY = ['timestamp', true];
export const DEFAULT_HISTORY_COUNT = 50;
export const DEFAULT_CHAIN_ID = 42161;
export const CHAINDATA = {
	31337: {
		label: 'localhost',
		explorer: 'http://localhost:8545',
		rpc: 'http://127.0.0.1:8545/',
		currency: '', // USDC
		currencyDecimals: 6, // USDC
		contracts: {
			Cap: '',
			Store: '',
		},
		alchemy: {
			key: 'gDY8gANK8VJAg508BzJbdCpmZ4N43IZP',
			network: 'arbitrum'
		}
	},
	42161: {
		label: 'arbitrum',
		explorer: 'https://arbiscan.io',
		rpc: 'https://arb1.arbitrum.io/rpc', // for walletconnect
		dataEndpoint: 'https://data.cap.io/api',
		dataStore: '0x360B0B2b3391FD65D8279E2231C80D9De767ad7b',
		cap: '0x031d35296154279dc1984dcd93e392b1f946737b',
		assets: {
			ETH: ADDRESS_ZERO,
			USDC: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
			WBTC: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f'
		}
	}
}