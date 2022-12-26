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
export const DEFAULT_CHAIN_ID = 31337;
export const CHAINDATA = {
	31337: {
		label: 'localhost',
		explorer: 'http://localhost:8545',
		rpc: 'http://127.0.0.1:8545/',
		currencyName: 'USDC',
		currencyAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // USDC address
		currencyDecimals: 6, // USDC
		contracts: {
			Trade: '0x5067457698Fd6Fa1C6964e416b3f42713513B3dD',
			Pool: '0x18E317A7D70d8fBf8e6E893616b52390EbBdb629',
			Store: '0xe8D2A1E88c91DCd5433208d4152Cc4F399a7e91d',
		},
		alchemy: {
			key: 'gDY8gANK8VJAg508BzJbdCpmZ4N43IZP',
			network: 'arbitrum',
			wsNetwork: 'arb-mainnet'
		},
		chainlinkSchema: "ethereum-mainnet-arbitrum-1"
	},
	42161: {
		label: 'arbitrum',
		explorer: 'https://arbiscan.io',
		rpc: 'https://arb1.arbitrum.io/rpc', // for walletconnect
		currencyName: 'USDC',
		currencyAddress: '', // USDC address
		currencyDecimals: 6, // USDC
		contracts: {
			Trade: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
			Pool: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
			Store: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
		},
		alchemy: {
			key: 'gDY8gANK8VJAg508BzJbdCpmZ4N43IZP',
			network: 'arbitrum',
			wsNetwork: 'arb-mainnet'
		},
		chainlinkSchema: "ethereum-mainnet-arbitrum-1"
	}
}
export const CHAINLINK_URL = "https://atlas-postgraphile.public.main.prod.cldev.sh/graphql"