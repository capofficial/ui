<script>
	
	import Modal from './Modal.svelte'
	import Input from '@components/layout/Input.svelte'
	import Button from '@components/layout/Button.svelte'
  import Checkbox from "@components/layout/CheckBox.svelte";

	import { selectedMarket, selectedMarketInfo, size, price, leverage, currencyName, margin, maxSize, tpPrice, slPrice, hasTPSL, isReduceOnly, orderType, isLong } from '@lib/stores'
	import { hideModal } from '@lib/ui'
  import { formatForDisplay } from '@lib/formatters'
	
  import { getUPL } from "@lib/utils";
	

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

<style>
	.input-container-tpsl {
    margin-right: 10px;
    margin-left: 0px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
  .input-gain-loss {
    width: 275px;
    height: 46px;
		position: relative;
		font-size: 85%;
  }
  .input-tpsl-container {
    display: flex;
    flex-direction: row;
  }
  .tpsl-container-flex {
    width: 50%;
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

<Modal title='Set TP/SL' width={400}>
	
	<div class='container'>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div>
			<Checkbox label="TP/SL" hasPadding bind:value={$hasTPSL} />
		</div>

		{#if $hasTPSL}
		  {#if calculatorIsLong}
		    <a class='tpsl-toggle-button' on:click|stopPropagation={() => calculatorToggle()}>Long</a>
		  {:else}
		    <a class='tpsl-toggle-button' on:click|stopPropagation={() => calculatorToggle()}>Short</a>
		  {/if}
		{/if}

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

		<div>
			<Button label={`Done`} on:click={hideModal} />
		</div>

	</div>

</Modal>
