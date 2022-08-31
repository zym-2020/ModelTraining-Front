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
    <h5 style="margin-left: 30px;color:rgb(150,150,150);">建议格式:[1]岳天祥,刘纪远.生态地理建模中的多尺度问题[J].第四纪研究,2003(03):256-261.</h5>
      <el-form-item label="添加图片">
        <picture-upload
          :pictureList="pictureList"
          @returnPictureList="handlePictures"
        ></picture-upload>
      </el-form-item>
      <el-form-item label="添加视频" style="display: flex;align-items:flex-end;">
      <div style="display: flex;align-items:center;">
        <el-button v-if="!(processVideoItem && processVideoItem.id!='')" style="margin-top: 20px;margin-right: 10px;" type="primary" @click="uploadClick" >视频上传</el-button>
        <div v-if="processVideoItem && processVideoItem.id!=''">已上传文件：<el-tag>{{processVideoItem.name}}</el-tag></div>
        <el-button v-if="processVideoItem && processVideoItem.id!=''" @click="deleteVideo" style="margin-left: 10px;" type="danger" size="small" plain>删除</el-button>
        </div>
      </el-form-item>
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
  <el-dialog v-if="uploadProcessVideo" v-model="uploadProcessVideo">
    <process-video-upload :type="type" :videoItem="processVideoItem" :process="processItem" @returnVideo="returnProcessVideo"></process-video-upload>
</el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import PictureUpload from "./PictureUpload.vue";
import { Plus,MoreFilled } from "@element-plus/icons-vue";
import ProcessVideoUpload from "./ProcessVideoUpload.vue";
import { getProcessLength, removeProcessVideoFile, removeTempVideoFile} from "@/api/request";
import { notice } from "@/utils/notice";
import type {  FormRules, ElTable, ElInput } from 'element-plus'
import { equal } from "assert";
import router from "@/router";

export default defineComponent({
  components: { PictureUpload,ProcessVideoUpload },
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
    const processItem = computed(() => {
      return props.processItem;
    });
    const type = computed(() => {
      return props.operateType;
    });
    const processType = computed(() => {
      return props.processType;
    });
    const processVideoItem = ref(
      (props.processItem as any).video
    );
    const returnProcessVideo = (val: any) => {
      processVideoItem.value = val
      form.video = JSON.parse(JSON.stringify(val))
    };

    const deleteVideo = async () => {
      if(type.value!="add"){
        const data = await removeProcessVideoFile((router.currentRoute.value.params.apply as any).id,processItem.value);
        if (data != null && (data as any).code === 0) {
          notice("success", "成功", "删除成功！");
          processVideoItem.value.name = ''
          processVideoItem.value.id = ''
        }
      }
      else{
        const data = await removeTempVideoFile((router.currentRoute.value.params.apply as any).id, {uuid:processVideoItem.value.id});
        if (data != null && (data as any).code === 0) {
          notice("success", "成功", "删除成功！");
          processVideoItem.value.name = ''
          processVideoItem.value.id = ''
        }
      }
    }

    const uploadClick = async() =>{
      uploadProcessVideo.value=true
    }

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
        if(form.modelResource.modelMetaData.modelInputs[i].dataResource===undefined
        ||form.modelResource.modelMetaData.modelInputs[i].dataResource ===""
        ||form.modelResource.modelMetaData.modelInputs[i].dataResource ===null){
          form.modelResource.modelMetaData.modelInputs[i].dataResource=null
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
        if(form.modelResource.modelMetaData.modelOutputs[i].dataResource ===undefined
        ||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===""
        ||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===null){
          form.modelResource.modelMetaData.modelOutputs[i].dataResource=null
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
        if(form.modelResource.modelMetaData.parameters[i].dataResource===undefined 
        ||form.modelResource.modelMetaData.parameters[i].dataResource ===""
        ||form.modelResource.modelMetaData.parameters[i].dataResource ===null){
          form.modelResource.modelMetaData.parameters[i].dataResource=null
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
        if(form.modelResource.modelMetaData.modelInputs[i].dataResource===undefined
        ||form.modelResource.modelMetaData.modelInputs[i].dataResource ===""
        ||form.modelResource.modelMetaData.modelInputs[i].dataResource ===null){
          form.modelResource.modelMetaData.modelInputs[i].dataResource=null
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
        if(form.modelResource.modelMetaData.modelOutputs[i].dataResource ===undefined
        ||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===""
        ||form.modelResource.modelMetaData.modelOutputs[i].dataResource ===null){
          form.modelResource.modelMetaData.modelOutputs[i].dataResource =null
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
        if(form.modelResource.modelMetaData.parameters[i].dataResource===undefined
        ||form.modelResource.modelMetaData.parameters[i].dataResource ===""
        ||form.modelResource.modelMetaData.parameters[i].dataResource ===null){
          form.modelResource.modelMetaData.parameters[i].dataResource=null
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
      uploadProcessVideo,
      deleteVideo,
      uploadClick
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