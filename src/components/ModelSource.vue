<template>
  <div>
    <el-form label-position="right" label-width="110px" :model="source" :rules="rules">
      <el-form-item label="参考文献" prop="references">
        <el-input v-model="source.references" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="出版组织机构" prop="publication">
        <el-input v-model="source.publication" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="发展机构" prop="develop">
        <el-input v-model="source.develop" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type {  FormRules } from 'element-plus'
export default defineComponent({
  props: {
    modelSourceValue: {
      type: Object,
    },
  },
  emits: ["returnModelSource"],
  setup(props, context) {
    const source = reactive({
      references: (props.modelSourceValue as any).references,
      publication: (props.modelSourceValue as any).publication,
      develop: (props.modelSourceValue as any).develop,
    });

    const changeHandle = () => {
      context.emit("returnModelSource", source);
    };
    const rules = reactive<FormRules>({
      publication: [
        { required: true, message: '请输入出版组织机构', trigger: 'change' }
      ]
      })
    return {
      source,
      changeHandle,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
</style>