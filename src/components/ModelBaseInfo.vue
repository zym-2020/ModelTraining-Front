<template>
  <div>
    <el-form label-position="right" label-width="110px" :model="dataBaseInfo" :rules="rules">
      <el-form-item label="模型概念" prop="conception">
        <el-input v-model="dataBaseInfo.conception" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="模型存储位置" prop="storage">
        <el-input v-model="dataBaseInfo.storage" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="dataBaseInfo.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="dataBaseInfo.unit" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="模型范围" prop="range">
        <el-input v-model="dataBaseInfo.range" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type {  FormRules } from 'element-plus'
export default defineComponent({
  props: {
    modelBaseInfoValue: {
      type: Object,
    },
  },
  emits: ["returnModelBaseInfo"],
  setup(props, context) {
    const dataBaseInfo = reactive({
      conception: (props.modelBaseInfoValue as any).conception,
      storage: (props.modelBaseInfoValue as any).storage,
      version: (props.modelBaseInfoValue as any).version,
      unit: (props.modelBaseInfoValue as any).unit,
      range: (props.modelBaseInfoValue as any).range,
    });

    const rules = reactive<FormRules>({
      conception: [
        { required: true, message: '请输入模型概念', trigger: 'change' }
      ],
      storage: [
        { required: true, message: '请输入模型存储位置', trigger: 'change' }
      ],
      version: [
        { required: true, message: '请输入版本', trigger: 'change' }
      ],
/*       unit: [
        { required: true, message: '请输入单位', trigger: 'change' }
      ],
      range: [
        { required: true, message: '请输入模型范围', trigger: 'change' }
      ], */
      })

    const changeHandle = () => {
      context.emit("returnModelBaseInfo", dataBaseInfo);
    };

    return {
      dataBaseInfo,
      changeHandle,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
</style>