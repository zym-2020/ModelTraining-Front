<template>
  <div class="result">
    <div class="title"><h2>3 实验结果</h2></div>
    <el-divider />
      <div class="result-validation">
      <div class="small-title">
        <div class="icon"></div>
        <h4>3.1 结果验证</h4>
        <h5 style="color:rgb(150,150,150)">（如实验没有该步骤，可不填）</h5>
      </div>
        <div>
    <el-form :model="resultValidationForm" label-width="100px" :rules="rules">
      <el-form-item label="步骤名称" prop="name">
        <el-input v-model="resultValidationForm.name" />
      </el-form-item>
      <el-form-item label="步骤描述" prop="description">
        <el-input
          v-model="resultValidationForm.description"
          type="textarea"
          :rows="3"
          placeholder="说明利用哪个验证指标对结果进行验证，以及验证的结果"
        />
      </el-form-item>
      <el-form-item label="验证指标" prop="stepType" >
        <el-select v-model="resultValidationForm.stepType" placeholder="请选择验证指标" filterable allow-create clearable>
          <el-option label="MSE" value="MSE" />
          <el-option label="RMSE" value="RMSE" />
          <el-option label="MAE" value="MAE" />
          <el-option label="MAPE" value="MAPE" />
          <el-option label="其他(请直接输入)" value=" " disabled/>
        </el-select>
      </el-form-item>
      <div style="display:flex;align-items:center ">

      </div>
      <el-form-item label="输入数据" prop="dataResource"  style="display:flex;align-items: center ">
          <el-select value-key="dataId" v-model="resultValidationForm.dataResource" placeholder="请选择输入数据资源" clearable>
            <el-option v-for="sitem in Datatemp" :key="sitem.dataId" :label="sitem.dataBaseInfo.name" :value="sitem" />
          </el-select>
                  <h5 style="color:rgb(150,150,150);margin-left:10px">从已添加的“数据资源”中选择此步骤中的输入数据</h5>
      </el-form-item>
    <h5 class="mh5a"><el-icon><CaretBottom /></el-icon>输出数据:</h5>
    <ul class="mul">
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>名称</div><el-input class="liinput" v-model="resultValidationForm.resultOutput.name"  />
        </div> 
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>描述</div><el-input class="liinput" v-model="resultValidationForm.resultOutput.description" />
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>生产时间</div><el-input class="liinput" v-model="resultValidationForm.resultOutput.time" />
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text" style="width:135px"><div class="necess">*</div>数据存储位置</div>
            <el-input v-model="resultValidationForm.resultOutput.storage" placeholder="详细说明获取该数据的原始路径" :readonly="resultValidationForm.resultOutput.isUpload==='true'"/>
            <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="storageUpload1">上传</el-button>
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>数据格式</div><el-input class="liinput" v-model="resultValidationForm.resultOutput.format" />
        </div>
      </li>
    </ul>
    </el-form>
    <div class="mflex2">
    <picture-upload :pictureList="resultValidationPictureList" @returnPictureList="returnResultValidationPictures">
    </picture-upload>
            <div style="display: flex;align-items:flex-end;">
      <el-button style="margin-left: 50px;margin-right: 10px;" type="primary" @click="uploadResultValidationVideo=true">视频上传</el-button>
        <div v-if="resultValidationVideoItem && resultValidationVideoItem.id!=''">已上传文件：<el-tag>{{resultValidationVideoItem.name}}</el-tag></div>
        </div>
    </div>
  </div>
    </div>
    <div class="result-validation">
      <div class="small-title">
        <div class="icon"></div>
        <h4>3.2 结果可视化</h4>
        <h5 style="color:rgb(150,150,150)">（如实验没有该步骤，可不填）</h5>
      </div>
      <div>
    <el-form :model="resultVisualizationForm" label-width="100px" :rules="rules">
      <el-form-item label="步骤名称" prop="name">
        <el-input v-model="resultVisualizationForm.name" />
      </el-form-item>
      <el-form-item label="步骤描述" prop="description">
        <el-input
          v-model="resultVisualizationForm.description"
          type="textarea"
          :rows="3"
          placeholder="说明利用什么方法/软件对结果数据进行可视化分析"
        />
      </el-form-item>
      <el-form-item label="步骤类型" prop="stepType" >
        <el-select v-model="resultVisualizationForm.stepType" placeholder="请选择步骤类型" clearable>
          <el-option label="可视化方法" value="可视化方法" />
          <el-option label="可视化软件" value="可视化软件" />
        </el-select>
      </el-form-item>
      <div v-if="resultVisualizationForm.stepType==='可视化软件'">
        <el-form-item label="软件需求" prop="softName" >
          <el-input v-model="resultVisualizationForm.softName" placeholder="需要说明所需的软件名称" />
        </el-form-item>
        <el-form-item label="软件版本" prop="softVersion" >
          <el-input v-model="resultVisualizationForm.softVersion" placeholder="需要说明所需的软件版本"/>
        </el-form-item>
        <el-form-item label="存储位置" prop="softStorage">
          <el-input v-model="resultVisualizationForm.softStorage" placeholder="详细说明获取该软件的原始路径"/>
        </el-form-item>
        <el-form-item label="软件依赖" prop="softDepend" >
          <el-input v-model="resultVisualizationForm.softDepend" placeholder="详细说明软件涉及的依赖"/>
        </el-form-item>
      </div>
      <div v-if="resultVisualizationForm.stepType==='可视化方法'">
        <el-form-item label="代码内容" prop="codeContent">
          <el-input v-model="resultVisualizationForm.codeContent"/>
        </el-form-item>
        <el-form-item label="编程语言" prop="codeLanguage" >
          <el-input v-model="resultVisualizationForm.codeLanguage" placeholder="例如：Fortran77, Fortran90, C, C++, Python, Java, IDL, Matlab等"/>
        </el-form-item>
        <el-form-item label="模型依赖库" prop="codeDepend" >
          <el-input v-model="resultVisualizationForm.codeDepend" placeholder="部署或运行代码所需要引入的依赖库，例如Scrapy、Urllib3等"/>
        </el-form-item>
      </div>

      <el-form-item label="输入数据" prop="dataResource" style="display:flex;align-items: center ">
          <el-select value-key="dataId" v-model="resultVisualizationForm.dataResource" placeholder="请选择输入数据资源" clearable>
            <el-option v-for="sitem in Datatemp" :key="sitem.dataId" :label="sitem.dataBaseInfo.name" :value="sitem" />
          </el-select>
          <h5 style="color:rgb(150,150,150);margin-left:10px">从已添加的“数据资源”中选择此步骤中的输入数据</h5>
      </el-form-item>

      <h5 class="mh5a"><el-icon><CaretBottom /></el-icon>输出数据:</h5>
    <ul class="mul">
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>名称</div><el-input class="liinput" v-model="resultVisualizationForm.resultOutput.name"  />
        </div> 
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>描述</div><el-input class="liinput" v-model="resultVisualizationForm.resultOutput.description"/>
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>生产时间</div><el-input class="liinput" v-model="resultVisualizationForm.resultOutput.time" />
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text" style="width:135px"><div class="necess">*</div>数据存储位置</div>
            <el-input v-model="resultVisualizationForm.resultOutput.storage" placeholder="详细说明获取该数据的原始路径" :readonly="resultVisualizationForm.resultOutput.isUpload==='true'"/>
            <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="storageUpload2">上传</el-button>
        </div>
      </li>
      <li>
        <div class="mflexa">
          <div class="text"><div class="necess">*</div>数据格式</div><el-input class="liinput" v-model="resultVisualizationForm.resultOutput.format" />
        </div>
      </li>
    </ul>
    </el-form>

    <div class="mflex2">
    <picture-upload :pictureList="resultVisualizationPictureList" @returnPictureList="returnResultVisualizationPictures">
    </picture-upload>
        <div style="display: flex;align-items:flex-end;">
    <el-button style="margin-left: 50px;margin-right: 10px;" type="primary" @click="uploadResultVisualizationVideo=true">视频上传</el-button>
      <div v-if="resultVisualizationVideoItem && resultVisualizationVideoItem.id!=''">已上传文件：<el-tag>{{resultVisualizationVideoItem.name}}</el-tag></div>
      </div>
    </div>

  </div>
    </div>
    
    <div class="result-conclusion">
      <div class="small-title">
        <div class="icon"></div>
        <h4>3.3 结果分析</h4>
      </div>
        <div class="inputbody">
        <el-form class="input" :model="conclusionForm" :rules="rules">
          <el-form-item  prop="conclusionText">
        <div style="display:flex"><div class="necess">*</div>结果分析及结论：</div>
            <el-input v-model="conclusionForm.conclusionText" :rows="3" type="textarea" placeholder="具体说明对该实验结果的分析以及得出的结论"/>
          </el-form-item>
          <el-form-item prop="conclusionPaper" > 
        相关文献：
            <el-input v-model="conclusionForm.conclusionPaper" :rows="3" type="textarea" placeholder="与本实验相关的实验人员发表的论文"/>
          </el-form-item>
        </el-form>
        <div class="mflex2">
        <picture-upload :pictureList="conclusionPictureList" @returnPictureList="returnConclusionPictures">
        </picture-upload>
          <div style="display: flex;align-items:flex-end;">
          <el-button style="margin-left: 50px;margin-right: 10px;" type="primary" @click="uploadConclusionVideo=true">视频上传</el-button>
        <div v-if="conclusionVideoItem && conclusionVideoItem.id!=''">已上传文件：<el-tag>{{conclusionVideoItem.name}}</el-tag></div>
        </div>
        </div>

      </div>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="saveClick">保存实验结果内容</el-button>
    </div>
  </div>
  <el-dialog v-if="upload" v-model="upload" width="500px" title="数据上传" >
    <el-form :model="uploadForm" label-width="100px">
    <el-form-item label="上传文件" prop="file">
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        :auto-upload="false"
        :on-change="changeupload"
        :on-remove="removeupload"
        :limit="1"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
              最多上传一个文件，请勿重复上传，上传状态变更后请及时保存
          </div>
      </template>
        <el-button :disabled="uploadForm.location!=''" style="margin-left:10px" class="ml-3" type="success" @click="submitUpload">
          上传
        </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="uploadForm.location" label="下载地址" prop="location">
        <el-input v-model="uploadForm.location" :disabled="true" type="textarea"/>
        <el-button style="margin-top:10px" class="ml-3" type="danger" @click="deleteUpload">
          删除
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
    <el-dialog v-if="uploadResultValidationVideo" v-model="uploadResultValidationVideo">
        <result-validation-video-upload :videoItem="resultValidationVideoItem" @returnVideo="returnResultValidationVideos"></result-validation-video-upload>
    </el-dialog>
    <el-dialog v-if="uploadResultVisualizationVideo" v-model="uploadResultVisualizationVideo">
        <result-visualization-video-upload :videoItem="resultVisualizationVideoItem" @returnVideo="returnResultVisualizationVideos"></result-visualization-video-upload>
    </el-dialog>
    <el-dialog v-if="uploadConclusionVideo" v-model="uploadConclusionVideo">
        <conclusion-video-upload :videoItem="conclusionVideoItem" @returnVideo="returnConclusionVideos"></conclusion-video-upload>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import ResultValidationVideoUpload from "./ResultValidationVideoUpload.vue";
