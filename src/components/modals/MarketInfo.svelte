<script>
  import Modal from "./Modal.svelte";
  import DataList from "@components/layout/DataList.svelte";
  import { formatMarket } from "@lib/formatters";

  export let data; // market info
  let market = formatMarket(data);
  let dataList = [];
  for (const key in market) {
    if (key == 'Funding Factor')
    {
      dataList.push({
        label: key,
        value: market[key],
        note: 'Yearly funding rate if open interest is completely skewed to one side.',
      });
    }
    else if (key == 'Min Settlement Time')
    {
      dataList.push({
        label: key,
        value: market[key],
        note: `Time before order can be executed if price doesn't change.`,
      });
    }
    else
    {
      dataList.push({
        label: key,
        value: market[key],
       });
    }
  }
</script>

<Modal title="Market Details" width={300}>
  <DataList data={dataList} />
</Modal>
