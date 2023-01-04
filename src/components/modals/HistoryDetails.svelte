<script>
    import Modal from "./Modal.svelte";
    import DataList from "@components/layout/DataList.svelte";
    import { formatHistory } from "@lib/formatters";
  
    export let data; // history item
    let history = formatHistory(data);
    let dataList = [];
    for (const key in history) {
      dataList.push({
        label: key,
        value: history[key],
      });
    }
  </script>
  
  <Modal title="History Details">
    <DataList data={dataList} />
  </Modal>
  