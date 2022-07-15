<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataActive">
      <el-form-item label="数据处理步骤">
        <el-input v-model="dataActive.handle" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据转换步骤">
        <el-input v-model="dataActive.conversion" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  props: {
    dataActiveValue: {
      type: Object,
    },
  },
  emits: ["returnDataActive"],
  setup(props, context) {
    const dataActive = reactive({
      handle: (props.dataActiveValue as any).handle,
      conversion: (props.dataActiveValue as any).conversion,
    });

    const changeHandle = () => {
      context.emit("returnDataActive", dataActive);
    };

    return {
      dataActive,
      changeHandle
    };
  },
});
</script>

<style lang="scss" scoped>
</style>