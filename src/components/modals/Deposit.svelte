<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { onMount } from 'svelte'

	import { deposit, approveCurrency, getUserAllowance } from '@api/account'
	import { currencyName, allowance } from '@lib/stores'
	import { focusInput, hideModal } from '@lib/ui'

	let amount, isSubmitting;

	async function submit() {
		if (!amount) return focusInput('Amount');
		isSubmitting = true;
		const success = await deposit(amount);
		if (success) hideModal();
		isSubmitting = false;
	}

	onMount(() => {
		getUserAllowance();
		focusInput('Amount');
	});

</script>

<style>
</style>

<Modal title='Deposit' width={280}>
	
	<div class='container'>

		<form on:submit|preventDefault={submit}>

		<div class="group">
			<Input label='Amount' bind:value={amount} />
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
