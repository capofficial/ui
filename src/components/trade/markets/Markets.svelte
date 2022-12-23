<script>
  import ColoredPrice from "@components/layout/ColoredPrice.svelte";

  import Table from "@components/layout/table/Table.svelte";
  import Cell from "@components/layout/table/Cell.svelte";

  import { DEFAULT_MARKETS_SORT_KEY } from "@lib/config";

  import { formatMarketName } from "@lib/formatters";
  import tooltip from "@lib/tooltip";
  import { MOON_CIRCLE } from "@lib/icons";
  import { markets, selectedMarket } from "@lib/stores";

  let columns = [
    { key: "market", gridTemplate: "115px", sortable: true },
    { key: "price", gridTemplate: "1fr", sortable: true, rightAlign: true },
  ];
</script>

<div class="header">Markets</div>
<div class="markets-wrapper">
  <div class="table-wrapper">
    <Table
      defaultSortKey={DEFAULT_MARKETS_SORT_KEY}
      {columns}
      isLoading={false}
      isEmpty={$markets.length == 0}
    >
      {#each Object.keys($markets) as marketKey}
        <a
          class="market-row"
          href={`/trade/${$markets[marketKey].symbol}`}
          class:selected={$markets[marketKey].symbol == $selectedMarket}
        >
          <Cell>
            {@html formatMarketName($markets[marketKey].symbol, true)}
            {#if $markets[$markets[marketKey].market]?.isClosed}
              <div class="moon-icon" use:tooltip={{ content: "Market Closed" }}>
                {@html MOON_CIRCLE}
              </div>
            {:else}
              <!-- <span class='leverage'>{$markets[$markets[marketKey].symbol]?.maxLeverage}×</span> -->
            {/if}
          </Cell>
          <Cell rightAlign={true}
            ><ColoredPrice price={$markets[marketKey].price} /></Cell
          >
        </a>
      {/each}
    </Table>
  </div>
</div>

<style>
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid var(--layerDark);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 85%;
  }

  .markets-wrapper {
    height: 100%;
    font-size: 85%;
  }
  .market-row {
    padding: 0 25px;
    display: grid;
    align-items: center;
    height: 32px;
    color: var(--text0);
    text-decoration: none;
    grid-template-columns: var(--grid-template);
  }
  .market-row:hover {
    background-color: var(--layer100);
  }
  .market-row.selected {
    background-color: var(--layer100);
  }
  .market-row :global(.grayed) {
    opacity: 0.5;
  }
  .moon-icon {
    display: flex;
    align-items: center;
    margin-left: 6px;
  }
  .moon-icon :global(svg) {
    fill: var(--layer100);
    width: 14px;
  }
  .table-wrapper {
    height: calc(100% - 100px);
    overflow-y: hidden;
    position: relative;
  }
</style>
