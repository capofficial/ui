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
	let i = 0;
	for (let position of result[0]) {
		position.upl = formatUnits(result[1][i]);
		_positions.push(position);
        i++;
	}
	positions.set(_positions);
}