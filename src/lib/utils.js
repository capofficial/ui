import { get } from 'svelte/store'

import { CHAINDATA } from './config'
import { chainId } from './stores'

export function hashString(_string) {
  var hash = 0,
    i, chr;
  if (_string.length === 0) return hash;
  for (i = 0; i < _string.length; i++) {
    chr = _string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


export function shortAddress(address) {
	if (!address) return;
	return address.substring(0,5) + '…' + address.slice(-4);
}

export function getUserSetting(key) {
	const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
	return userSettings[key];
}

export function saveUserSetting(key, value) {
	let userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
	userSettings[key] = value;
	localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

export function getPrecision(num) {
	num = num * 1;
	if (!num || isNaN(num) || Number.isInteger(num)) {
		return 0;
	}
	return num.toString().split('.')[1].length;
}

export function runAndInterval(method, interval) {
	method();
	const i1 = setInterval(method, interval);
	return i1;
}

export function getChainData(key) {
	const _chainId = get(chainId);
	if (!_chainId || !CHAINDATA[_chainId]) return;
	return CHAINDATA[_chainId][key];
}