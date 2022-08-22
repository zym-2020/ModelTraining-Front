<template>
  <el-scrollbar height="600px">
  <el-form ref="ruleFormRef" :model="ComputeForm" status-icon label-width="60px" class="demo-ruleForm" :rules="rules">
  <p class="mflex"><el-icon><CaretBottom /></el-icon>操作系统:</p>
  <div class="mflex">
    <el-form-item label="名称" prop="name">
      <el-input class="minput" v-model="ComputeForm.system.name" placeholder="例如：Windows, Linux, MacOS"/>
    </el-form-item>
    <el-form-item label="版本" prop="version">
      <el-input  class="minput" v-model="ComputeForm.system.version" placeholder="例如：Windows 10 专业版"/>
    </el-form-item>
  </div>
    <p class="mflex"><el-icon><CaretBottom /></el-icon>CPU:</p>
    <div class="mflex">
      <el-form-item label="名称" prop="name">
        <el-input class="minput" v-model="ComputeForm.cpu.name"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input class="minput" v-model="ComputeForm.cpu.version"/>
      </el-form-item>
    </div>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ComputeForm.cpu.description"/>
    </el-form-item>
    <p class="mflex"><el-icon><CaretBottom /></el-icon>GPU:</p>
    <div class="mflex">
      <el-form-item label="名称" prop="name">
        <el-input class="minput" v-model="ComputeForm.gpu.name"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input class="minput" v-model="ComputeForm.gpu.version"/>
      </el-form-item>
    </div>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ComputeForm.gpu.description"/>
    </el-form-item>
    <p class="mflex"><el-icon><CaretBottom /></el-icon>内存:</p>
    <div class="mflex">
      <el-form-item label="名称" prop="name">
        <el-input class="minput" v-model="ComputeForm.ram.name"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input class="minput" v-model="ComputeForm.ram.version"/>
      </el-form-item>
    </div>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ComputeForm.ram.description"/>
    </el-form-item>
    <p class="mflex"><el-icon><CaretBottom /></el-icon>硬盘容量:</p>
    <div class="mflex">
      <el-form-item label="名称" prop="name">
        <el-input class="minput" v-model="ComputeForm.hdd.name"/>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input class="minput" v-model="ComputeForm.hdd.version"/>
      </el-form-item>
    </div>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ComputeForm.hdd.description"/>
    </el-form-item>
    <el-form-item label="其他" prop="">
      <el-input v-model="ComputeForm.other" type="textarea" placeholder="其他补充信息:包括名称和描述"/>
    </el-form-item>
    <h5 class="mflex"><div class="necess">*</div>选择在此计算资源中执行或存储的资源：</h5>
    <el-form-item label="模型资源" label-width="100px" >
      <el-tag
        style="margin-right:5px"
        type="warning"
        v-for="(item, index) in ComputeForm.modelResources"
        :key="index"
        closable
        @close="ModelClose(index)"
        >{{ item.modelBaseInfo.name }}</el-tag>
      <el-button type="primary" :icon="Plus" @click="addModel = true" />
    </el-form-item>
      <el-form-item label="数据资源" label-width="100px">
      <el-tag
        style="margin-right:5px"
        type="warning"
        v-for="(item, index) in ComputeForm.dataResources"
        :key="index"
        closable
        @close="DataClose(index)"
        >{{ item.dataBaseInfo.name }}</el-tag>
      <el-button type="primary" :icon="Plus" @click="addData= true" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="computeoperateType==='add'" @click="submitForm">提交</el-button>
      <el-button type="primary" v-else @click="submitUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</el-scrollbar>
  <el-dialog v-model="addModel" width="400px" title="添加模型资源">
      <el-table
          ref="modelmultipleTableRef"
          :data="Modeltemp"
          style="width: 100%"
          @selection-change="modelSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column align='center' prop="modelBaseInfo.name" label="模型资源名称" show-overflow-tooltip/>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="modeltoggleSelection">清空选择</el-button>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addModelClick">选择</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="addData" width="400px" title="添加数据资源">
      <el-table
          ref="datamultipleTableRef"
          :data="Datatemp"
          style="width: 100%"
          @selection-change="dataSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column align='center' prop="dataBaseInfo.name" label="数据资源名称" show-overflow-tooltip/>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="datatoggleSelection">清空选择</el-button>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addDataClick">选择</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, onMounted } from "vue";
