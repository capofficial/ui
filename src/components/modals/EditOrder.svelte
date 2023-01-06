<script>
	import { onMount } from 'svelte'
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
	import { updateOrder } from '@api/orders'
    import { focusInput } from '@lib/ui'

	export let data;

    let newOrderPrice
    let isSubmitting = false

	onMount(() => {
		focusInput('New Price');
	});

    async function submitNewPrice() {
        isSubmitting = true
        const success = await updateOrder(data.orderId, newOrderPrice)
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
            <Input label={'New Price'} isLoading={isSubmitting} bind:value={newOrderPrice} />
            <Button isSmall={true} label={`Change Order Price`} />
        </div>
    </form>
</Modal>