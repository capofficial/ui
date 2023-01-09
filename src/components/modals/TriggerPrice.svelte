<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'

	import { price, orderType } from '@lib/stores'
	import { hideModal } from '@lib/ui'
  import { PriceLineSource } from 'lightweight-charts';

	function setOrderType(type) {
		orderType.set(type); 
	};

	setOrderType($orderType || 1);

</script>

<style>

.options-container {
	display: flex;
	flex-direction: row;
	margin-bottom: 20px;
	gap:10px;
}

.button {
	padding: 8px 0px 8px 0px;
	text-align: center;
	border-radius: var(--base-radius);
	flex:1;
}

.option {
	background-color: var(--layer200);
	cursor: pointer;
}

.option-selected {
	background-color: var(--layer300);
	pointer-events: none;
}

</style>

<Modal title={'Set Trigger Price'} width={280}>
	
	<div class='container'>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class='options-container'>
	      <div
	        class={$orderType == 1 ? 'button option-selected' : 'button option'}
	        on:click={() => setOrderType(1)}
	      >
	        Limit
	      </div>
	      <div
	        class={$orderType == 2 ? 'button option-selected' : 'button option'}
	        on:click={() => setOrderType(2)}
	      >
	        Stop
	      </div>
		</div>

		<div class="group">
			{#if $orderType === 1}
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