import type { FormInstance, ElInput, FormRules, ElTable } from 'element-plus'
import { notice } from "@/utils/notice";
import router from "@/router";
import { saveComputeResources } from "@/api/request";
import { updateComputeResources } from "@/api/request";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    computeItem: {
      type: Object,
    },
    computeoperateType: {
      type: String,
    },
    Modeltemp: {
      type: Object,
    },
    Datatemp: {
      type: Object,
    },
  },
  emits: ["returnCompute","updateCompute"],
  setup(props,context) {
    const addModel= ref(false);
    const addData= ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const modelmultipleTableRef = ref<InstanceType<typeof ElTable>>()
    const datamultipleTableRef = ref<InstanceType<typeof ElTable>>()
    const modelSelections  = ref<any[]>()
    const dataSelections  = ref<any[]>()
    const computeResource = reactive({
        computeId:'',
        system:{
          name:'',
          version:''
        },
        cpu:{
          name:'',
          description:'',
          version:''
        },
        gpu:{
          name:'',
          description:'',
          version:''
        },
        ram:{
          name:'',
          description:'',
          version:''
        },
        hdd:{
          name:'',
          description:'',
          version:''
        },
        other:'',
        modelResources:[] as any[],
        dataResources:[] as any[]
    })
    
    const uuid = require('uuid')
    const ComputeForm = reactive({
        computeId:(props.computeItem as any).computeId,
        system:(props.computeItem as any).system,
        cpu:(props.computeItem as any).cpu,
        gpu:(props.computeItem as any).gpu,
        ram:(props.computeItem as any).ram,
        hdd:(props.computeItem as any).hdd,
        other:(props.computeItem as any).other,
        modelResources:(props.computeItem as any).modelResources,
        dataResources:(props.computeItem as any).dataResources
    });
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入名称', trigger: 'none' }
      ],
      description:[
        { required: true, message: '请输入描述', trigger: 'none' }
      ],
      publish: [
        { required: true, message: '请输入操作系统', trigger: 'change' }
      ],
      version: [
        { required: true, message: '请输入版本', trigger: 'none' }
      ],
      software: [
        { required: true, message: '请输入软件信息', trigger: 'change' }
      ],
      hardware: [
        { required: true, message: '请输入硬件设备', trigger: 'change' }
      ],
      modelResources: [
        { required: true, message: '请添加模型资源', trigger: 'change' }
      ],
      dataResources: [
        { required: true, message: '请添加数据资源', trigger: 'change' }
      ],
    })
      
    const submitForm = async () => {
      if(!ComputeForm.system.name){
        notice("warning", "失败", "“操作系统的名称”不能为空")
        return
      }
      if(!ComputeForm.system.version){
        notice("warning", "失败", "“操作系统的版本”不能为空")
        return
      }
      if(!ComputeForm.cpu.name){
        notice("warning", "失败", "“CPU的名称”不能为空")
        return
      }
      if(!ComputeForm.cpu.version){
        notice("warning", "失败", "“CPU的版本”不能为空")
        return
      }
      if(!ComputeForm.cpu.description){
        notice("warning", "失败", "“CPU的描述”不能为空")
        return
      }
      if(!ComputeForm.gpu.name){
        notice("warning", "失败", "“GPU的名称”不能为空")
        return
      }
      if(!ComputeForm.gpu.version){
        notice("warning", "失败", "“GPU的版本”不能为空")
        return
      }
      if(!ComputeForm.gpu.description){
        notice("warning", "失败", "“GPU的描述”不能为空")
        return
      }
      if(!ComputeForm.ram.name){
        notice("warning", "失败", "“内存的名称”不能为空")
        return
      }
      if(!ComputeForm.ram.version){
        notice("warning", "失败", "“内存的版本”不能为空")
        return
      }
      if(!ComputeForm.ram.description){
        notice("warning", "失败", "“内存的描述”不能为空")
        return
      }
      if(!ComputeForm.hdd.name){
        notice("warning", "失败", "“硬盘容量的名称”不能为空")
        return
      }
      if(!ComputeForm.hdd.version){
        notice("warning", "失败", "“硬盘容量的版本”不能为空")
        return
      }
      if(!ComputeForm.hdd.description){
        notice("warning", "失败", "“硬盘容量的描述”不能为空")
        return
      }
      if(ComputeForm.dataResources.length === 0 && ComputeForm.modelResources.length === 0){
        notice("warning", "失败", "“模型资源”或“数据资源”不能为空")
        return
      }
      computeResource.system = ComputeForm.system
      computeResource.cpu = ComputeForm.cpu
      computeResource.gpu = ComputeForm.gpu
      computeResource.ram = ComputeForm.ram
      computeResource.hdd = ComputeForm.hdd
      computeResource.other = ComputeForm.other
      computeResource.modelResources = ComputeForm.modelResources
      computeResource.dataResources = ComputeForm.dataResources
      computeResource.computeId = uuid.v4()
      const data = await saveComputeResources(
        (router.currentRoute.value.params.apply as any).id,
        computeResource
      );
      if (data != null && (data as any).code === 0) {
        context.emit("returnCompute", computeResource);
        notice("success", "成功", "保存成功！");
      }
    }
    const submitUpdate = async () => {
      if(!ComputeForm.system.name){
        notice("warning", "失败", "“操作系统的名称”不能为空")
        return
      }
      if(!ComputeForm.system.version){
        notice("warning", "失败", "“操作系统的版本”不能为空")
        return
      }
      if(!ComputeForm.cpu.name){
        notice("warning", "失败", "“CPU的名称”不能为空")
        return
      }
      if(!ComputeForm.cpu.version){
        notice("warning", "失败", "“CPU的版本”不能为空")
        return
      }
      if(!ComputeForm.cpu.description){
        notice("warning", "失败", "“CPU的描述”不能为空")
        return
      }
      if(!ComputeForm.gpu.name){
        notice("warning", "失败", "“GPU的名称”不能为空")
        return
      }
      if(!ComputeForm.gpu.version){
        notice("warning", "失败", "“GPU的版本”不能为空")
        return
      }
      if(!ComputeForm.gpu.description){
        notice("warning", "失败", "“GPU的描述”不能为空")
        return
      }
      if(!ComputeForm.ram.name){
        notice("warning", "失败", "“内存的名称”不能为空")
        return
      }
      if(!ComputeForm.ram.version){
        notice("warning", "失败", "“内存的版本”不能为空")
        return
      }
      if(!ComputeForm.ram.description){
        notice("warning", "失败", "“内存的描述”不能为空")
        return
      }
      if(!ComputeForm.hdd.name){
        notice("warning", "失败", "“硬盘容量的名称”不能为空")
        return
      }
      if(!ComputeForm.hdd.version){
        notice("warning", "失败", "“硬盘容量的版本”不能为空")
        return
      }
      if(!ComputeForm.hdd.description){
        notice("warning", "失败", "“硬盘容量的描述”不能为空")
        return
      }
      if(ComputeForm.dataResources.length === 0 && ComputeForm.modelResources.length === 0){
        notice("warning", "失败", "“模型资源”或“数据资源”不能为空")
        return
      }
      computeResource.system = ComputeForm.system
      computeResource.cpu = ComputeForm.cpu
      computeResource.gpu = ComputeForm.gpu
      computeResource.ram = ComputeForm.ram
      computeResource.hdd = ComputeForm.hdd
      computeResource.other = ComputeForm.other
      computeResource.modelResources = ComputeForm.modelResources
      computeResource.dataResources = ComputeForm.dataResources
      computeResource.computeId = (props.computeItem as any).computeId
      const data = await updateComputeResources(
        (router.currentRoute.value.params.apply as any).id,
        computeResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
        context.emit("updateCompute", computeResource);
      }
    }

    onMounted(() => {
      if((props.computeItem as any).modelResources.length>0)
        ComputeForm.modelResources=(props.computeItem as any).modelResources
      if((props.computeItem as any).dataResources.length>0)
        ComputeForm.dataResources=(props.computeItem as any).dataResources
    })
    const ModelClose = (index: number) => {
      ComputeForm.modelResources.splice(index, 1);
    };
    const DataClose = (index: number) => {
      ComputeForm.dataResources.splice(index, 1);
    };
    const modelSelectionChange = (val: any) =>{
        modelSelections.value=val
    }
    const dataSelectionChange = (val: any) =>{
        dataSelections.value=val
    }
    const modeltoggleSelection = () => {
      modelmultipleTableRef.value!.clearSelection()
    }

    const datatoggleSelection = () => {
      datamultipleTableRef.value!.clearSelection()
    }
    const addModelClick = () => {
      ComputeForm.modelResources=modelSelections.value
      addModel.value = false;
    };
    const addDataClick = () => {
      ComputeForm.dataResources=dataSelections.value
      addData.value = false;
    };
    return {
      ComputeForm,
      submitForm,
      submitUpdate,
      computeResource,
      uuid,
      Plus,
      InputRef,
      rules,
      ModelClose,
      DataClose,
      addModel,
      addData,
      modelSelectionChange,
      dataSelectionChange,
      modeltoggleSelection,
      datatoggleSelection,
      modelmultipleTableRef,
      datamultipleTableRef,
      modelSelections,
      dataSelections,
      addModelClick,
      addDataClick
    }

  }

});
</script>
<style lang="scss" scoped>
.mflex{
  display:flex;
  align-items:center
}
.necess{
  margin-right: 5px;
  color:lightcoral;
}
.minput{
  width: 220px;
}

</style>
