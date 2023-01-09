<script>

	/* TODOS
	ok - home page
	ok - set page title on routing and price change
	ok - fix console error
	ok - markets modal height
	ok - show orders count on first load
	ok - add account tooltips
	*/

	import { onMount } from 'svelte'

	import Modals from '@components/layout/Modals.svelte'
	import Errors from '@components/layout/Errors.svelte'
	import Toasts from '@components/layout/Toasts.svelte'
	import Header from '@components/header/Header.svelte'

	import { loadRoute, catchLinks, navigateTo } from '@lib/routing'
	import { component, address, pageName } from '@lib/stores'
	import { hidePopoversOnKeydown, hidePopoversOnClick } from '@lib/ui'
	import { runAndInterval } from '@lib/utils'

	import { listenToEvents } from '@api/listener'
	import { getMarketsWithPrices } from '@api/markets'

	onMount(async () => {
		loadRoute();
		catchLinks((path) => navigateTo(path));
		window.onpopstate = () => loadRoute();
		runAndInterval(getMarketsWithPrices, 10 * 1000);
	});

	// Listener
	$: listenToEvents($address);

</script>

<style>

	:global(:root) {

		/*Principles:  
			https://material.io/design/color/dark-theme.html
			https://developer.apple.com/design/human-interface-guidelines/foundations/color/
		*/

		color-scheme: dark;

		--container-width: 800px;

		--base-padding: 20px;
		--base-radius: 6px;
		--semi-padding: calc(var(--base-padding)/2);
		--header-height: 75px;
		--sidebar-width: 320px;
		--ticker-height: 60px;

		/* Layers (gray), from darkest to lightest */
		--layerDark: rgb(25, 29, 32);
		--layer0: rgb(29,34,38);
		--layer25: #222322;
		--layer50: rgb(36,41,46);
		--layer100: #333433;
		--layer200: #494a49;
		--layer300: #606160;
		--layer400: #777777;
		--layer500: #8e8e8e;

		/* Text (white), from lightest to darkest */
		--text0: #ffffff;
		--text100: #e6e6e6;
		--text200: #cccccc;
		--text300: #b3b3b3;
		--text400: #999999;
		--text500: #808080;


		/* Brand */

		--primary: rgba(50,209,53,1.00);
		--primary-highlighted: rgba(50,209,53,0.1);
		--primary-active: rgba(50,209,53,0.75);
		--primary-hover: rgba(50,209,53,0.94);
		--primary-darkest: #121212;

		--secondary: rgba(248,76,32,1.00);
		--secondary-highlighted: rgba(248,76,32,0.1);
		--secondary-active: rgba(248,76,32,0.72);
		--secondary-hover: rgba(248,76,32,0.91);
		--secondary-darkest: #121212;

		--error: orange;
		--error-lighter: #FFC099;
		--error-light: #FF9E61;
		--error-dark: #291000;
		--error-border: #FF680A;

		--accent: blue; /*neutral, can be used for info, etc.*/



		/* Old below */


		--layer0dot5: #2b2d2f;
		--layer0-hover: rgb(36,38,40);
		--layer1: #36383a;
		--layer1-hover: rgb(52,52,58);

		--layer1dot5: rgb(48,48,50);
		--layer2: #4d4e50;
		--layer3: #636466;
		--layer4: #797a7c;
		--layer4dot5: rgb(115,115,119);
		--layer5: rgb(142,142,147);
		--layer6: rgb(174,174,178);
		--layer7: rgb(199,199,204);
		--layer8: rgb(209,209,214);
		--layer9: rgb(229,229,234);

		/* Texts from lightest to darkest */

		--text0-hover: rgba(255,255,255,0.85);
		--text1: rgb(182,182,187);
		--text1-hover: rgba(182,182,187,0.85);
		--text1-alt: rgb(122,122,137);

		--text05: rgba(255,255,255,0.85);
		--text005: rgba(255,255,255,0.65);
		
		--text2: rgb(90,90,94);
		--text3: rgb(64,64,68);

		

	}

	:global(html) {
		color: var(--text0);
		background-color: var(--layer0);
	}

	:global(.green) {
		color: var(--primary);
	}
	:global(.red) {
		color: var(--secondary);
	}
	:global(.orange) {
		color: rgb(253,167,20);
	}

	:global(.container) {
		padding: var(--base-padding);
	}
	:global(.group) {
		padding-bottom: var(--base-padding);
	}
	:global(.semi-padding-bottom) {
		padding-bottom: var(--semi-padding);
	}

	/*Tippy Tooltip*/
	:global(.tippy-box[data-theme~='cap']) {
		background-color: var(--layer200);
		color: var(--text0);
		font-weight: 400;
		font-size: 14px;
	}
	:global(.tippy-box[data-theme~='cap'][data-placement^='top'] > .tippy-arrow::before) {
	  border-top-color: var(--layer200);
	}
	:global(.tippy-box[data-theme~='cap'][data-placement^='bottom'] > .tippy-arrow::before) {
	  border-bottom-color: var(--layer200);
	}
	:global(.tippy-box[data-theme~='cap'][data-placement^='left'] > .tippy-arrow::before) {
	  border-left-color: var(--layer200);
	}
	:global(.tippy-box[data-theme~='cap'][data-placement^='right'] > .tippy-arrow::before) {
	  border-right-color: var(--layer200);
	}

	.code-check {
		padding: 25px;
	}
	.note {
		padding: 25px;
		max-width: 440px;
		line-height: 1.318;
	}
	input {
		width: 120px;
		box-sizing: border-box;
		margin-bottom: 10px;
		font-size: inherit;
		padding: 4px 10px;
	}
	button {
		padding: 4px 10px;
		width: 120px;
	}
	:global(button.primary, button.secondary) {
		padding: 0 var(--base-padding);
		height: 42px;
		border-radius: var(--base-radius);
		font-weight: 600;
		color: var(--primary-darkest);
		background-color: var(--primary);
		white-space: nowrap;
		font-size: 95%;
	}
	:global(button.secondary) {
		background-color: var(--secondary);
		color: var(--secondary-darkest);
	}
	:global(.buttons) {
		display: flex;
		justify-content: space-around;
	}

</style>

<svelte:window on:keydown={hidePopoversOnKeydown} on:click={hidePopoversOnClick} />

{#if $pageName != 'Home'}

<Errors />
<Modals />
<Toasts />
<Header />
{/if}

<svelte:component this={$component}/>