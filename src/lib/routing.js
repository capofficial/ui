import { get } from 'svelte/store'

import Home from '@components/home/Home.svelte'
import Trade from '@components/trade/Trade.svelte'
import Pool from '@components/pool/Pool.svelte'

import { component, pageName, selectedMarket } from './stores'
import { setPageTitle } from './ui'
import { saveUserSetting } from './utils'

const PAGES = {
	'Home': {
		component: Home,
		paths: ['']
	},
	'Trade': {
		component: Trade,
		paths: ['trade']
	},
	'Pool': {
		component: Pool,
		paths: ['pool']
	}
};

async function setMarket(market) {
	selectedMarket.set(market);
	saveUserSetting('selectedMarket', market);
}

export function loadRoute(path) {

	if (!path) path = location.pathname;

	const pathParts = path.split('/');

	const primaryPath = pathParts[1];
	const secondaryPath = pathParts[2];
	
	for (const page in PAGES) {
		
		const pageDetails = PAGES[page];

		if (pageDetails.paths.includes(primaryPath)) {
			component.set(pageDetails.component);
			setPageTitle(page);
			pageName.set(page);

			if (primaryPath == 'trade') {
				if (secondaryPath) {
					// secondaryPath is a market id, load it
					setMarket(secondaryPath);
				} else {
					// set the current market id in the path
					const pid = get(selectedMarket);
					history.replaceState(null, null, `trade/${pid}`);
					setMarket(pid);
				}
			}

			return;
		}

	}

}

export function navigateTo(path) {
    history.pushState(null, null, path);
    loadRoute(path);
}

export function catchLinks(cb) {

	window.addEventListener('click', (ev) => {

		if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) return true;
		
		let anchor = null;
		for (let n = ev.target; n.parentNode; n = n.parentNode) {
			if (n.nodeName === 'A') {
				anchor = n;
				break;
			}
		}

		if (!anchor) return true;
		
		let href = anchor.getAttribute('href');
		
		if (!href || href && href.includes('http')) return true;
		
		ev.preventDefault();
		
		cb(href);

		return false;

	});

}