<script>
  import { getChainlinkPriceHistory } from "@api/markets";
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";

  const leftOffset = 0;
  const bottomOffset = 0;
	let length;
  let pointsY = [];
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
      pointsY = priceHistory.map((i) => Math.ceil(Number(i.latestAnswer) / 10 ** 6) / 10 ** 2);
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
	$: linePath = `M${pointsY
    .map((p, i) => `${xScale(i).toFixed(2)},${yScale(p).toFixed(2)}`)
    .join('L')}`;
	$: areaPath = `${linePath}L${xScale(length)},${yScale(minY)}L${xScale(0)},${yScale(minY)}Z`;
</script>

<svg>
  <g>
		<path class="path-line-longs" d={linePath} />
		<path class="path-area-longs" d={areaPath} fill="url(#chart-line)"/>
	</g>
	<linearGradient id="chart-line"gradientTransform="rotate(90)">
		<stop offset="50%" stop-color="var(--primary)" />
		<stop offset="90%" stop-color="var(--layer50)" />
	</linearGradient>
</svg>
<style>
	svg {
		height: 100%;
		width: 100%;
		min-height: 300px;
	}
  .path-line-longs {
    fill: none;
    stroke: var(--primary);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1;
	}
  .path-area-longs {
    fill: url(#chart-line);
    opacity: 0.1;
  }

</style>