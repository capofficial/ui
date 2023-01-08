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
			key: 'testkey',
			network: 'testnetwork',
			wsNetwork: 'ws://localhost:8545/'
		},
		chainlinkSchema: "ethereum-mainnet-arbitrum-1",
		subgraphUrl: "http://localhost:8000/subgraphs/name/cap-subgraph",
		chainName: "Local Testnet",
		chainId: '0x7A69', //chainId number in hexadecimal prefixed by 0x 
		nativeAssetName: "GO",
		nativeAssetSymbol: "GO",
		nativeAssetDecimals: 18,
	},
	42161: {
		label: 'arbitrum',
		explorer: 'https://arbiscan.io',
		rpc: 'https://arb1.arbitrum.io/rpc', // for walletconnect
		currencyName: 'USDC',
		currencyAddress: '', // USDC address
		currencyDecimals: 6, // USDC
		contracts: {
			Trade: '0x0000000000000000000000000000000000000000',
			Pool: '0x0000000000000000000000000000000000000000',
			Store: '0x0000000000000000000000000000000000000000',
		},
		alchemy: {
			key: 'gDY8gANK8VJAg508BzJbdCpmZ4N43IZP',
			network: 'arbitrum',
			wsNetwork: 'arb-mainnet'
		},
		chainlinkSchema: "ethereum-mainnet-arbitrum-1",
		subgraphUrl: "http://localhost:8000/arbitrum-subgraph",
		chainName: 'Arbitrum One',
		chainId: '0xA4B1', //chainId number in hexadecimal prefixed by 0x
		nativeAssetName: 'ETH',
		nativeAssetSymbol: 'ETH',
		nativeAssetDecimals: 18,
	},
}
export const CHAINLINK_URL = "https://atlas-postgraphile.public.main.prod.cldev.sh/graphql"
export const CHAINLINK_CONTRACT_ADDRESSES = {
	'BTC-USD': "0x942d00008d658dbb40745bbec89a93c253f9b882",
	'ETH-USD': "0x3607e46698d218b3a5cae44bf381475c0a5e2ca7"
}