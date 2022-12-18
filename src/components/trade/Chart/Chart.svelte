<script>
  import { getChainlinkPriceHistory } from "@api/markets";
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";
	import {formatForDisplay} from '@lib/formatters'

  const leftOffset = 50;
  const bottomOffset = 10;
	let length;
  let pointsY = [];
  let pointsX = [];
	let height = 0, width = 0;
	let minY
	let maxY

	onMount(async () => {
		const dimensions = document.getElementById("chart").getBoundingClientRect();
		height = dimensions.height
		width = dimensions.width
    let points = [];
    try {
      let priceHistory = await getChainlinkPriceHistory(
        // "0x3607e46698d218b3a5cae44bf381475c0a5e2ca7"
				"0x942d00008d658dbb40745bbec89a93c253f9b882"
      );
      priceHistory = priceHistory.priceHistory.nodes;
			priceHistory.reverse()
			length = priceHistory.length;
      priceHistory = priceHistory.forEach((i) => {
        points.push({
          blockNumber: Number(i.blockNumber),
          value: Math.ceil(Number(i.latestAnswer) / 10 ** 6) / 10 ** 2,
        });
        pointsY.push(Math.ceil(Number(i.latestAnswer) / 10 ** 6) / 10 ** 2);
        pointsX.push(Number(i.blockNumber));
      });
      maxY = Math.max(...pointsY);
      minY = Math.min(...pointsY);
      loading = false;
    } catch (err) {
      console.log(err);
    }
  });
  let loading = true;
  $: xScale = scaleLinear().domain([0, length]).range([leftOffset, width]);
  $: yScale = scaleLinear()
    .domain([minY, maxY])
    .range([height - bottomOffset - 20, 0]);

	$: xTicks = xScale.ticks(3)
	$: yTicks = yScale.ticks(8)
</script>

<svg>
  <g>
		{#each pointsY as yPoint, i}
			<line
				class="chart-point"
				x1={xScale(i) + 2}
				x2={xScale(i + 1) + 2}
				y1={yScale(yPoint)}
				y2={yScale(pointsY[i + 1] || pointsY[i])}
				stroke-width="0.3%"
			/>
		{/each}
	</g>
  <g class="axis y-axis">
		{#each yTicks as tick}
			<g class="tick tick-{tick}" transform="translate({3}, {yScale(tick)})">
				<text x={-6}>{formatForDisplay(tick)}</text>
			</g>
		{/each}
		<g class="tick" transform="translate({leftOffset},0)">
			<line x1={2} y2=0 y1={yScale(minY) + bottomOffset} />
		</g>
	</g>
	<g class="axis x-axis">
		<!-- {#each xTicks as xTick, i}
			<g
				class="tick"
				transform="translate({xScale(
					xTick
				)},{height - 5})"
			>
				<text x={0}>{pointsX[Math.floor((i + 1 < pointsX.length ? (xTicks[i] + xTicks[i + 1]) / 2 : xTicks[i]))]}</text>
			</g>
		{/each} -->
		<g class="tick" transform={`translate(0,${yScale(minY) + bottomOffset})`}>
			<line x2={"100%"} x1={leftOffset + 2} />
		</g>
	</g>
</svg>
<style>
	svg {
		height: 100%;
		width: 100%;
		min-height: 300px;
	}
	.chart-point {
    stroke: var(--primary);
    opacity: 1;
	}
	.axis > .tick > line {
    stroke: #e2e2e2;
  }
	.tick > text {
		fill: var(--text400)!important;
	}

</style>