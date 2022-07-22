<template>
  <div>
    <el-form label-position="right" label-width="110px" :model="dataActive" :rules="rules">
      <el-form-item label="数据处理步骤" prop="handle">
        <el-input v-model="dataActive.handle" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据转换步骤" prop="conversion">
        <el-input v-model="dataActive.conversion" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type {  FormRules } from 'element-plus'
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
    const rules = reactive<FormRules>({
      handle: [
        { required: true, message: '请输入数据处理步骤', trigger: 'change' }
      ],
/*       conversion: [
        { required: true, message: '请输入数据转换步骤', trigger: 'change' }
      ], */
      })
    return {
      dataActive,
      changeHandle,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
</style>