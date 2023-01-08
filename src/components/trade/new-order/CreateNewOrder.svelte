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
  <div class="header">
    <div class="left">
      Available: <a on:click={() => (size.set($maxSize))}>{formatForDisplay($maxSize)}</a>
    </div>
    <div class="right">
      
      <a on:click|stopPropagation={() => showModal('TriggerPrice')}>+ Trigger Price</a> | 
      <a on:click|stopPropagation={() => showModal('TPSL')}>+ TP/SL</a>

    </div>
  </div>
  <div class='input-tpsl-container'>
    <div class='size-slider-limitprice-container'>
      <div class='input-container'>
        <Input label={'Size'} bind:value={$size} />
      </div>
      <div class='slider-container'>
          <Slider bind:value={$size} maxValue={$maxSize} bind:isActive={sizeHighlighted} isSecondaryColor={false} nullValue={true} />
          <!-- <Slider bind:value={$size} maxValue={$maxSize} bind:isActive={sizeHighlighted} isSecondaryColor={!$isLong} nullValue={true} /> -->
      </div>
    </div>
    
  </div>
  <div class='buttons'>
		<button class="secondary" on:click|stopPropagation={() => submitOrderType('short')}>Sell/Short</button>
		<button class="primary" on:click|stopPropagation={() => submitOrderType('long')}>Buy/Long</button>
	</div>
  <div class='flex containerborders'>
    <div class='flex container sides'>
      <div class='flex'>Margin</div>
      <div class='flex right'>{formatForDisplay($margin)} {$currencyName}</div>
    </div>
    <div class='flex container sides'>
      <div class='flex'>{$selectedMarketInfo.fee ? `Fee (${(100 * $selectedMarketInfo.fee) / BPS_DIVIDER}%)` : 'Fee (---)'}</div>
      <div class='flex right'>{$selectedMarketInfo.fee ? `${formatForDisplay($size * ($selectedMarketInfo.fee / BPS_DIVIDER))} ${$currencyName}` : `0 ${$currencyName}`}</div>
    </div>
  </div>
</div>

<style>
  .header {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
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
  .left .item {
    margin: 0 5px;
    padding: 0 0 3px;
    cursor: pointer;
  }
  .left .item:hover {
    color: var(--primary);
  }
  .left .item.selected {
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
  .input-container {
    margin: 10px;
    margin-top: 5px;
  }
  .input-container-tpsl {
    margin-right: 10px;
    margin-left: 0px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
  .size-slider-limitprice-container {
    flex-basis: 1fr;
    flex-grow: 1;
  }
  .input-gain-loss {
    width: 275px;
    height: 46px;
		position: relative;
		font-size: 85%;
  }
  .slider-container {
    margin: 15px;
     display: none;
  }
  .input-tpsl-container {
    display: flex;
    flex-direction: row;
  }
  .tpsl-container-flex {
    width: 50%;
  }
	.buttons {
		display: flex;
    justify-content: space-around;
		align-items: center;
		margin: -5px 6px 5px 6px;
	}
	button {
		flex: 50%;
		margin: 5px;
		padding: 10px 5px;
		width: 75%;
	}
  .flex {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    font-size: 14px;
  }
  .flex.containerborders {
    margin-bottom: -2px;
    border-top-style: solid;
    border-top-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: var(--layerDark);
  }
  .flex.container {
    padding: 10px;
  }
  .flex.right {
    display: flex;
    justify-self: end;
    overflow: hidden;
    flex-grow: 0;
  }
  .flex.container.sides {
    flex-basis: 35%;
    max-width: 35%;
  }
  .flex.container.middle {
    flex-basis: 25%;
    max-width: 25%;
  }

  .flex.container.middle.borders {
    border-left-style: solid;
    border-left-width: 1px;
    border-right-style: solid;
    border-right-width: 1px;
    border-color: var(--layerDark);
  }



  

</style>
