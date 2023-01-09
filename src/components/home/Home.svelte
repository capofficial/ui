
<script>
	const d = new Date();
	let year = d.getFullYear();
</script>

<style>
	.home {
		font-size: 20px;
		padding: 0 var(--base-padding);
		margin: 0 auto;
		max-width: 800px;
	}

	a {
	  cursor: pointer;
	  text-decoration: none;
	  color: var(--primary);
	}
	header {
	  padding-top: 100px;
	}

	header img {
	  height: 64px;
	}

	h1,h2,h3,h4,h5 {
	  margin: 0;
	  padding: 0;
	  font-weight: normal;
	}

	h1 {
	  line-height: 1.218;
	  font-size: 36px;
	  font-weight: 600;
	  letter-spacing: -0.045em;
	  margin-bottom: 64px;
	  margin-top: 16px;
	}

	.button-wrapper {
	  margin-bottom: 32px;
	}
	.button {
	  display: inline-block;
	  padding: 16px 32px;
	  border-radius: 50px;
	  font-weight: 650;
	  color: var(--primary-darkest);
	  background-color: var(--primary);
	  white-space: nowrap;
	  font-size: 110%;
	}

	section {
	  margin-bottom: 64px;
	}
	section.dark {
	  background-color: #111;
	  color: #fff;
	  padding: 20px 30px;
	  border-radius: 12px;
	}

	p, li {
	  line-height: 1.618;
	}

	h2 {
	  font-size: 32px;
	  line-height: 1.618;
	}

	.partners {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 50px;
	  margin-top: 48px;
	}

	.partners img {
	  min-height: 25px;
	  max-height: 50px;
	  filter: grayscale(100%);
	}

	footer {
	  border-top: 1px solid #ddd;
	  padding: 24px 0;
	}

	.copyright {
	  color: #888;
	}

</style>

<div class='home'>

  <header>
  	<div class='logo'>
  		<img src='im/logo-full.svg'>
  	</div>
  	<h1>Fully Decentralized Crypto Perpetuals</h1>
  </header>

  <div class='body'>

  	<section>

  		<h2>Hello!</h2>

  		<p>CAP lets you trade markets such as BTC/USD and ETH/USD with leverage. It is decentralized, open source and accessible to everyone.</p>

  		<p>Over <strong>$5,000,000,000</strong> has already been traded on CAP! Get started in seconds.</p>

  		<div class='button-wrapper'>
  			<a class='button' href='/trade'>Start Trading ▸</a>
  		</div>

  	</section>

  	<section>

  		<h2>Features</h2>

  		<p>CAP has all the features you need for fast and secure on-chain trading, including:</p>

  		<ul>
  			<li><strong>Cross Margin.</strong> Margin is shared between positions, minimizing liquidations.</li>
  			<li><strong>Risk Management.</strong> Set limit, stop, take-profit, and stop-loss.</li>
  			<li><strong>Dynamic Funding.</strong> Longs pay shorts (and vice versa) based on open interest.</li>
  			<li><strong>Multi Chain.</strong> CAP is available on Arbitrum, Polygon, Optimism, and more.</li>
  			<li><strong>Trustless.</strong> Interact directly with on-chain smart contracts (no intermediaries).</li>
  		</ul>

  	</section>

  	<section>

  		<h2>How It Works</h2>

  		<p>You buy to profit from rising prices. You sell to profit from falling prices.</p>

  		<p>Your profits are paid from the pool. Your losses are paid to the pool.</p>

  		<ul>
  			<li>50% of trading fees go to the pool.</li>
  			<li>40% go to the treasury which buys back the CAP token, among other things.</li>
  			<li>10% go to keepers which trigger order executions (anyone can be a keeper).</li>
  		</ul>

  		<p>All prices are provided in real-time on-chain by Chainlink.</p>

  	</section>

  	<section>

  		<h2>Audits</h2>

  		<p></p>

  	</section>

  	<section>

  		<h2>Get Involved</h2>

  		<p>We believe everyone should be able to partake in the wealth creation made possible by the free markets. On CAP, value is transparently distributed. You can choose to participate as a trader, liquidity provider, code contributor, token holder, or simple community member. We recognize and encourage involvement of all kinds.</p>

  		<ul>
  			<li><a href='https://discord.gg/zkdr8vnujz' target='_blank'>Discord</a></li>
  			<li><a href='https://twitter.com/CapDotFinance' target='_blank'>Twitter</a></li>
  			<li><a href='https://github.com/0xcap' target='_blank'>Github</a></li>
  			<li><a href='https://cap.finance/whitepaper.pdf' target='_blank'>Whitepaper</a></li>
  			<li><a href='https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x031d35296154279dc1984dcd93e392b1f946737b' target='_blank'>Buy CAP</a></li>
  		</ul>

  	</section>

  	<section class='dark'>

  		<h2>Partners</h2>

  		<div class='partners'>
  			<a href='https://portfolio.nansen.ai/?utm_campaign=portfolio_cap_27oct22' target='_blank'><img src='im/partners/nansen.png'></a>
  			<a href='https://tokenterminal.com/terminal/projects/cap' target='_blank'><img src='im/partners/tokenterminal.svg'></a>
  			<a href='https://dune.com/crypt0gnome/cap-finance' target='_blank'><img src='im/partners/dune.png'></a>
  		</div>

  		<div class='partners'>
  			<a href='https://defillama.com/protocol/cap' target='_blank'><img src='im/partners/defillama.webp'></a>
  			<a href='https://www.coingecko.com/en/coins/cap' target='_blank'><img src='im/partners/coingecko.webp'></a>
  			<a href='https://thegraph.com/hosted-service/subgraph/0xcap/cap3' target='_blank'><img src='im/partners/graph.png'></a>
  		</div>

  	</section>

  </div>

  <footer>
  	<div class='copyright'>CAP &copy; {year}</div>
  </footer>
  
</div>