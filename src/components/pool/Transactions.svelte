<script>
	import Input from '@components/layout/Input.svelte'
    import { poolWithdrawalFee } from '@lib/stores'

    import { addLiquidity, removeLiquidity } from '@api/pool'
    import { parseUnits } from '@lib/formatters'

    let depositAmount
    let withdrawAmount

</script>

<style>
 .pool-transaction-wrapper {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 20px 20px;
 }

 .add-remove-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-basis: 1fr;
    max-width: 50%;
 }

 .add-remove-title {
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
 }

 .add-remove-desc {
    font-size: 14px;
    color: var(--layer300);
 }

 .button {
		display: flex;
    	justify-content: space-around;
		align-items: center;
		padding: 10px 5px;
    }

.gray {
        background-color: var(--layer200);
        color: white;
    }
.gray:hover {
    background-color: var(--layer300);
}
</style>

<div class='pool-transaction-wrapper'>
    <div class='add-remove-wrapper'>
        <div class='add-remove-title'>Add Liquidity</div>
        <div class='add-remove-desc'>Deposit to earn a portion of trader losses and fees based on your share of the pool.</div>
        <Input label='Deposit' bind:value={depositAmount}></Input>
        <button class='primary button gray' on:click|stopPropagation={() => {addLiquidity(parseUnits(depositAmount, 6))}}>Add Liquidity</button>
        <div class='add-remove-desc'>There are no deposit fees.</div>
    </div>
    <div class='add-remove-wrapper'>
        <div class='add-remove-title'>Remove Liquidity</div>
        <div class='add-remove-desc'>You can withdraw at any time with no cooldown period.</div>
        <Input label='Withdraw' bind:value={withdrawAmount}></Input>
        <button class='primary button gray' on:click|stopPropagation={() => {removeLiquidity(parseUnits(withdrawAmount, 6))}}>Remove Liquidity</button>
        <div class='add-remove-desc'>{$poolWithdrawalFee ? `Withdrawal Fee: ${(100 * $poolWithdrawalFee)}%` : `Withdrawal Fee: ---`}</div>
    </div>
</div>