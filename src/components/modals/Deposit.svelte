<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { onMount } from 'svelte'

	import { deposit, approveCurrency, getUserAllowance } from '@api/account'
	import { currencyName, allowance, address } from '@lib/stores'
	import { focusInput, hideModal } from '@lib/ui'
	import { getCurrencyInUserWallet } from '@lib/utils'
	import { formatForDisplay } from '@lib/formatters'

	let amount, isSubmitting;

	async function submit() {
		if (!amount) return focusInput('Amount');
		isSubmitting = true;
		const success = await deposit(amount);
		if (success) hideModal();
		isSubmitting = false;
	}

	let userCurrency = 0

	async function getUserCurrency() {
		userCurrency = await getCurrencyInUserWallet($address)
	}

	onMount(() => {
		getUserAllowance();
		getUserCurrency();
		focusInput('Amount');
	});

</script>

<style>
	.available-currency {
		margin-top: -6px;
		margin-bottom: 16px;
		display: flex;
	}
	.available-amount {
		display: flex;
		justify-content: flex-end;
		flex-grow: 1;
	}
</style>

<Modal title='Deposit' width={280}>
	
	<div class='container'>

		<form on:submit|preventDefault={submit}>

		<div class="group">
			<Input label='Amount' bind:value={amount} />
		</div>

		<div class='available-currency'>
			<div>Wallet Balance:</div>
			<div class='available-amount'>{`${formatForDisplay(userCurrency)} ${$currencyName}`}</div>
		</div>

		<div>
			{#if $allowance * 1 <= amount * 1}
			<Button label={`Approve ${$currencyName}`} on:click={approveCurrency} />
			{:else}
			<Button isLoading={isSubmitting} label={`Deposit ${$currencyName}`} />
			{/if}
		</div>

	</form>

	</div>

</Modal>
