<template>
  <div class="team">
    <div class="title"><h2>成员列表</h2></div>
    <el-divider />
    <el-table :data="tableData" style="width: 100%" border >
      <el-table-column prop="number" label="编号" width="180" />
      <el-table-column prop="name" label="姓名" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const tableData = [
      {
        number: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        number: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        number: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        number: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];

    return {
      tableData,
    };
  },
});
</script>

<style lang="scss" scoped>
.team {
  padding-left: 20px;
}
</style>