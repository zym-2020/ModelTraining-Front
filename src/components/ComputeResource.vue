<template>
  <div class="mform">
    <el-form label-position="right" label-width="100px" :model="computeResource" :rules="rules">
      <el-form-item class="mflex" label="操作系统" prop="publish">
        <el-input v-model="computeResource.SystemName" @change="changeHandle" placeholder="示例：Windows, Linux, MacOS" />
        <el-input v-model="computeResource.SystemVersion" @change="changeHandle" placeholder="示例：Windows 10 专业版" />
      </el-form-item>
      <el-form-item label="CPU" prop="version">
        <el-input v-model="computeResource.CPUName" @change="changeHandle" />
        <el-input v-model="computeResource.CPUDescription" @change="changeHandle"/>
        <el-input v-model="computeResource.CPUVersion" @change="changeHandle"/>
      </el-form-item>
      <el-form-item label="GPU" prop="software">
        <el-input v-model="computeResource.GPUName" @change="changeHandle"/>
        <el-input v-model="computeResource.GPUDescription" @change="changeHandle"/>
        <el-input v-model="computeResource.GPUVersion" @change="changeHandle"/>
      </el-form-item>
      <el-form-item label="内存" prop="hardware">
        <el-input v-model="computeResource.RAMName" @change="changeHandle"/>
        <el-input v-model="computeResource.RAMDescription" @change="changeHandle"/>
        <el-input v-model="computeResource.RAMVersion" @change="changeHandle"/>
      </el-form-item>
      <el-form-item label="硬盘容量" prop="hardware">
        <el-input v-model="computeResource.HDDName" @change="changeHandle"/>
        <el-input v-model="computeResource.HDDDescription" @change="changeHandle"/>
        <el-input v-model="computeResource.HDDVersion" @change="changeHandle"/>
      </el-form-item>
      <el-form-item label="其他补充信息" prop="hardware">
        <el-input v-model="computeResource.other" @change="changeHandle"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import type { FormRules } from 'element-plus'
export default defineComponent({
  props: {
    computeResourceValue: {
      type: Object,
    },
  },
  emits: ["returnComputResource"],
  setup(props, context) {
    const computeResource = reactive({
      SystemName: (props.computeResourceValue as any).SystemName,
      SystemVersion: (props.computeResourceValue as any).SystemVersion,
      CPUName: (props.computeResourceValue as any).CPUName,
      CPUDescription: (props.computeResourceValue as any).CPUDescription,
      CPUVersion: (props.computeResourceValue as any).CPUVersion,
      GPUName: (props.computeResourceValue as any).GPUName,
      GPUDescription: (props.computeResourceValue as any).GPUDescription,
      GPUVersion: (props.computeResourceValue as any).GPUVersion,
      RAMName: (props.computeResourceValue as any).RAMName,
      RAMDescription: (props.computeResourceValue as any).RAMDescription,
      RAMVersion: (props.computeResourceValue as any).RAMVersion,
      HDDName: (props.computeResourceValue as any).HDDName,
      HDDDescription: (props.computeResourceValue as any).HDDDescription,
      HDDVersion: (props.computeResourceValue as any).HDDVersion,
      other: (props.computeResourceValue as any).other,
      
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
      hardware: [
        { required: true, message: '请输入硬件信息', trigger: 'change' }
      ],
    })

    onMounted(() => {
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
.mflex{
  display: flex;
}
.mform {
  width: 1300px;
}
</style>