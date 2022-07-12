<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataActive">
      <el-form-item label="数据处理步骤">
        <el-input v-model="dataActive.handle" />
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
  setup() {
    const dataActive = reactive({
      handle: "",
      conversion: "",
    });

    return {
      dataActive,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>