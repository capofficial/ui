<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import { saveUserSetting, getUserSetting } from "@lib/utils";
  import { onMount } from "svelte";
  import Checkbox from "@components/layout/CheckBox.svelte";
  import Input from "../../layout/Input.svelte";
  import Slider from "../../layout/Slider.svelte";
	import { getUserBalance } from '@api/account'
	import { selectedMarket, balance, size, price, currencyName, margin, freeMargin, maxSize, tpPrice, slPrice, hasTPSL, isReduceOnly, orderType, isLong } from '@lib/stores'
  import { submitOrder } from '@api/orders'
  import {formatForDisplay} from '@lib/formatters'

  let _orderType;
  let sizeHighlighted;
  console.log($balance)
  onMount(() => {
    _orderType = getUserSetting("orderType");
    getUserBalance()
    price.set()
  });

  function setOrderType(type) {
    _orderType = type;
    saveUserSetting("orderType", _orderType);
    if (_orderType === 'market')
    {
      orderType.set(0)
    }
    else if (_orderType === 'limit')
    {
      orderType.set(1)
    }
    else if (_orderType === 'stop')
    {
      orderType.set(2)
    }
    
  };

  function submitOrderType(type) {
    if (type === 'short')
    {
      isLong.set(false)
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
    else if (type === 'long')
    {
      isLong.set(true)
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

  }
  
</script>

<div class="create-new-order">
  <div class="header">
    <div class="left">
      <div
        class={"item"}
        class:selected={_orderType == "market"}
        on:click={() => setOrderType("market")}
      >
        Market
      </div>
      <div
        class={"item"}
        class:selected={_orderType == "limit"}
        on:click={() => setOrderType("limit")}
      >
        Limit
      </div>
      <div
        class={"item"}
        class:selected={_orderType == "stop"}
        on:click={() => setOrderType("stop")}
      >
        Stop
      </div>
    </div>
    <div class="right">
      <Checkbox label="TP/SL" hasPadding bind:value={$hasTPSL} />
      <Checkbox label="R-O" hasPadding bind:value={$isReduceOnly}/>
    </div>
  </div>
  <div class='input-tpsl-container'>
    <div class='size-slider-limitprice-container'>
      <div class='input-container'>
        <Input label={'Size'} bind:value={$size} onMaxButtonPress={() => (size.set($maxSize))}/>
      </div>
      <div class='slider-container'>
          <Slider bind:value={$size} maxValue={$maxSize} bind:isActive={sizeHighlighted} isSecondaryColor={false} nullValue={true} />
          <!-- <Slider bind:value={$size} maxValue={$maxSize} bind:isActive={sizeHighlighted} isSecondaryColor={!$isLong} nullValue={true} /> -->
      </div>
      {#if _orderType !== 'market'}
        <div class='input-container'>
          {#if _orderType === 'limit'}
            <Input label={'Limit Price'} bind:value={$price}/>
          {:else if _orderType === 'stop'}
            <Input label={'Stop Price'} bind:value={$price}/>
          {/if}
        </div>
      {/if}
    </div>
    {#if $hasTPSL == true}
    <div class='tpsl-container-flex'>
      <div class='input-container-tpsl'>
        <Input label={'TP'} bind:value={$tpPrice} />
        <div class='input-gain-loss'>
          <Input label={'Gain'} bind:value={$size} />
        </div>
      </div>
      <div class='input-container-tpsl'>
        <Input label={'SL'} bind:value={$slPrice} />
        <div class='input-gain-loss'>
          <Input label={'Loss'} bind:value={$size} />
        </div>
      </div>
    </div>
    {/if}
  </div>
  <div class='buttons'>
		<button class="secondary" on:click|stopPropagation={() => submitOrderType('short')}>Sell/Short</button>
		<button class="primary" on:click|stopPropagation={() => submitOrderType('long')}>Buy/Long</button>
	</div>
  <div class='flex'>
    <div class='flex container'>
      <div class='flex'>Margin</div>
      <div class='flex right'>{formatForDisplay($margin)} {$currencyName}</div>
    </div>
    <div class='flex container'>
      <div class='flex'>Fee (0.1%)</div>
      <div class='flex right'>{formatForDisplay($size * 0.001)} {$currencyName}</div>
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
    width: 250px;
  }
  .slider-container {
    margin: 15px;
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
		margin: 0 10px;
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
    flex: 1;
    text-transform: uppercase;
    font-size: 14px;
  }
  .flex.container {
    padding: 10px;
  }
  .flex.right {
    display: block;
    text-align: right;
  }
</style>
