import { BPS_DIVIDER } from '@lib/config'
import { getContract } from '@lib/contracts'
import { markets, fundingRate, OILong, OIShort } from '@lib/stores'
import { formatUnits } from '@lib/formatters'

export async function getMarketsWithPrices() {
	const contract = getContract({name: 'Cap'});
	const result = await contract.getMarketsWithPrices();
	let _markets = {}; // symbol => {market info, price}
	let i = 0;
	for (let marketInfo of result[0]) {
		marketInfo.price = result[1][i];
		_markets[marketInfo.symbol] = marketInfo;
        i++;
	}
	markets.set(_markets);
}

export async function getFundingRate(market) {
	const contract = getContract({name: 'Cap'});
	fundingRate.set(formatUnits(await contract.getAccruedFunding(market, 1), 18) / BPS_DIVIDER);
}

export async function getOI(market) {
	const contract = getContract({name: 'Store'});
	OILong.set(formatUnits(await contract.getOILong(market)));
	OIShort.set(formatUnits(await contract.getOIShort(market)));
}