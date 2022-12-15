<script>
	import { onMount } from 'svelte'

	import { CHECKMARK_CIRCLE_ICON, GEAR_ICON } from '@lib/icons'
	import { checkMetamaskSession, switchChains } from '@lib/connect'
	import { address, unsupportedNetwork } from '@lib/stores'
	import { showModal } from '@lib/ui'
	import { shortAddress } from '@lib/utils'

	onMount(async () => {
		await checkMetamaskSession();
	});

</script>

<style>

	.connect {
		display: flex;
		align-items: center;
	}

	.settings {
		margin-left: 20px;
		display: flex;
		align-items: center;
		color: var(--text0);
	}
	.settings:hover {
		color: var(--text100);
	}
	.settings :global(svg) {
		fill: currentColor;
		height: 20px;
	}

	.address {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		text-align: right;
		white-space: nowrap;
		padding: 8px 16px;
		font-weight: 500;
		border-radius: var(--base-radius);
		background-color: var(--layer1);
	}

	.address :global(svg) {
		fill:  var(--primary);
		height: 16px;
		margin-right: 8px;
	}

	.wrong-network {
		color: var(--secondary);
		padding-right: var(--base-padding);
		white-space: nowrap;
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.wrong-network {
			display: none;
		}
	}

	a.connect {
		color: var(--primary-darkest);
		text-decoration: none;
		padding: 8px 16px;
		border-radius: var(--base-radius);
		transition: all 100ms ease-in-out;
		background-color: var(--primary);
		font-weight: 500;
	}

</style>

<div class='connect'>

	{#if $address}
		{#if $unsupportedNetwork}
		<div class='address wrong-network' on:click={() => {switchChains()}}>
			Wrong Network
		</div>
		{:else}
		<div class='address'>
			{@html CHECKMARK_CIRCLE_ICON}
			{shortAddress($address)}
		</div>
		{/if}

	{:else}
		<a class='connect' on:click|stopPropagation={() => {showModal('Connect')}}>Connect</a>
	{/if}

	<a class='settings' on:click|stopPropagation={() => {showModal('Settings')}}>{@html GEAR_ICON}</a>
</div>