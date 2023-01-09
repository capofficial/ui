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
		currencyName: 'USDC',
		currencyAddress: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f', // USDC address
		currencyDecimals: 6, // USDC
		contracts: {
			Trade: '0x09635F643e140090A9A8Dcd712eD6285858ceBef',
			Pool: '0xc5a5C42992dECbae36851359345FE25997F5C42d',
			Store: '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F',
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
		rpc: 'https://rpc.ankr.com/arbitrum', // for walletconnect
		currencyName: 'USDC',
		currencyAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // USDC address
		currencyDecimals: 6, // USDC
		contracts: {
			Trade: '0x64132d85842f1A88A086D173CB66A66931963622',
			Pool: '0x79Dd91477F63f7dB5DDf70DF9C3ff375EE8D1c71',
			Store: '0xf16033d20ADDa47Dc99eA291D0F4C4FeF2fF47af',
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