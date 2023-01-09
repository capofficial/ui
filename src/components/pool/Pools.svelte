<script>

    import Button from '@components/layout/Button.svelte'

    import { poolBalance, bufferBalance, userPoolBalance } from '@lib/stores'
    import { formatForDisplay } from '@lib/formatters'


</script>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 20px;
        gap: 15px;
    }

    .balance-title {
		font-weight: 300;
		font-size: 16px;
    }

    .balance-amount {
		font-weight: 500;
		font-size: 24px;
    }
</style>


<div class='wrapper'>
    <div class='balance-wrapper'>
        <div class='balance-title'>
            Pool Balance
        </div>
        <div class='balance-amount'>
            ${formatForDisplay($poolBalance)}
        </div>
    </div>
    <div class='balance-wrapper'>
        <div class='balance-title'>
            Buffer Balance
        </div>
        <div class='balance-amount'>
            ${formatForDisplay($bufferBalance)}
        </div>
    </div>
    <div class='balance-wrapper'>
        <div class='balance-title'>
            Your Balance
        </div>
        <div class='balance-amount'>
            {#if $userPoolBalance == null}
                $0
            {:else}
                ${formatForDisplay($userPoolBalance)}
            {/if}
        </div>
    </div>
</div>