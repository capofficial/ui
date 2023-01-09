<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
  export let label;
  export let asset = false;
  export let value = "";
  export let disabled = false;
  export let assetSelect = false;
  export let isSecondaryColor = false;
  export let placeholder = false;
  export let isHighlighted = false;
  export let isInvalid = false;
  export let onMaxButtonPress = null;
</script>

<div class="input-wrapper" class:invalid={isInvalid}>
  <div class="left">
    <div class="prefix">
      {label}
    </div>
    {#if !!onMaxButtonPress}
      <div for={`max-${label}`} class="max-prefix" on:click={onMaxButtonPress}>
        Max
      </div>
    {/if}
  </div>
  <input
    id={label}
    type="number"
    step="0.0000001"
    bind:value
    min="0"
    max="10000000"
    maxlength="10"
    spellcheck="false"
    placeholder={placeholder || `0.0`}
    autocomplete="off"
    autocorrect="off"
    inputmode="decimal"
    lang="en"
    {disabled}
    class:secondaryColor={isSecondaryColor}
    class:highlighted={isHighlighted}
  />
</div>

<style>
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }

  .input-wrapper {
    height: 42px;
    font-size: 85%;
  }
  .input-wrapper.invalid {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  .input-wrapper {
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: var(--layer50);
    border: 1px solid var(--layer200);
    caret-color: var(--primary);
    font-size: inherit;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    /*transition: padding 200ms ease-in-out;*/
  }
  .input-wrapper:hover {
    border-color: var(--layer300);
  }
  .input-wrapper:focus-within,
  .input-wrapper:has(input.highlighted) {
    border-color: var(--primary);
  }
  .input-wrapper:disabled {
    color: var(--text200);
  }
  .input-wrapper:has(input.secondaryColor:focus),
  .input-wrapper:has(input.secondaryColor.highlighted) {
    border-color: var(--secondary);
    caret-color: var(--secondary);
  }
  .input-wrapper.invalid {
    border-color: var(--secondary);
  }
  .input-wrapper > .left {
    padding-left: 14px;
    display: flex;
  }
  input {
    width: 100%;
    text-align: right;
    padding-right: 14px;
    height: 42px;
    position: relative;
    font-size: 85%;
  }
  input::placeholder {
    color: var(--text500);
    opacity: 1;
  }
  input::-ms-input-placeholder {
    color: var(--text500);
  }
  input:-ms-input-placeholder {
    color: var(--text500);
  }

  .prefix,
  .max-prefix {
    white-space: nowrap;
    left: 14px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-weight: 500;
    font-size: 13px;
  }
  .max-prefix {
    left: 60px;
    color: var(--layer400);
    text-transform: unset;
    padding-left: 10px;
    cursor: pointer;
  }
  .max-prefix:hover {
    color: var(--primary);
  }
</style>
