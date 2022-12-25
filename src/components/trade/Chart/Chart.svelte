<script>
  import { getChainlinkPriceHistory } from "@api/markets";
  import { onMount } from "svelte";
  import { formatUnits } from '@lib/formatters';
  import { getLatestBlock } from '@lib/utils';

  import { createChart } from 'lightweight-charts';
 
	onMount(async () => {
    
    const chart = createChart(document.getElementById('lightweight-graph'),
    {
      layout: {
            background: { color: '#1b1f22' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444444' },
            horzLines: { color: '#444444' },
        },
    }
    )

    const areaSeries = chart.addAreaSeries()

    chart.priceScale().applyOptions({
    borderColor: '#444444',
    });

    chart.timeScale().applyOptions({
      borderColor: '#444444',
      timeVisible: true,
      secondsVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
    });

    try {

      let priceHistory = await getChainlinkPriceHistory(
        // "0x3607e46698d218b3a5cae44bf381475c0a5e2ca7"
				"0x942d00008d658dbb40745bbec89a93c253f9b882"
      );
      
      priceHistory = priceHistory.priceHistory.nodes;
      priceHistory.reverse()

      let latestBlock = await getLatestBlock()

      let latestBlockNumber = latestBlock.number
      let currentTimestamp = Math.floor((Date.now() / 1000));

      let averageBlockTime = 0.5; //2 blocks/s on arbitrum at the moment

      for (let i = 0; i < priceHistory.length; i++)
      {
        let historyBlockNumber = Number(priceHistory[i].blockNumber)
        
        let blockDiff = latestBlockNumber - historyBlockNumber

        let timeDiff = Math.floor(blockDiff * averageBlockTime)

        let estimatedHistoryTimestamp = currentTimestamp - timeDiff

        let dataPoint = {
          time: estimatedHistoryTimestamp,
          value: Number(formatUnits(priceHistory[i].latestAnswer, 8))
        }

        areaSeries.update(dataPoint)

        chart.timeScale().fitContent();

      }

    } catch (err) {
      console.log(err);
    }
  });



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

<div class='chart' id='lightweight-graph'></div>

<style>
  .chart {
    margin-right: -1px;
    margin-bottom: -1px;
		min-height: 176px; 
  }

</style>