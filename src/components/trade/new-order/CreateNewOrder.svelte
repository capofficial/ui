<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import { onMount } from "svelte";
  import Input from "../../layout/Input.svelte";
  import Slider from "../../layout/Slider.svelte";
	import { getUserBalance } from '@api/account'
  import { selectedMarketInfo } from '@lib/stores'
  import { BPS_DIVIDER } from '@lib/config'
	import { selectedMarket, size, price, leverage, currencyName, margin, maxSize, tpPrice, slPrice, hasTPSL, isReduceOnly, orderType, isLong } from '@lib/stores'
  import { submitOrder } from '@api/orders'
  import { formatForDisplay } from '@lib/formatters'
  import { showModal } from '@lib/ui'

  let sizeHighlighted;

  onMount(() => {
    getUserBalance()
    price.set()
  });

  function submitOrderType(type) {
    if ($size == 0) return;
    isLong.set(type === 'short' ? false : true)
    submitOrder(
      {
        market: $selectedMarket,
        isLong: $isLong,
        margin: $margin,
        size: $size,
        price: $price,
        hasTPSL: $hasTPSL,
        isReduceOnly: $isReduceOnly,
        orderType: $orderType,
        tpPrice: $tpPrice,
        slPrice: $slPrice
      }
    )
  }
  
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="create-new-order">
  <div class='new-order'>  
    <div class="header">
      <div class="left">
        <div class='max-size-label'>Available:</div>
        <a on:click={() => (size.set($maxSize))}>{formatForDisplay($maxSize)}</a>
      </div>
      <div class="trigger-tpsl right">
        <a on:click|stopPropagation={() => showModal('TriggerPrice')}>
          {#if $orderType == 0 || $price == 0}
            +Trigger Price
          {:else}
            {`Trigger: ${$price}`}
          {/if}
        </a>
        <a on:click|stopPropagation={() => showModal('TPSL')}>
          {#if $hasTPSL == false}
          +TP/SL
          {:else}
            {`${$tpPrice ? `TP: ${$tpPrice}` : `+TP`} / ${$slPrice ? `SL: ${$slPrice}` : `+SL`}`}
          {/if}
        </a>
      </div>
    </div>
    <div class='input-container'>
      <Input label={'Size'} bind:value={$size} />
    </div>
    <div class='buttons'>
      <button class="secondary" on:click|stopPropagation={() => submitOrderType('short')}>Sell/Short</button>
      <button class="primary" on:click|stopPropagation={() => submitOrderType('long')}>Buy/Long</button>
    </div>
  </div>
  <div class='margin-fee-container'>
    <div class='margin'>
      <div>Margin</div>
      <div>{formatForDisplay($margin)} {$currencyName}</div>
    </div>
    <div class='fee'>
      <div>{$selectedMarketInfo.fee ? `Fee (${(100 * $selectedMarketInfo.fee) / BPS_DIVIDER}%)` : 'Fee (---)'}</div>
      <div>{$selectedMarketInfo.fee ? `${formatForDisplay($size * ($selectedMarketInfo.fee / BPS_DIVIDER))} ${$currencyName}` : `0 ${$currencyName}`}</div>
    </div>
  </div>
</div>

<style>
  a {
    color: var(--primary);
  }
  .header {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: -10px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 85%;
    justify-content: space-between;
  }
  .left,
  .right {
    display: flex;
    flex-direction: row;
  }
  .new-order {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .max-size-label {
    margin-right: 6px;
  }
  .trigger-tpsl {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
  .input-container {
    display: flex;
    flex-direction: row;
  }
	.buttons {
		display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
		align-items: center;
    margin-bottom: 10px;
	}
	button {
		flex: 50%;
		padding: 10px 5px;
		width: 75%;
	}
  .margin-fee-container {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 14px;
    border-top-style: solid;
    border-top-width: 1px;
    border-color: var(--layerDark);
    gap: 10px;
  }
  .fee {
    display: flex;
    justify-content: space-between;
    flex-basis: 50%;
    width: 150px;
    max-width: 50%;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .margin {
    display: flex;
    justify-content: space-between;
    flex-basis: 50%;
    width: 150px;
    max-width: 50%;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