import ResultVisualizationVideoUpload from "./ResultVisualizationVideoUpload.vue";
import ConclusionVideoUpload from "./ConclusionVideoUpload.vue";
import VideoUpload from "./SchemeVideoUpload.vue";
import PictureUpload from "./PictureUpload.vue";
import router from "@/router";
import { step1 } from "@/utils/ExampleData";
import { deleteData, deleteresultValidationStorage, deleteresultVisualizationStorage, uploadData, saveResult } from "@/api/request";
import { notice } from "@/utils/notice";
import { Delete, Edit } from "@element-plus/icons-vue";
import type { FormRules } from 'element-plus'
export default defineComponent({
  components: { PictureUpload,VideoUpload,ConclusionVideoUpload, ResultVisualizationVideoUpload,ResultValidationVideoUpload},
  props: {
    resultValue: {
      type: Object,
    },
    methodValue: {
      type: Object,
    },
  },
  emits: ['rerturnResult'],
  setup(props,context) {
    const uploadType =ref(-1)
    const uploadRef =ref([] as any[])
    const upload = ref(false);
    const fileid = ref("")
    const dataList = ref<any[]>((props.methodValue as any).resource.dataResources);
    let Datatemp = ref<any[]>(dataList.value)
    const uploadResultValidationVideo = ref(false)
    const uploadResultVisualizationVideo = ref(false)
    const uploadConclusionVideo = ref(false)

    const resultValidationForm = reactive({
      name: (props.resultValue as any).resultValidation.name,
      description: (props.resultValue as any).resultValidation.description,
      stepType: (props.resultValue as any).resultValidation.stepType,
      dataResource: (props.resultValue as any).resultValidation.dataResource,
      resultOutput: (props.resultValue as any).resultValidation.resultOutput,
      softName: (props.resultValue as any).resultValidation.softName,
      softVersion: (props.resultValue as any).resultValidation.softVersion,
      softStorage: (props.resultValue as any).resultValidation.softStorage,
      softDepend: (props.resultValue as any).resultValidation.softDepend,
      codeContent: (props.resultValue as any).resultValidation.codeContent,
      codeLanguage: (props.resultValue as any).resultValidation.codeLanguage,
      codeDepend: (props.resultValue as any).resultValidation.codeDepend,
    })
    const resultVisualizationForm = reactive({
      name: (props.resultValue as any).resultVisualization.name,
      description: (props.resultValue as any).resultVisualization.description,
      stepType: (props.resultValue as any).resultVisualization.stepType,
      dataResource: (props.resultValue as any).resultVisualization.dataResource,
      resultOutput: (props.resultValue as any).resultVisualization.resultOutput,
      softName: (props.resultValue as any).resultVisualization.softName,
      softVersion: (props.resultValue as any).resultVisualization.softVersion,
      softStorage: (props.resultValue as any).resultVisualization.softStorage,
      softDepend: (props.resultValue as any).resultVisualization.softDepend,
      codeContent: (props.resultValue as any).resultVisualization.codeContent,
      codeLanguage: (props.resultValue as any).resultVisualization.codeLanguage,
      codeDepend: (props.resultValue as any).resultVisualization.codeDepend,
    })
    const conclusionForm = reactive({
      conclusionText: (props.resultValue as any).conclusion.text,
      conclusionPaper: (props.resultValue as any).conclusion.paper,
    })
    const storageUpload1 = () => {
      if(resultValidationForm.resultOutput.isUpload==='true'){
        uploadForm.location = resultValidationForm.resultOutput.storage
      }
      else
        uploadForm.location = ''
      upload.value = true
      uploadType.value = 1
    }
    const storageUpload2 = () => {
      if(resultVisualizationForm.resultOutput.isUpload==='true'){
        uploadForm.location = resultVisualizationForm.resultOutput.storage
      }
      else
        uploadForm.location = ''
      upload.value = true
      uploadType.value = 2
    }
    const uploadForm = reactive({
      name:"",
      location:""
    })
    const submitUpload = async () => {
      let formData = new FormData()
      uploadForm.name = "模型应用竞赛"
      formData.append('name', uploadForm.name)
      formData.append('datafile', uploadRef.value[0])
      const data = await uploadData(formData);
      if (data != null && (data as any).code === 1) {
        notice("success", "成功", "上传成功！");
        fileid.value = data.data.id
        if(uploadType.value===1){
          resultValidationForm.resultOutput.storage = 'http://221.226.60.2:8082/data/'+fileid.value
          resultValidationForm.resultOutput.isUpload = 'true'
        }
        else{
          resultVisualizationForm.resultOutput.storage = 'http://221.226.60.2:8082/data/'+fileid.value
          resultVisualizationForm.resultOutput.isUpload = 'true'
        }
        uploadForm.location = 'http://221.226.60.2:8082/data/'+fileid.value
      }
    }
    const deleteUpload = async () => {
      const data = await deleteData(uploadForm.location);
      if (data != null && ((data as any).code === 1||(data as any).message === 'file not exist')) {
        notice("success", "成功", "删除成功！");
        uploadForm.location=''
        if(uploadType.value===1){
          resultValidationForm.resultOutput.storage=''
          resultValidationForm.resultOutput.isUpload = 'false'
          await deleteresultValidationStorage((router.currentRoute.value.params.apply as any).id)
          
        }
        else{
          resultVisualizationForm.resultOutput.storage = ''
          resultVisualizationForm.resultOutput.isUpload = 'false'
          await deleteresultVisualizationStorage((router.currentRoute.value.params.apply as any).id)
        }
      }
    }
    const changeupload = (file:any,files:any) =>{
      const temp = [] as any[]
      for(let item of files){
        temp.push(item.raw)
      }
      uploadRef.value=temp
    }
    const removeupload = (file:any,files:any) =>{
      const temp = [] as any[]
      for(let item of files){
        temp.push(item.raw)
      }
      uploadRef.value=temp
    }

    const conclusionPictureList = ref(
      (props.resultValue as any).conclusion.pictures
    );

    const returnConclusionPictures = (val: any[]) => {
      conclusionPictureList.value = [];
      val.forEach((item) => {
        conclusionPictureList.value.push(item.name);
      });
    };    
    const conclusionVideoItem = ref(
      (props.resultValue as any).conclusion.video
    );

    const returnConclusionVideos = (val: any[]) => {
      conclusionVideoItem.value = val
    };

    const resultValidationPictureList = ref(
      (props.resultValue as any).resultValidation.pictures
    );

    const returnResultValidationPictures = (val: any[]) => {
      resultValidationPictureList.value = [];
      val.forEach((item) => {
        resultValidationPictureList.value.push(item.name);
      });
    };    
    const resultValidationVideoItem = ref(
      (props.resultValue as any).resultValidation.video
    );
    const returnResultValidationVideos = (val: any[]) => {
     resultValidationVideoItem.value = val
    };
    const resultVisualizationPictureList = ref(
      (props.resultValue as any).resultVisualization.pictures
    );

    const returnResultVisualizationPictures = (val: any[]) => {
      resultVisualizationPictureList.value = [];
      val.forEach((item) => {
        resultVisualizationPictureList.value.push(item.name);
      });
    };    
    const resultVisualizationVideoItem= ref(
      (props.resultValue as any).resultVisualization.video
    );
    const returnResultVisualizationVideos = (val: any[]) => {
     resultVisualizationVideoItem.value = val
    };

    const rules = reactive<FormRules>({
      conclusionText: [{
        required: true,
        message: '请输入结果分析及结论',
        trigger: 'change'
      }],
      name: [{
        required: true,
        message: '请输入步骤名称',
        trigger: 'change'
      }],
      description: [{
        required: true,
        message: '请输入步骤描述',
        trigger: 'change'
      }],
      stepType: [{
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
      dataResource: [{
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
    })
    const saveClick = async () => {
      if(!conclusionForm.conclusionText){
        notice("warning", "失败", "“结果分析及结论”不能为空")
        return
      }
      const resultValidation={
      name: resultValidationForm.name,
      description: resultValidationForm.description,
      stepType: resultValidationForm.stepType,
      dataResource: resultValidationForm.dataResource,
      resultOutput: resultValidationForm.resultOutput,
      softName: resultValidationForm.softName,
      softVersion: resultValidationForm.softVersion,
      softStorage: resultValidationForm.softStorage,
      softDepend:resultValidationForm.softDepend,
      codeContent: resultValidationForm.codeContent,
      codeLanguage: resultValidationForm.codeLanguage,
      codeDepend:resultValidationForm.codeDepend,
      pictures: resultValidationPictureList.value,
      video: resultValidationVideoItem.value,
      }
      const resultVisualization={
      name: resultVisualizationForm.name,
      description: resultVisualizationForm.description,
      stepType: resultVisualizationForm.stepType,
      dataResource: resultVisualizationForm.dataResource,
      resultOutput: resultVisualizationForm.resultOutput,
      softName: resultVisualizationForm.softName,
      softVersion: resultVisualizationForm.softVersion,
      softStorage: resultVisualizationForm.softStorage,
      softDepend:resultVisualizationForm.softDepend,
      codeContent: resultVisualizationForm.codeContent,
      codeLanguage: resultVisualizationForm.codeLanguage,
      codeDepend:resultVisualizationForm.codeDepend,
      pictures: resultVisualizationPictureList.value,
      video: resultVisualizationVideoItem.value,
      }
      const conclusion = {
        text: conclusionForm.conclusionText,
        paper: conclusionForm.conclusionPaper,
        pictures: conclusionPictureList.value,
        video: conclusionVideoItem.value
      }
      const result = {
        resultValidation: resultValidation,
        resultVisualization: resultVisualization,
        conclusion:conclusion,
      };
      const data = await saveResult(
        (router.currentRoute.value.params.apply as any).id,
        result
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功");
        context.emit("rerturnResult",result)
      }
    };
 
    return {
      step1,
      saveClick,
      Datatemp,
      Delete,
      Edit,
      conclusionForm,
      conclusionPictureList,
      conclusionVideoItem,
      returnConclusionPictures,
      returnConclusionVideos,
      resultValidationPictureList,
      resultValidationVideoItem,
      returnResultValidationPictures,
      returnResultValidationVideos,
      resultVisualizationPictureList,
      resultVisualizationVideoItem,
      returnResultVisualizationPictures,
      returnResultVisualizationVideos,
      rules,
      resultVisualizationForm,
      resultValidationForm,
      storageUpload1,
      storageUpload2,
      submitUpload,
      uploadForm,
      changeupload,
      removeupload,
      deleteUpload,
      fileid,
      upload,
      uploadType,
      uploadResultValidationVideo,
      uploadResultVisualizationVideo,
      uploadConclusionVideo
    };
  },
});
</script>

<style lang="scss" scoped>
.rtext{
  text-align:left;
  margin-top: 0px;
  margin-bottom: 10px;
  color: rgb(150, 150, 150);
}
  .inputbody {
    .input {
      margin-bottom: 10px;
    }
  }
  .mflex{
  display: flex;
  align-items: flex-start
}
.result {
  width: 1000px;
  padding-left: 20px;
  .small-title {
    display: flex;
    .icon {
      height: 20px;
      width: 10px;
      margin-top: 23px;
      margin-right: 5px;
      background: red;
    }
  }
  .body {
    display: flex;
    .example {
      flex: 1;
      padding: 0 15px;
      .example-item {
        display: flex;
        line-height: 30px;
        .example-item-title {
          width: 80px;
        }
        .example-item-value {
          width: calc(100% - 80px);
        }
      }
    }
    .result-value {
      flex: 1;
      padding: 0 15px;
    }
  }
  .result-validation {
    .example {
      margin-bottom: 20px;
      .example-text {
        margin-left: 50px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .add {
      height: 100px;
      width: 100px;
      border: 2px dashed #eaeaea;
      &:hover {
        border-color: lightblue;
        cursor: pointer;
      }
      .el-icon {
        margin-top: 40px;
        margin-left: 40px;
      }
    }
  }
  .btn {
    text-align: center;
    margin: 40px 0;
  }
}
.card {
  position: relative;

  .button {
    position: absolute;
    z-index: 99;
    top: 20px;
    right: 20px;
  }
}
.mflex2{
  display: flex;
  align-items: flex-start
}
.verText{
  text-align: center;
  margin-top: 20px;
  margin-right: 0px;
  writing-mode: vertical-rl ;
  color: rgb(150, 150, 150);
}
.vdivider{
  height: 100px;
}
.mh5a{
  margin-left: 20px;
  display: flex;
}

.mflexa{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
      .text{
        display: flex;
        font-size: small;
        font-weight: 350;
        width: 120px;
      }
}
.necess{
  margin-right: 5px;
  color:lightcoral;
}
.mul{
  margin-left: 70px;
}
</style>