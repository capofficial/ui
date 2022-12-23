<script>
  export let hasClass = "";
  export let isTools = false;
  export let rightAlign = false;
</script>

<div
  class="cell"
  class:tools={isTools}
  class:green={hasClass == "green"}
  class:red={hasClass == "red"}
  style={rightAlign ? "justify-content: flex-end" : ""}
>
  <slot />
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
  .tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .tools :global(svg) {
    fill: var(--text1);
    width: 16px;
  }
  .tools :global(a) {
    display: flex;
    align-items: center;
    margin-left: 16px;
    padding: 14px 0;
  }
  .tools :global(a):hover :global(svg) {
    fill: var(--text0);
  }
</style>
