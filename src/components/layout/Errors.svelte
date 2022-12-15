<script>
	import { activeError } from '@lib/stores'

	import Error from './Error.svelte'

</script>

{#if $activeError && $activeError.message}
<Error message={$activeError.message} rawError={$activeError.rawError} />
{/if}