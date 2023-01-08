<script>
	import { activeModal } from '@lib/stores'

	import Connect from '../modals/Connect.svelte'
	import ClosePosition from '../modals/ClosePosition.svelte'
	import Deposit from '../modals/Deposit.svelte'
	import Withdraw from '../modals/Withdraw.svelte'
	import MarketInfo from '../modals/MarketInfo.svelte'
	import EditOrder from '../modals/EditOrder.svelte'
	import HistoryDetails from '../modals/HistoryDetails.svelte'
	import ChainSelect from '../modals/ChainSelect.svelte'
	import TriggerPrice from '../modals/TriggerPrice.svelte'
	import TPSL from '../modals/TPSL.svelte'
	import Markets from '../modals/Markets.svelte'

</script>

{#if $activeModal && $activeModal.name == 'Connect'}
<Connect />
{/if}

{#if $activeModal && $activeModal.name == 'ClosePosition'}
<ClosePosition data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'Deposit'}
<Deposit />
{/if}

{#if $activeModal && $activeModal.name == 'Withdraw'}
<Withdraw />
{/if}

{#if $activeModal && $activeModal.name == 'MarketInfo'}
<MarketInfo data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'EditOrder'}
<EditOrder data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'HistoryDetails'}
<HistoryDetails data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'ChainSelect'}
<ChainSelect />
{/if}

{#if $activeModal && $activeModal.name == 'TriggerPrice'}
<TriggerPrice />
{/if}

{#if $activeModal && $activeModal.name == 'TPSL'}
<TPSL />
{/if}

{#if $activeModal && $activeModal.name == 'Markets'}
<Markets />
{/if}