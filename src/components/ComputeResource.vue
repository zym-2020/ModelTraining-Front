<template>
  <div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="computeResource"
    >
      <el-form-item label="操作系统">
        <el-input v-model="computeResource.publish" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="computeResource.version" />
      </el-form-item>
      <el-form-item label="软件信息">
        <el-input v-model="computeResource.software" />
      </el-form-item>
      <el-form-item label="硬件设备">
        <el-input v-model="computeResource.hardware" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const computeResource = reactive({
      publish: "",
      version: "",
      software: "",
      hardware: "",
    });

    return {
      computeResource,
    };
  },
});
</script>

<style lang="scss">
</style>