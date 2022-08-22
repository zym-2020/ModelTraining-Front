<template>
<el-scrollbar height="600px">
  <div>
    <el-form :model="form" label-width="100px" :rules="rules">
      <el-form-item label="步骤名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="步骤类型" prop="stepType" v-if="processType === 'method'">
        <el-select v-model="form.stepType" placeholder="请选择步骤类型" filterable allow-create>
          <el-option label="数据预处理" value="数据预处理" />
          <el-option label="模拟分析" value="模拟分析" />
          <el-option label="数据后处理" value="数据后处理" />
          <el-option label="其他(请直接输入)" value=" " disabled/>
        </el-select>
      </el-form-item>
      <el-form-item label="步骤类型" prop="stepType" v-else>
        <el-select v-model="form.stepType" placeholder="请选择步骤类型" filterable allow-create >
          <el-option label="误差评估" value="误差评估" />
          <el-option label="误差分析" value="误差分析" />
          <el-option label="不确定性分析" value="不确定性分析" />
          <el-option label="收敛性分析" value="收敛性分析" />
          <el-option label="其他(请直接输入)" value=" " disabled />
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型" prop="operateType">
        <el-select v-model="form.operateType" placeholder="请选择操作类型" >
          <el-option label="软件操作" value="软件操作" />
          <el-option label="服务运行" value="服务运行" />
          <el-option label="代码运行" value="代码运行" />
        </el-select>
      </el-form-item>
      <div style="display:flex;align-items:center ">
      <h5>从已添加的“模型资源”中选择此步骤中所使用的模型：</h5>
      <el-divider style="margin-left: 10px;width:250px" />
      </div>
      <el-form-item label="模型资源" prop="modelResource">
        <el-select value-key="modelId" v-model="form.modelResource" placeholder="请选择模型进行配置" >
          <el-option v-for="item in Modeltemp" :key="item.modelId" :label="item.modelBaseInfo.name" :value="item" />
        </el-select>
        <!-- <el-tag
          type="warning"
          v-for="(item, index) in form.modelResources"
          :key="index"
          closable
          @close="ModelClose(index)"
          >{{ item.modelBaseInfo.name }}</el-tag>
        <el-button type="primary" :icon="Plus" @click="addModel = true" /> -->
      </el-form-item>
      <div v-if="form.modelResource.modelId !=''">
        <div style="display:flex;align-items:center ">
        <h5>选择“数据资源”与模型中的输入、输出数据匹配：</h5>
        <el-divider style="margin-left: 10px;width:270px" />
        </div>
        <h4 class="mh4"><div class="necess">*</div>输入信息：</h4>
        <el-form-item v-for="item in form.modelResource.modelMetaData.modelInputs" :label="item.name" >
          <el-select value-key="dataId" v-model="item.dataResource" placeholder="请选择输入对应的数据资源" clearable >
            <el-option v-for="sitem in Datatemp" :key="sitem.dataId" :label="sitem.dataBaseInfo.name" :value="sitem" />
          </el-select>
        </el-form-item>
        <h4 class="mh4"><div class="necess">*</div>输出信息：</h4>
        <el-form-item v-for="item in form.modelResource.modelMetaData.modelOutputs" :label="item.name" >
          <el-select value-key="dataId" v-model="item.dataResource" placeholder="请选择输出对应的数据资源" clearable >
            <el-option v-for="sitem in Datatemp" :key="sitem.dataId" :label="sitem.dataBaseInfo.name" :value="sitem" />
          </el-select>
        </el-form-item>
        <h4 class="mh4">参数信息：</h4>
        <el-form-item v-for="item in form.modelResource.modelMetaData.parameters" :label="item.name">
          <el-select value-key="dataId" v-model="item.dataResource" placeholder="请选择参数对应的数据资源" clearable >
            <el-option v-for="sitem in Datatemp" :key="sitem.dataId" :label="sitem.dataBaseInfo.name" :value="sitem" />
          </el-select>
        </el-form-item>
      </div>
      <el-divider/>
      <el-form-item label="步骤描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
      <h5 class="rtext">单张图片大小限制为2.5M</h5>
      <el-form-item label="添加图片">
        <picture-upload
          :pictureList="pictureList"
          @returnPictureList="handlePictures"
        ></picture-upload>
      </el-form-item>
    <el-form-item label="参考文献">
        <el-tag
          v-for="tag in form.references"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{tag.length>33?tag.substring(0,22)+'......'+tag.substring(tag.length-10,tag.length):tag}}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
          + 添加参考文献
        </el-button>
    </el-form-item>
    <h5 style="margin-left: 50px;color:rgb(150,150,150);">建议格式:[1]岳天祥,刘纪远.生态地理建模中的多尺度问题[J].第四纪研究,2003(03):256-261.</h5>
      <el-form-item label="其他补充">
        <el-input v-model="form.other"  type="textarea" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button
        type="primary"
        plain
        @click="addProcessClick"
        v-if="type === 'add'"
        >确定</el-button>
      <el-button type="primary" plain @click="updateProcessClick" v-else
        >修改</el-button>
    </div>
  </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import PictureUpload from "./PictureUpload.vue";
