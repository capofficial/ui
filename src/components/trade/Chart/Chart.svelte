<script>
  import { getChainlinkPriceHistory } from "@api/markets";
  import { onMount } from "svelte";
  import { formatUnits } from '@lib/formatters';
  import { getLatestBlock } from '@lib/utils';
  import { selectedMarketInfo } from "@lib/stores"
  import { LOADING_ICON } from '@lib/icons'

  import { CHAINLINK_CONTRACT_ADDRESSES } from '@lib/config'

  import { createChart } from 'lightweight-charts';
 
  let chart
  let areaSeries
  let currentSymbol
  let lastChartUpdateTimestamp = 0
  let loadingChart

	onMount(async () => {

    loadingChart = true

    chart = createChart(document.getElementById('lightweight-graph'),
    {
      layout: {
            background: { color: '#24292e' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#1e2226' }, //maybe #16191c
            horzLines: { color: '#1e2226' }, //maybe #16191c
        },
    }
    )

    areaSeries = chart.addAreaSeries()

    chart.priceScale().applyOptions({
      borderColor: '#1e2226',
    });

    chart.timeScale().applyOptions({
      borderColor: '#444444',
      timeVisible: false,
      secondsVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
      visible: false,
    });

    getChartData()

  });

async function getChartData() {

  let currentTime = Date.now() / 1000
  let marketAtStart = $selectedMarketInfo.symbol

  if (currentSymbol !== $selectedMarketInfo.symbol || ((currentTime - lastChartUpdateTimestamp) > 180))
  {
    try {

      let priceHistory = await getChainlinkPriceHistory(
        CHAINLINK_CONTRACT_ADDRESSES[$selectedMarketInfo.symbol]
      );

      if (!priceHistory) return;

      priceHistory = priceHistory.priceHistory.nodes;
      priceHistory.reverse()

      let latestBlock = await getLatestBlock()
      let latestBlockNumber = latestBlock.number
      let latestBlockTimestamp = latestBlock.timestamp
      let averageBlockTime = 0.4; //2 blocks/s on arbitrum at the moment

      areaSeries.setData([])

      for (let i = 0; i < priceHistory.length; i++)
      {
        let historyBlockNumber = Number(priceHistory[i].blockNumber)
        let blockDiff = latestBlockNumber - historyBlockNumber
        let timeDiff = Math.floor(blockDiff * averageBlockTime)
        let estimatedHistoryTimestamp = latestBlockTimestamp - timeDiff
        let dataPoint = {
          time: estimatedHistoryTimestamp,
          value: Number(formatUnits(priceHistory[i].latestAnswer, 8))
        }
        areaSeries.update(dataPoint)
        chart.timeScale().fitContent();
      }

      if (marketAtStart !== $selectedMarketInfo.symbol)
      {
        currentSymbol = null
        getChartData()
      }
      else
      {
        currentSymbol = $selectedMarketInfo.symbol
        lastChartUpdateTimestamp = Date.now() / 1000
        loadingChart = false
      }

    } catch (err) {
    console.log(err);
    }
  }
}

function setLoadingChart() {

  if (!currentSymbol)
  {
    currentSymbol = $selectedMarketInfo.symbol
  }
  
  if (currentSymbol !== $selectedMarketInfo.symbol)
  {
    loadingChart = true
  }

}

$: getChartData($selectedMarketInfo.symbol)
$: setLoadingChart($selectedMarketInfo.symbol)

</script>

<!--<svg on:mousemove={onMouseMove} on:mouseleave={() => activeIndex = null}>
  <g>
		<path class="path-line-longs" d={linePath} />
		<path class="path-area-longs" d={areaPath} fill="url(#chart-line)"/>
	</g>
  {#if activeIndex > 0}
    <circle cx={xScale(activeIndex)} cy={yScale(pointsY[activeIndex])} r="4" class="active-circle"/>
    <rect x={toolTipCoords()[0] - 50} y={toolTipCoords()[1]} />      
    <text x={toolTipCoords()[0]} y={toolTipCoords()[1]} dy="1em" text-anchor="middle" fill="red">${(pointsY[activeIndex] || 0).toFixed(2)}</text>
  {/if}
	<linearGradient id="chart-line"gradientTransform="rotate(90)">
		<stop offset="50%" stop-color="var(--primary)" />
		<stop offset="90%" stop-color="var(--layer50)" />
	</linearGradient>
</svg> -->

<div class={loadingChart ? 'loading' : 'spinner-hidden'}>
  <span class='spinner'>{@html LOADING_ICON}</span>
</div>
<div class={loadingChart ? 'chart-hidden' : 'chart'} id='lightweight-graph'></div>
<style>
  .chart {
    margin-right: -1px;
    margin-bottom: 0px;
		min-height: 100px;
  }
  .chart-hidden {
    height: 0px;
		visibility: collapse;
  }
  .spinner-hidden {
    visibility: hidden;
    height: 0px;
  }
  .spinner {
    width: 42px;
  }
  .loading {
		min-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

</style>