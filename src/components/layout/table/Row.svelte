<script>
  export let height = 52;
</script>

<div class="row" style={`height:${height}px`}><slot /></div>

<style>
  .row {
    display: grid;
    align-items: center;
    grid-template-columns: var(--grid-template);
    padding: 0 25px;
    border-bottom: 1px solid var(--layer0-hover);
  }
</style>
