<script>

	import LabelValue from '@components/layout/LabelValue.svelte'

	export let data;
	export let isSmall = false;

</script>

<style>
	.row {
		display: flex;
		align-items: center;
		height: 38px;
		padding: 0 var(--base-padding);
	}
	.row:nth-child(even) {
		background-color: var(--layer25);
	}

	.small .row {
		font-size: 90%;
		height: 32px;
	}
	.small .row:nth-child(even) {
		background-color: var(--layer0-hover);
	}
	
</style>

<div class='wrapper' class:small={isSmall}>
	{#each data as item}
		<div class='row'>
			<LabelValue label={item.label} value={item.value} note={item.note}/>
		</div>
	{/each}
</div>