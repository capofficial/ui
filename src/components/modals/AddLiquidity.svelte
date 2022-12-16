<script>

	// TODO: this should be replaced by a panel on the pool page
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { onMount } from 'svelte'

	import { addLiquidity, getPoolWithdrawalFee } from '@api/pool'
	import { approveCurrency, getUserAllowance } from '@api/account'
	import { currencyName, allowance, poolWithdrawalFee } from '@lib/stores'
	import { focusInput, hideModal } from '@lib/ui'

	let amount, isSubmitting;

	async function submit() {
		if (!amount) return focusInput('Amount');
		isSubmitting = true;
		const success = await addLiquidity(amount);
		if (success) hideModal();
		isSubmitting = false;
	}

	onMount(() => {
		getUserAllowance();
		getPoolWithdrawalFee();
		focusInput('Amount');
	});

</script>

<style>
	.note {
		color: var(--text300);
		line-height: 1.418;
		font-size: 80%;
		padding-bottom: 20px;
	}
</style>

<Modal title='Add Liquidity' width={280}>
	
	<div class='container'>

		<form on:submit|preventDefault={submit}>

		<div class="group">
			<Input label='Amount' bind:value={amount} />
		</div>
		
		<div class='note'>There are no deposit fees.{#if $poolWithdrawalFee} The withdrawal fee is currently {$poolWithdrawalFee}%.{/if}</div>

		<div>
			{#if $allowance * 1 <= amount * 1}
			<Button label={`Approve ${$currencyName}`} on:click={approveCurrency} />
			{:else}
			<Button isLoading={isSubmitting} label={`Add Liquidity`} />
			{/if}
			
		</div>

	</form>

	</div>

</Modal>
