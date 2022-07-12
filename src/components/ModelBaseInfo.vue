<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
      <el-form-item label="模型概念">
        <el-input v-model="dataBaseInfo.conception" />
      </el-form-item>
      <el-form-item label="模型存储位置">
        <el-input v-model="dataBaseInfo.storage" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="dataBaseInfo.version" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="dataBaseInfo.unit" />
      </el-form-item>
      <el-form-item label="模型范围">
        <el-input v-model="dataBaseInfo.range" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const dataBaseInfo = reactive({
      conception: "",
      storage: "",
      version: "",
      unit: "",
      range: "",
    });

    return {
      dataBaseInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>