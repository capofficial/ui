import { BPS_DIVIDER } from '@lib/config'
import { getContract } from '@lib/contracts'
import { markets, fundingRate, OILong, OIShort } from '@lib/stores'
import { formatUnits } from '@lib/formatters'
import { CHAINLINK_URL, CHAINLINK_SCHEMA_NAME } from '../lib/config';

export async function getMarketsWithPrices() {
	const contract = getContract({name: 'Trade'});
	const result = await contract.getMarketsWithPrices();
	let _markets = {}; // symbol => {market info, price}
	let i = 0;
	for (let marketInfo of result[0]) {
		marketInfo = Object.assign({}, marketInfo);
		marketInfo.price = result[1][i];
		_markets[marketInfo.symbol] = marketInfo;
        i++;
	}
	markets.set(_markets);
}

export async function getFundingRate(market) {
	const contract = getContract({name: 'Trade'});
	fundingRate.set(formatUnits(await contract.getAccruedFunding(market, 1), 18) / BPS_DIVIDER);
}

export async function getOI(market) {
	const contract = getContract({name: 'Store'});
	OILong.set(formatUnits(await contract.getOILong(market)));
	OIShort.set(formatUnits(await contract.getOIShort(market)));
}

export async function getChainlinkPriceHistory(contractAddress) {
	try {
		const response = await fetch(CHAINLINK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query PriceHistoryQuery($schemaName: String!, $contractAddress: String!) {
						priceHistory(schemaName: $schemaName, contractAddress: $contractAddress) {
						nodes {
							id
							latestAnswer
							blockNumber
						}
						}
					}
				`,
				variables: {
					schemaName: CHAINLINK_SCHEMA_NAME,
					contractAddress: contractAddress
				}
			})
		});
		const json = await response.json();
		const price = json?.data
		return price;
	} catch (e) {
		console.error('/getChainlinkPriceHistory', e);
	}
}