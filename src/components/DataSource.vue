<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataSource">
      <el-form-item label="出版组织机构">
        <el-input v-model="dataSource.publish" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="参考文献">
        <el-input v-model="dataSource.references" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  props: {
    dataSourceValue: {
      type: Object,
    },
  },
  emits: ["returnDataSource"],
  setup(props, context) {
    const dataSource = reactive({
      publish: (props.dataSourceValue as any).publish,
      references: (props.dataSourceValue as any).references,
    });

    const changeHandle = () => {
      context.emit("returnDataSource", dataSource);
    };

    return {
      dataSource,
      changeHandle
    };
  },
});
</script>

<style lang="scss" scoped>
</style>