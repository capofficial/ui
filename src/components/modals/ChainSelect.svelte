<script>
	import Modal from './Modal.svelte'
    import { chainId, provider } from '@lib/stores'
    import { CHAINDATA } from '@lib/config'
    import { switchChains } from '@lib/connect'
    import { saveUserSetting } from '@lib/utils'
    import { CHECKMARK_CIRCLE_ICON } from '@lib/icons'

    async function changeChains(chain) {

        await switchChains(chain)

    }

</script>

<style>

	.row {
		display: flex;
		align-items: center;
		padding: 0 var(--base-padding);
		border-bottom: 1px solid var(--layer2);
		font-weight: 500;
		cursor: pointer;
		height: 54px;
        justify-content: space-between;
	}
	.row:not(.active):hover {
		background-color: var(--layer1dot5);
	}
	.row:last-child {
		border-bottom: none;
	}

	.row img {
		max-width: 36px;
		margin-right: 20px;
	}

    .row :global(svg) {
		fill:  var(--primary);
		height: 16px;
		margin-right: 8px;
	}

    .selected {
        background-color: var(--layer2);
        pointer-events: none;
    }

    .selected:not(.active):hover {
		background-color: var(--layer2);
	}

</style>

<Modal title='Select Chain' width={300}>
	
    {#each Object.values(CHAINDATA) as chain}
        {#if $chainId == parseInt(chain.chainId)}
            <div class='row selected'>
                <div>{chain.chainName}</div>
                {@html CHECKMARK_CIRCLE_ICON}
            </div>
        {:else}
            <div class='row' on:click|stopPropagation={() => changeChains(chain.chainId)}>
                <div>{chain.chainName}</div>
            </div>
        {/if}
    {/each}

</Modal>
