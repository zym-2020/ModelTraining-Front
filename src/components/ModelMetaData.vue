<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="metaData">
      <el-form-item label="模型假设">
        <el-input v-model="metaData.hypothesis" />
      </el-form-item>
      <el-form-item label="算法/等式">
        <el-input v-model="metaData.algorithm" />
      </el-form-item>
      <el-form-item label="输入">
        <el-input v-model="metaData.input" />
      </el-form-item>
      <el-form-item label="输出">
        <el-input v-model="metaData.output" />
      </el-form-item>
      <el-form-item label="参数">
        <el-input v-model="metaData.parameter" />
      </el-form-item>
      <el-form-item label="迭代次数">
        <el-input v-model="metaData.iterate" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="metaData.unit" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    const metaData = reactive({
      hypothesis: "",
      algorithm: "",
      input: "",
      output: "",
      parameter: "",
      iterate: "",
      unit: "",
    });

    return {
      metaData,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>