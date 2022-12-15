<script>
	import { activeModal } from '@lib/stores'

	import Connect from '../modals/Connect.svelte'
	import CustomizeColumns from '../modals/CustomizeColumns.svelte'
	import ClosePosition from '../modals/ClosePosition.svelte'
	import AddLiquidity from '../modals/AddLiquidity.svelte'
	import RemoveLiquidity from '../modals/RemoveLiquidity.svelte'
	import MarketInfo from '../modals/MarketInfo.svelte'
	import HistoryOrderStatus from '../modals/HistoryOrderStatus.svelte'
	import Settings from '../modals/Settings.svelte'

</script>

{#if $activeModal && $activeModal.name == 'Settings'}
<Settings />
{/if}

{#if $activeModal && $activeModal.name == 'Connect'}
<Connect />
{/if}

{#if $activeModal && $activeModal.name == 'CustomizeColumns'}
<CustomizeColumns data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'ClosePosition'}
<ClosePosition data={$activeModal.data} />
{/if}

{#if $activeModal && $activeModal.name == 'AddLiquidity'}
<AddLiquidity />
{/if}

{#if $activeModal && $activeModal.name == 'Withdraw'}
<RemoveLiquidity />
{/if}

{#if $activeModal && $activeModal.name == 'HistoryOrderStatus'}
<HistoryOrderStatus />
{/if}

{#if $activeModal && $activeModal.name == 'MarketInfo'}
<MarketInfo data={$activeModal.data} />
{/if}