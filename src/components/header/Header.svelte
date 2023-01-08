<script>
	import Logo from './Logo.svelte'
	import Nav from './Nav.svelte'
	import Connect from './Connect.svelte'
</script>


<style>
	header {
		display: flex;
		flex-direction: row;
		padding: var(--base-padding);
		align-items: center;
		justify-content: space-between;
		max-width: var(--container-width);
		margin: 0 auto;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>

<header>
	<div class='left'>
		<Logo />
		<Nav />
	</div>
	<div class='right'>
		<Connect />
	</div>
</header>