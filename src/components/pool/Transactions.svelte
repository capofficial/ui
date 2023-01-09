<script>
	import Input from '@components/layout/Input.svelte'
    import Button from '@components/layout/Button.svelte'

    import { poolWithdrawalFee } from '@lib/stores'

    import { addLiquidity, removeLiquidity } from '@api/pool'
    import { parseUnits } from '@lib/formatters'

    import { approveCurrency, getUserAllowance } from '@api/account'
    import { currencyName, allowance, address } from '@lib/stores'

    let depositAmount
    let withdrawAmount

    $: getUserAllowance($address);

</script>

<style>
 .pool-transaction-wrapper {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding: 20px;
 }

 .add-remove-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
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

 button {
	display: flex;
    justify-content: space-around;
	align-items: center;
	padding: 10px 5px;
}

</style>

<div class='pool-transaction-wrapper'>
    <div class='add-remove-wrapper'>
        <div class='add-remove-title'>Add Liquidity</div>
        <div class='add-remove-desc'>Deposit to earn a portion of trader losses and fees based on your share of the pool.</div>
        <Input label={`Amount (${$currencyName})`} bind:value={depositAmount} />
        {#if $allowance * 1 <= depositAmount * 1}
            <Button label={`Approve ${$currencyName}`} on:click={approveCurrency} />
        {:else}
            <Button label={`Add Liquidity`} on:click={() => {addLiquidity(parseUnits(depositAmount, 6))}} />
        {/if}
        <div class='add-remove-desc'>There are no deposit fees.</div>
    </div>
    <div class='add-remove-wrapper'>
        <div class='add-remove-title'>Remove Liquidity</div>
        <div class='add-remove-desc'>You can withdraw at any time with no cooldown period.</div>
        <Input label={`Amount (${$currencyName})`} bind:value={withdrawAmount} />
        <button class='primary button' on:click|stopPropagation={() => {removeLiquidity(parseUnits(withdrawAmount, 6))}}>Remove Liquidity</button>
        <div class='add-remove-desc'>{$poolWithdrawalFee ? `Withdrawal Fee: ${(100 * $poolWithdrawalFee)}%` : `Withdrawal Fee: ---`}</div>
    </div>
</div>