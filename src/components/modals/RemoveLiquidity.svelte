<script>

	// TODO: this should be replaced by a panel on the pool page
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
	import LabelValue from '@components/layout/LabelValue.svelte'
	
	import { onMount } from 'svelte'

	import { userPoolBalance, poolWithdrawalFee } from '@lib/stores'
	import { removeLiquidity, getPoolWithdrawalFee } from '@api/pool'
	import { focusInput, hideModal } from '@lib/ui'
	import { formatForDisplay } from '@lib/formatters'

	let amount, asset, isSubmitting;

	async function submit() {
		if (!amount) return focusInput('Amount');
		isSubmitting = true;
		const success = await removeLiquidity(asset, amount);
		if (success) hideModal();
		isSubmitting = false;
	}

	onMount(() => {
		getUserPoolBalance();
		getPoolWithdrawalFee();
		focusInput('Amount');
	});

</script>

<style>
	.select-asset a {
		color: var(--text1);
		margin-right: var(--base-padding);
	}
	.select-asset a.active {
		color: var(--primary);
	}
	.note {
		color: var(--text300);
		line-height: 1.418;
		font-size: 80%;
		padding-bottom: 20px;
	}

</style>

<Modal title='Pool Withdraw' width={280}>
	
	<div class='container'>
		
		<form on:submit|preventDefault={submit}>

			<div class="group">
				<Input label='Amount' bind:value={amount} />
			</div>

			<div class="group">
				<LabelValue label='Available' value={formatForDisplay($userPoolBalance)} />
			</div>

			{#if $poolWithdrawalFee}
			<div class='note'>The withdrawal fee is currently {$poolWithdrawalFee}%.</div>
			{/if}

			<div>
				<Button isLoading={isSubmitting} label={`Remove Liquidity`} />
			</div>
			
		</form>

	</div>

</Modal>