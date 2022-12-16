<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { onMount } from 'svelte'

	import { withdraw } from '@api/account'
	import { currencyName } from '@lib/stores'
	import { focusInput, hideModal } from '@lib/ui'

	let amount, isSubmitting;

	async function submit() {
		if (!amount) return focusInput('Amount');
		isSubmitting = true;
		const success = await withdraw(amount);
		if (success) hideModal();
		isSubmitting = false;
	}

	onMount(() => {
		focusInput('Amount');
	});

</script>

<style>
</style>

<Modal title='Withdraw' width={280}>
	
	<div class='container'>

		<form on:submit|preventDefault={submit}>

		<div class="group">
			<Input label='Amount' bind:value={amount} />
		</div>

		<div>
			<Button isLoading={isSubmitting} label={`Withdraw ${$currencyName}`} />
		</div>

	</form>

	</div>

</Modal>
