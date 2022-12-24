import { get } from 'svelte/store'
import { getContract } from '@lib/contracts'
import { address, positions } from '@lib/stores'
import { formatUnits } from '@lib/formatters'

export async function getUserPositionsWithUpls() {
	const _address = get(address);
	if (!_address) return;
	const contract = getContract({name: 'Trade'});
	const result = await contract.getUserPositionsWithUpls(_address);
	let _positions = []; // [{...position,upl}, ...]
	for (let i = 0; i < result[0].length; i++)
	{
		let _position = {
			market: result[0][i].market,
			user: result[0][i].user,
			timestamp: result[0][i].timestamp,
			size: result[0][i].size,
			price: result[0][i].price,
			margin: result[0][i].margin,
			isLong: result[0][i].isLong,
			fundingTracker: result[0][i].fundingTracker,
			upl: result[1][i]
		}

		_positions.push(_position);
	}
	positions.set(_positions);
}