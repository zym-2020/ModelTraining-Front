<template>
  <div class="team">
    <div class="title"><h2>成员列表</h2></div>
    <el-divider />
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="teamId" label="团队编号" width="180" />
      <el-table-column prop="name" label="姓名" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getTeamInfo } from "@/api/request";
export default defineComponent({
  setup() {
    const tableData = ref<any[]>([]);

    onMounted(async () => {
      const data = await getTeamInfo();
      if (data != null && (data as any).code === 0) {
        tableData.value = data.data;
      }
    });

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