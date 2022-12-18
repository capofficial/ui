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
			Trade: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
			Pool: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
			Store: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
		},
		alchemy: {
			key: 'gDY8gANK8VJAg508BzJbdCpmZ4N43IZP',
			network: 'arbitrum',
			wsNetwork: 'arb-mainnet'
		}
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
		}
	}
}
export const CHAINLINK_URL = "https://atlas-postgraphile.public.main.prod.cldev.sh/graphql"
export const CHAINLINK_SCHEMA_NAME = "ethereum-mainnet-arbitrum-1";