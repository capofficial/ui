<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import { onMount } from "svelte";
  import Button from "@components/layout/Button.svelte";
  import Input from "@components/layout/Input.svelte";
  import Slider from "@components/layout/Slider.svelte";
	import { getUserBalance } from '@api/account'
  import { selectedMarketInfo } from '@lib/stores'
  import { BPS_DIVIDER } from '@lib/config'
	import { selectedMarket, size, price, currencyName, margin, maxSize, tpPrice, slPrice, hasTPSL, isReduceOnly, orderType, isLong } from '@lib/stores'
  import { submitOrder } from '@api/orders'
  import { formatForDisplay } from '@lib/formatters'
  import { showModal } from '@lib/ui'

  let sellLoading, buyLoading;

  onMount(() => {
    getUserBalance()
    price.set()
  });

  async function submitOrderType(type) {
    if ($size == 0) return;
    if (type == 'short') {
      isLong.set(false);
      sellLoading = true;
    } else {
      isLong.set(true);
      buyLoading = true;
    }
    const success = await submitOrder(
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
    );
    if (success) {
      // reset form
      size.set()
      price.set()
      isReduceOnly.set(false)
      orderType.set(0)
      tpPrice.set()
      slPrice.set()
    }
    sellLoading = false;
    buyLoading = false;
  }
  
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="create-new-order">
  <div class='new-order'>  
    <div class="header">
      <div class="left">
        <div class='max-size-label'>Available:</div>
        <a on:click={() => (size.set($maxSize))}>{formatForDisplay($maxSize)} {$currencyName}</a>
      </div>
      <div class="trigger-tpsl right">
        <a on:click|stopPropagation={() => showModal('TriggerPrice')}>
          {#if $orderType == 0 || !$price || $price == 0}
            +Trigger Price
          {:else}
            {#if $orderType == 1}Limit: {$price}{/if}
            {#if $orderType == 2}Stop: {$price}{/if}
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
      <Input label={`Size (${$currencyName})`} bind:value={$size} />
    </div>
    <div class='buttons'>
        <Button isRed={true} isLoading={sellLoading} on:click={() => submitOrderType('short')} label="Sell/Short" />
        <Button isLoading={buyLoading} on:click={() => submitOrderType('long')} label="Buy/Long" />
    </div>
  </div>
  <div class='margin-fee-container'>
    <div class='margin'>
      <div>Margin:</div>
      <div>{formatForDisplay($margin)} {$currencyName}</div>
    </div>
    <div class='fee'>
      <div>{$selectedMarketInfo.fee ? `Fee (${(100 * $selectedMarketInfo.fee) / BPS_DIVIDER}%)` : 'Fee (---)'}:</div>
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
	}
  .margin-fee-container {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
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
