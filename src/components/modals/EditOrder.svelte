<script>
	import { onMount } from 'svelte'
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
	import { updateOrder } from '@api/orders'
    import { focusInput, hideModal } from '@lib/ui'

	export let data;

    let newOrderPrice
    let isSubmitting

	onMount(() => {
		focusInput('New Price');
	});

    async function submitNewPrice() {
        if (!newOrderPrice) return focusInput('New Price');
        isSubmitting = true
        const success = await updateOrder(data.orderId, newOrderPrice)
        if (success) hideModal();
        isSubmitting = false
    }

</script>

<style>

	.container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

</style>

<Modal title='Edit Order Price' width={300}>
	<form on:submit|preventDefault={submitNewPrice}>
        <div class='container'>
            <Input label={'New Price'} bind:value={newOrderPrice} />
            <Button isSmall={true} isLoading={isSubmitting} label={`Change Order Price`} />
        </div>
    </form>
</Modal>