<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { price, orderType } from '@lib/stores'
	import { hideModal } from '@lib/ui'

	function setOrderType(type) {
		orderType.set(type); 
	};

</script>

<style>
</style>

<Modal title='Set Trigger Price' width={280}>
	
	<div class='container'>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div>
			
			<div
	        class={"item"}
	        class:selected={$orderType == 0}
	        on:click={() => setOrderType(0)}
	      >
	        Market
	      </div>
	      <div
	        class={"item"}
	        class:selected={$orderType == 1}
	        on:click={() => setOrderType(1)}
	      >
	        Limit
	      </div>
	      <div
	        class={"item"}
	        class:selected={$orderType == 2}
	        on:click={() => setOrderType(2)}
	      >
	        Stop
	      </div>
		</div>

		<div class="group">
			{#if $orderType === 0}
				<Input label={'Price'} value='Market Price' disabled="true" />
			{:else if $orderType === 1}
				<Input label={'Limit Price'} bind:value={$price}/>
			{:else if $orderType === 2}
				<Input label={'Stop Price'} bind:value={$price}/>
	        {/if}
		</div>

		<div>
			<Button label={`Done`} on:click={hideModal} />
		</div>

	</div>

</Modal>
