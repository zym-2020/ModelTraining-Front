<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataSource">
      <el-form-item label="出版组织机构">
        <el-input v-model="dataSource.publish" />
      </el-form-item>
      <el-form-item label="参考文献">
        <el-input v-model="dataSource.references" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const dataSource = reactive({
      publish: "",
      references: "",
    });

    return {
      dataSource,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>