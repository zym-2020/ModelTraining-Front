<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="metaData" :rules="rules">
      <el-form-item label="模型假设" prop="hypothesis">
        <el-input v-model="metaData.hypothesis" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="算法/等式" prop="algorithm">
        <el-input v-model="metaData.algorithm" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="输入" prop="input">
        <el-input v-model="metaData.input" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="输出" prop="output">
        <el-input v-model="metaData.output" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="参数" prop="parameter">
        <el-input v-model="metaData.parameter" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="迭代次数" prop="iterate">
        <el-input v-model="metaData.iterate" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="metaData.unit" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type {  FormRules } from 'element-plus'
export default defineComponent({
  props: {
    modelMetaDataValue: {
      type: Object,
    },
  },
  emits: ["returnModelMetaData"],
  setup(props, context) {
    const metaData = reactive({
      hypothesis: (props.modelMetaDataValue as any).hypothesis,
      algorithm: (props.modelMetaDataValue as any).algorithm,
      input: (props.modelMetaDataValue as any).input,
      output: (props.modelMetaDataValue as any).output,
      parameter: (props.modelMetaDataValue as any).parameter,
      iterate: (props.modelMetaDataValue as any).iterate,
      unit: (props.modelMetaDataValue as any).unit,
    });

    const changeHandle = () => {
      context.emit("returnModelMetaData", metaData);
    };
    const rules = reactive<FormRules>({
      hypothesis: [
        { required: true, message: '请输入模型假设', trigger: 'change' }
      ],
      algorithm: [
        { required: true, message: '请输入算法/算式', trigger: 'change' }
      ],
      input: [
        { required: true, message: '请输入输入内容', trigger: 'change' }
      ],
      output: [
        { required: true, message: '请输入输出内容', trigger: 'change' }
      ],
      parameter: [
        { required: true, message: '请输入参数', trigger: 'change' }
      ],
      iterate: [
        { required: true, message: '请输入迭代次数', trigger: 'change' },
        /* { type:'number', message: '请输入数字', trigger: 'change' }, */
      ],
/*       unit: [
        { required: true, message: '请输入单位', trigger: 'change' }
      ] */
      })
    return {
      metaData,
      changeHandle,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
</style>