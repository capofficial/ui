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
			Trade: '0x742489F22807ebB4C36ca6cD95c3e1C044B7B6c8',
			Pool: '0x1D8D70AD07C8E7E442AD78E4AC0A16f958Eba7F0',
			Store: '0x666D0c3da3dBc946D5128D06115bb4eed4595580',
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
			Trade: '0x22a9B82A6c3D2BFB68F324B2e8367f346Dd6f32a',
			Pool: '0x547382C0D1b23f707918D3c83A77317B71Aa8470',
			Store: '0x1343248Cbd4e291C6979e70a138f4c774e902561',
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
export const CHAINLINK_CONTRACT_ADDRESSES = {
	'BTC-USD': "0x942d00008d658dbb40745bbec89a93c253f9b882",
	'ETH-USD': "0x3607e46698d218b3a5cae44bf381475c0a5e2ca7"
}

export const HISTORY_URL = "http://localhost:8000/subgraphs/name/cap-subgraph"