<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  import { saveUserSetting, getUserSetting, getUPL } from "@lib/utils";
  import { onMount } from "svelte";
  import { get } from 'svelte/store'
  import Checkbox from "@components/layout/CheckBox.svelte";
  import Input from "../../layout/Input.svelte";
  import Slider from "../../layout/Slider.svelte";
	import { getUserBalance } from '@api/account'
  import { markets, selectedMarketInfo } from '@lib/stores'
	import { selectedMarket, balance, size, price, leverage, currencyName, margin, freeMargin, maxSize, tpPrice, slPrice, hasTPSL, isReduceOnly, orderType, isLong } from '@lib/stores'
  import { submitOrder } from '@api/orders'
  import { formatForDisplay } from '@lib/formatters'

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

  let tpPNL
  let slPNL
  let tpProfit
  let slLoss
  let displayTPProfit
  let displaySLLoss
  let invalidTakeProfit = false
  let invalidStopLoss = false
  let percentageInput = false
  let _price

  let calculatorIsLong = true
  let calculatorModeChanged = false

function updatePNLs() {

    getPriceType()
    let tpPosition = {
        isLong: calculatorIsLong,
        size: $size,
        price: _price 
    }

    let slPosition = {
        isLong: calculatorIsLong,
        size: $size,
        price: _price
    }

    tpPNL = getUPL(tpPosition, $tpPrice)
    slPNL = getUPL(slPosition, $slPrice)
}

function getEstimatedPNL() {

    updatePNLs()

    tpProfit = (tpPNL / $margin) * 100
    slLoss = (slPNL / $margin) * 100 * -1
    

    if (!percentageInput)
    {
        displayTPProfit = formatForDisplay(tpProfit)
        displaySLLoss = formatForDisplay(slLoss)
    }

    //validateInputs()
    getTPSLFromGainLoss()

}

/*function validateInputs() {

    if ($isLong)
    {
        if (_price > $tpPrice && $tpPrice > 0)
        {
            invalidTakeProfit = true
        }
        else
        {
            invalidTakeProfit = false
        }

        if (_price < $slPrice && $slPrice > 0)
        {
            invalidStopLoss = true
        }
        else
        {
            invalidStopLoss = false
        }

    }
    else
    {
        if (_price < $tpPrice && $tpPrice > 0)
        {
            invalidTakeProfit = true
        }
        else
        {
            invalidTakeProfit = false
        }

        if (_price > $slPrice && $slPrice > 0)
        {
            invalidStopLoss = true
        }
        else
        {
            invalidStopLoss = false
        }
    }

}*/

function getTPSLFromGainLoss() {

    getPriceType()

    if (percentageInput || calculatorModeChanged)
    {
        let estimatedTakeProfit
        let estimatedStopLoss

        if (calculatorIsLong)
        {
          estimatedTakeProfit = _price + (_price * ((displayTPProfit / 100) / $leverage))
          estimatedStopLoss = _price - (_price * ((displaySLLoss / 100) / $leverage))
        }
        else
        {
          estimatedTakeProfit = _price - (_price * ((displayTPProfit / 100) / $leverage))
          estimatedStopLoss = _price + (_price * ((displaySLLoss / 100) / $leverage))
        }

        tpPNL = ($margin / estimatedTakeProfit) * 100
        slPNL = ($margin / estimatedStopLoss) * 100 * -1 

        tpPrice.set(formatForDisplay(estimatedTakeProfit))
        slPrice.set(formatForDisplay(estimatedStopLoss))

        calculatorModeChanged = false
        updatePNLs()
        //validateInputs()
    }
}

function getTPSLFromGainLossAfterPriceChange() {

  calculatorModeChanged = true
  getTPSLFromGainLoss()

}

function getPriceType() {
    if ($orderType == 0)
    {
        _price = $selectedMarketInfo.price
    }
    else
    {
        _price = $price
    }
}

function calculatorToggle() {
  calculatorModeChanged = true
  calculatorIsLong = !calculatorIsLong
}

function onFocus() { percentageInput = true; }
function onBlur() { percentageInput = false; }

$: getEstimatedPNL($tpPrice, $slPrice)
$: getTPSLFromGainLoss(displayTPProfit, displaySLLoss, calculatorIsLong)
$: getTPSLFromGainLossAfterPriceChange($price)
$: getPriceType($orderType, $selectedMarketInfo)
//$: validateInputs($orderType)

  
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

      {#if $hasTPSL}
        {#if calculatorIsLong}
          <a class='tpsl-toggle-button' on:click|stopPropagation={() => calculatorToggle()}>Long</a>
        {:else}
          <a class='tpsl-toggle-button' on:click|stopPropagation={() => calculatorToggle()}>Short</a>
        {/if}
      {/if}

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
          <label for='Gain' class='prefix'>
            Gain
          </label>
          <input id='Gain' type='number' step="0.0000001" bind:value={displayTPProfit} min="0" max="10000000" maxlength="10" spellcheck="false" placeholder={`0.0`} autocomplete="off" autocorrect="off" inputmode="decimal" lang="en" on:focus={onFocus} on:blur={onBlur} >
          <label for='Gain' class='suffix'>
              %
          </label>
        </div>
      </div>
      <div class='input-container-tpsl'>
        <Input label={'SL'} bind:value={$slPrice} />
        <div class='input-gain-loss'>
          <label for='Loss' class='prefix'>
            Loss
          </label>
          <input id='Loss'  type='number' step="0.0000001" bind:value={displaySLLoss} min="0" max="10000000" maxlength="10" spellcheck="false" placeholder={`0.0`} autocomplete="off" autocorrect="off" inputmode="decimal" lang="en" on:focus={onFocus} on:blur={onBlur} >
          <label for='Loss' class='suffix'>
              %
          </label>
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
    width: 275px;
    height: 46px;
		position: relative;
		font-size: 85%;
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



  input {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		text-align: right;
		padding-right: 28px;
		border-radius: 6px;
		background-color: var(--layer50);
		border: 1px solid var(--layer200);
		caret-color: var(--primary);
		font-size: inherit;
		font-weight: 600;
		/*transition: padding 200ms ease-in-out;*/
	}
	input:hover {
		border-color: var(--layer300);
	}
	input:focus {
		border-color: var(--primary);
	}
	input:disabled {
		color: var(--text200);
	}	

	input::placeholder {
	  color: var(--text500);
	  opacity: 1;
	}
	input::-ms-input-placeholder{
	  color: var(--text500);
	}
	input:-ms-input-placeholder {
	  color: var(--text500);
	}

  .prefix {
		position: absolute;
		background-color: var(--layer50);
		padding-left: 14px;
		padding-right: 14px;
		margin-left: 1px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		white-space: nowrap;
		left: 0px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 500;
	}

  .suffix {
		position: absolute;
		background-color: var(--layer50);
		padding-left: 2px;
		padding-right: 14px;
		margin-right: 1px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		white-space: nowrap;
		right: 0px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		font-weight: 500;
	}

  .tpsl-toggle-button {
		padding: 6px 12px;
    align-self: center;
    min-width: 50px;
    text-align: center;
    user-select: none;
		background-color: var(--layer100);
		border-radius: var(--base-radius);
	}
	.tpsl-toggle-button:hover {
		background-color: var(--layer200);
	}

</style>
