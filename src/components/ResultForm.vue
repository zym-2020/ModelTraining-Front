<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="resultForm">
      <el-form-item label="结果名称">
        <el-input v-model="resultForm.name" />
      </el-form-item>
      <el-form-item label="结果描述">
        <el-input v-model="resultForm.description" />
      </el-form-item>
      <el-form-item label="结果位置">
        <el-input v-model="resultForm.location" />
      </el-form-item>
      <el-form-item label="结果格式">
        <el-input v-model="resultForm.format" />
      </el-form-item>
      <el-form-item label="结果版本">
        <el-input v-model="resultForm.version" />
      </el-form-item>
      <el-form-item label="生产时间">
        <el-input v-model="resultForm.time" />
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="resultForm.updateTime" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="resultForm.unit" />
      </el-form-item>
      <el-form-item label="小数位">
        <el-input v-model="resultForm.precision" />
      </el-form-item>
      <el-form-item label="时空尺度">
        <el-input v-model="resultForm.spaceTimeScale" />
      </el-form-item>
      <el-form-item label="唯一标识符">
        <el-input v-model="resultForm.identifier" />
      </el-form-item>
      <el-form-item label="数据可视化">
        <el-input v-model="resultForm.visualization" />
      </el-form-item>
      <el-form-item label="数据处理">
        <el-input v-model="resultForm.dataHandle" />
      </el-form-item>
      <el-form-item label="数据转换">
        <el-input v-model="resultForm.dataTransformation" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const resultForm = reactive({
      name: "",
      description: "",
      location: "",
      format: "",
      version: "",
      time: "",
      updateTime: "",
      unit: "",
      precision: "",
      spaceTimeScale: "",
      identifier: "",
      visualization: "",
      dataHandle: "",
      dataTransformation: "",
    });

    return {
      resultForm,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>