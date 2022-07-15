<template>
  <div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="computeResource"
    >
      <el-form-item label="操作系统">
        <el-input v-model="computeResource.publish" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="computeResource.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="软件信息">
        <el-input v-model="computeResource.software" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="硬件设备">
        <el-input v-model="computeResource.hardware" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  props: {
    computeResourceValue: {
      type: Object,
    },
  },
  emits: ["returnComputResource"],
  setup(props, context) {
    const computeResource = reactive({
      publish: (props.computeResourceValue as any).publish,
      version: (props.computeResourceValue as any).version,
      software: (props.computeResourceValue as any).software,
      hardware: (props.computeResourceValue as any).hardware,
    });

    const changeHandle = () => {
      context.emit("returnComputResource", computeResource);
    };

    return {
      computeResource,
      changeHandle
    };
  },
});
</script>

<style lang="scss" scoped>
</style>