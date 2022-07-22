<template>
  <div class="mform">
    <el-form
      label-position="right"
      label-width="100px"
      :model="computeResource"
      :rules="rules"
    >
      <el-form-item label="操作系统" prop="publish">
        <el-input v-model="computeResource.publish" @change="changeHandle" placeholder="示例：win10"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="computeResource.version" @change="changeHandle" placeholder="示例：Windows 10 专业版" />
      </el-form-item>
      <el-form-item label="软件信息" prop="software">
        <el-input v-model="computeResource.software" @change="changeHandle" placeholder="示例：Excel 2019"/>
      </el-form-item>
      <el-form-item label="硬件设备" prop="hardware">
        <el-input v-model="computeResource.hardware" @change="changeHandle" placeholder="示例：CPU、内存、硬盘容量、GPU"/>
      </el-form-item>
      <el-form-item label="资源库" prop="repository">
        <el-input v-model="computeResource.repository" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type {  FormRules } from 'element-plus'
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
      repository: (props.computeResourceValue as any).repository,
    });

    const changeHandle = () => {
      context.emit("returnComputResource", computeResource);
    };
    const rules = reactive<FormRules>({
      publish: [
        { required: true, message: '请输入操作系统', trigger: 'change' }
      ],
      version: [
        { required: true, message: '请输入版本', trigger: 'change' }
      ],
      software: [
        { required: true, message: '请输入软件信息', trigger: 'change' }
      ],
      })
    return {
      computeResource,
      changeHandle,
      rules
    };
  },
});
</script>

<style lang="scss" scoped>
.mform{
  width: 1300px;
}
</style>