import VideoUpload from "./SchemeVideoUpload.vue";
import { Plus,MoreFilled } from "@element-plus/icons-vue";
import ProcessVideoUpload from "./ProcessVideoUpload.vue";
import { notice } from "@/utils/notice";
import type {  FormRules, ElTable, ElInput } from 'element-plus'
import { equal } from "assert";

export default defineComponent({
  components: { PictureUpload, VideoUpload },
  props: {
    processItem: {
      type: Object,
    },
    operateType: {
      type: String,
    },
    Modeltemp: {
      type: Object,
    },
    Datatemp: {
      type: Object,
    },
    processType: {
      type: String,
    },
  },
  emits: ["returnProcess", "updateProcess"],
  setup(props, context) {
    const inputValue = ref('')
    const inputVisible = ref(false)
    const uploadProcessVideo = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const addModel= ref(false);
    const modelSelections  = ref<any[]>([])
    const addData= ref(false);
    const checkData= ref(false);
    const inputSelect = ref<any[]>([])
    const outputSelect = ref<any[]>([])
    const paramSelect = ref<any[]>([])
    const inputCheck = ref<any[]>([])
    const outputCheck  = ref<any[]>([])
    const paramCheck = ref<any[]>([])
    const type = computed(() => {
      return props.operateType;
    });
    const processType = computed(() => {
      return props.processType;
    });
    const processVideoItem = ref(
      (props.processItem as any).video
    );
    const returnProcessVideo = (val: any[]) => {
      processVideoItem.value = val
    };
    // const addDataDialog = () =>{
    //   if(form.dataResources){
    //   for(let i=0;i<form.modelResources.length;++i){
    //     for(let j=0;j<form.modelResources[i].modelMetaData.modelInputs.length;++j){
    //       form.modelResources[i].modelMetaData.modelInputs[j].dataResource = null
    //     }
    //     for(let j=0;j<form.modelResources[i].modelMetaData.modelOutputs.length;++j){
    //       form.modelResources[i].modelMetaData.modelOutputs[j].dataResource = null;
    //     }
    //   }
    //   }

    //   form.dataResources.splice(0,form.dataResources.length)
    //   addData.value=true
    // }
    // const modelSelectionChange = (val: any) =>{
    //     modelSelections.value=JSON.parse(JSON.stringify(val))
    //     for(let i=0;i<val.length;++i){
    //         inputSelect.value[i] = val[i].modelMetaData.modelInputs
    //         outputSelect.value[i] = val[i].modelMetaData.modelOutputs
    //         paramSelect.value[i] = val[i].modelMetaData.parameters
    //     }
          
    // }
    // const modelmultipleTableRef = ref<InstanceType<typeof ElTable>>()
    // const datamultipleTableRef = ref<InstanceType<typeof ElTable>>()
    // const modeltoggleSelection = () => {
    //   modelmultipleTableRef.value!.clearSelection()
    // }

    // const datatoggleSelection = () => {
    //   datamultipleTableRef.value!.clearSelection()
    // }

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入步骤名称', trigger: 'change' }
      ],
      stepType: [
        { required: true, message: '请选择步骤类型', trigger: 'blur' }
      ],
      operateType: [
        { required: true, message: '请选择操作类型', trigger: 'blur' }
      ],
      description: [
        { required: true, message: '请输入步骤描述', trigger: 'change' }
      ],
      dataResource: [
        { required: true, message: '请匹配信息', trigger: 'blur' }
      ],
      inputCheck: [
        { required: true, message: '请选择输入信息', trigger: 'blur' }
      ],
      outputCheck: [
        { required: true, message: '请选择输出信息', trigger: 'blur' }
      ],
      modelResource: [
        { required: true, message: '请添加模型资源', trigger: 'blur' }
      ],

      })

    const pictureList = ref<any[]>((props.processItem as any).pictures);

    const form = reactive({
      name: (props.processItem as any).name,
      stepType: (props.processItem as any).stepType,
      operateType: (props.processItem as any).operateType,
      description: (props.processItem as any).description,
      references: [] as any[],
      other: (props.processItem as any).other,
      pictures: (props.processItem as any).pictures,
      video: (props.processItem as any).video,
      modelResource:(props.processItem as any).modelResource,
      dataResources:(props.processItem as any).dataResources
    })

    const handleClose = (tag: string) => {
      form.references.splice(form.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        form.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    // const addModelClick = () => {
    //   for(let i=0;i<modelSelections.value.length;++i){
    //     if(!inputCheck.value[i] || inputCheck.value[i].length===0){
    //     notice("warning", "失败", modelSelections.value[i].modelBaseInfo.name+"的“输入信息”不能为空")
    //     return
    //     }
    //     if(!outputCheck.value[i] || outputCheck.value[i].length===0){
    //     notice("warning", "失败", modelSelections.value[i].modelBaseInfo.name+"的“输出信息”不能为空")
    //     return
    //     }
    //   }
    //   form.modelResources=modelSelections.value
    //   for(let i=0;i<form.modelResources.length;++i){
    //     if(inputCheck.value[i])
    //       form.modelResources[i].modelMetaData.modelInputs = inputCheck.value[i]
    //     else
    //       form.modelResources[i].modelMetaData.modelInputs = []
    //     if(outputCheck.value[i])
    //       form.modelResources[i].modelMetaData.modelOutputs = outputCheck.value[i]
    //     else
    //       form.modelResources[i].modelMetaData.modelOutputs = []
    //     if(paramCheck.value[i])
    //       form.modelResources[i].modelMetaData.parameters = paramCheck.value[i]
    //     else
    //       form.modelResources[i].modelMetaData.parameters = []
    //   }
    //   addModel.value = false;
    // };
    // const addDataClick = () => {
    //   for(let i=0;i<form.modelResources.length;++i){
    //     for(let j=0;j<form.modelResources[i].modelMetaData.modelInputs.length;++j){
    //       if(form.modelResources[i].modelMetaData.modelInputs[j].dataResource===null){
    //         notice("warning", "失败", "“输入信息”不能为空")
    //         return
    //       }
    //     }
    //     for(let j=0;j<form.modelResources[i].modelMetaData.modelOutputs.length;++j){
    //       if(form.modelResources[i].modelMetaData.modelOutputs[j].dataResource===null){
    //         notice("warning", "失败", "“输出信息”不能为空")
    //         return
    //       }
    //     }
    //   }
    //   const dataSelect = []
    //   for(let i=0;i<form.modelResources.length;++i){
    //      for(let j=0;j<form.modelResources[i].modelMetaData.modelInputs.length;++j){
    //       let f = true
    //       for(let t=0;t<dataSelect.length;++t)
    //         if(JSON.stringify(dataSelect[t]) === JSON.stringify(form.modelResources[i].modelMetaData.modelInputs[j].dataResource)){
    //           f = false
    //           break
    //         }
    //       if(f)
    //         dataSelect.push(form.modelResources[i].modelMetaData.modelInputs[j].dataResource)
    //      }
    //       for(let j=0;j<form.modelResources[i].modelMetaData.modelOutputs.length;++j){
    //         let f = true
    //         for(let t=0;t<dataSelect.length;++t)
    //           if(JSON.stringify(dataSelect[t]) === JSON.stringify(form.modelResources[i].modelMetaData.modelOutputs[j].dataResource)){
    //             f = false
    //             break
    //           }
    //         if(f)
    //         dataSelect.push(form.modelResources[i].modelMetaData.modelOutputs[j].dataResource)
    //      }
    //   }
    //   form.dataResources=dataSelect
    //   addData.value = false;
    // };

    // const ModelClose = (index: number) => {
    //   form.modelResources.splice(index, 1);
    // };
    // const DataClose = (index: number) => {
    //   form.dataResources.splice(index, 1);
    // };

    const addProcessClick = () => {
      if(!form.name){
        notice("warning", "失败", "“步骤名称”不能为空")
        return
      }
      if(!form.stepType){
        notice("warning", "失败", "“步骤类型”不能为空")
        return
      }
      if(!form.operateType){
        notice("warning", "失败", "“操作类型”不能为空")
        return
      }
      if(!form.modelResource.modelId){
        notice("warning", "失败", "“模型资源”不能为空")
        return
      }
      form.dataResources = [] as any []
      let flag = false
      for(let i = 0; i < form.modelResource.modelMetaData.modelInputs.length; ++i)
      {
        if(form.modelResource.modelMetaData.modelInputs[i].dataResource===null||form.modelResource.modelMetaData.modelInputs[i].dataResource ===""){
          form.modelResource.modelMetaData.modelInputs[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.modelInputs[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.modelInputs[i].dataResource)
          flag = true
        }
      }
      if(flag===false){
        notice("warning", "失败", "至少选择一项“输入信息”")
        return
      }

      flag = false
      for(let i = 0; i < form.modelResource.modelMetaData.modelOutputs.length; ++i)
      {
        if(form.modelResource.modelMetaData.modelOutputs[i].dataResource ===null||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===""){
          form.modelResource.modelMetaData.modelOutputs[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.modelOutputs[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.modelOutputs[i].dataResource)
          flag = true
        }
      }
      if(flag===false){
        notice("warning", "失败", "至少选择一项“输出信息”")
        return
      }
      for(let i = 0; i < form.modelResource.modelMetaData.parameters.length; ++i)
      {
        if(form.modelResource.modelMetaData.parameters[i].dataResource===null||form.modelResource.modelMetaData.parameters[i].dataResource ===""){
          form.modelResource.modelMetaData.parameters[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.parameters[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.parameters[i].dataResource)
        }
      }
      if(!form.description){
        notice("warning", "失败", "“步骤描述”不能为空")
        return
      }
      context.emit("returnProcess", form);
    };
    const updateProcessClick = () => {
      if(!form.name){
        notice("warning", "失败", "“步骤名称”不能为空")
        return
      }
      if(!form.stepType){
        notice("warning", "失败", "“步骤类型”不能为空")
        return
      }
      if(!form.operateType){
        notice("warning", "失败", "“操作类型”不能为空")
        return
      }
      if(!form.modelResource.modelId){
        notice("warning", "失败", "“模型资源”不能为空")
        return
      }
      form.dataResources = [] as any []
       let flag = false
      for(let i = 0; i < form.modelResource.modelMetaData.modelInputs.length; ++i)
      {
        if(form.modelResource.modelMetaData.modelInputs[i].dataResource===null||form.modelResource.modelMetaData.modelInputs[i].dataResource ===""){
          form.modelResource.modelMetaData.modelInputs[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.modelInputs[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.modelInputs[i].dataResource)
          flag = true
        }
      }
      if(flag===false){
        notice("warning", "失败", "至少选择一项“输入信息”")
        return
      }
      flag = false
      for(let i = 0; i < form.modelResource.modelMetaData.modelOutputs.length; ++i)
      {
        if(form.modelResource.modelMetaData.modelOutputs[i].dataResource ===null||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===""){
          form.modelResource.modelMetaData.modelOutputs[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.modelOutputs[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.modelOutputs[i].dataResource)
          flag = true
        }
      }
      if(flag===false){
        notice("warning", "失败", "至少选择一项“输出信息”")
        return
      }
      for(let i = 0; i < form.modelResource.modelMetaData.parameters.length; ++i)
      {
        if(form.modelResource.modelMetaData.parameters[i].dataResource===null||form.modelResource.modelMetaData.parameters[i].dataResource ===""){
          form.modelResource.modelMetaData.parameters[i].dataResource = null
        }
        else {
          let exist = false
          for(let j = 0; j < form.dataResources.length; ++j){
            if(form.modelResource.modelMetaData.parameters[i].dataResource.dataId === form.dataResources[j].dataId){
              exist = true
              break
            }
          }
          if(!exist)
            form.dataResources.push(form.modelResource.modelMetaData.parameters[i].dataResource)
        }
      }
      if(!form.description){
        notice("warning", "失败", "“步骤描述”不能为空")
        return
      }
      context.emit("updateProcess", form);
    };

    const handlePictures = (val: any[]) => {
      form.pictures = [];
      val.forEach((item) => {
        form.pictures.push(item.name);
      });
    };

    onMounted(()=>{
      if((props.processItem as any).references.length>0)
        form.references=(props.processItem as any).references
      if((props.processItem as any).dataResources.length>0)
        form.dataResources=(props.processItem as any).dataResources
    })
    return {
      form,
      Plus,
      MoreFilled,
      modelSelections,
      // addModelClick,
      // ModelClose,
      // addDataClick,
      // DataClose,
      // modeltoggleSelection,
      // modelmultipleTableRef,
      // datatoggleSelection,
      // datamultipleTableRef,
      // modelSelectionChange,
      // addDataDialog,
      addProcessClick,
      updateProcessClick,
      handlePictures,
      pictureList,
      type,
      rules,
      addModel,
      addData,
      checkData,
      processType,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      inputSelect,
      outputSelect,
      paramSelect,
      inputCheck,
      outputCheck,
      paramCheck,
      returnProcessVideo,
      processVideoItem,
      uploadProcessVideo
    };
  },
});
</script>

<style lang="scss" scoped>
.rtext{
  text-align:left;
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 30px;
  color: rgb(150, 150, 150);
}
.el-tag {
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}
.btn {
  text-align: center;
}

.necess{
  margin-right: 5px;
  color:lightcoral;
}
.el-checkbox{
  margin: 0 auto;
  min-width: 130px;
}
.mh4{
  display: flex;
  margin-left: 20px;
}
</style>