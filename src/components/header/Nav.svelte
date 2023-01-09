<script>

	import { pageName } from '@lib/stores'

</script>


<style>

	img {
		height: 22px;
		margin-right: 12px;
		
	}

	.nav {
		display: flex;
		align-items: center;
		grid-gap: 8px;
		gap: 12px;
	}

	a {
		color: var(--text0);
		text-decoration: none;
		padding: 8px 12px;
		border-radius: var(--base-radius);
		transition: all 100ms ease-in-out;
	}
	a:hover  {
		background-color: var(--layer1);
	}
	 a.active {
	 	font-weight: 600;
	 	color: var(--primary);
		background-color: var(--primary-highlighted);
	}

</style>

<div class='nav'>
	<a class:active={$pageName == 'Trade'} href='/trade'>Trade</a>
	<a class:active={$pageName == 'Pool'} href='/pool'>Pool</a>
</div>

