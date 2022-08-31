<template>
  <el-scrollbar height="600px">
  <h3>基础信息</h3>
  <el-form ref="ruleFormRef" :model="DataBaseInfoForm" status-icon label-width="120px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="数据名称" prop="name">
      <el-input v-model="DataBaseInfoForm.name" placeholder="详细说明该数据的名称"/>
    </el-form-item>
    <el-form-item label="数据描述" prop="description">
      <el-input v-model="DataBaseInfoForm.description" type="textarea" placeholder="详细说明该数据的内容和用途等"/>
    </el-form-item>
    <el-form-item label="数据类型" prop="type">
      <el-select style="width:440px" v-model="DataBaseInfoForm.type" placeholder="请选择">
        <el-option label="输入数据" value="输入数据" />
        <el-option label="输入参数" value="输入参数" />
        <el-option label="中间数据" value="中间数据" />
        <el-option label="结果数据" value="结果数据" />
      </el-select>
    </el-form-item>
    <div v-if="DataBaseInfoForm.type==='输入数据'||DataBaseInfoForm.type==='中间数据'||DataBaseInfoForm.type==='结果数据'">
      <el-form-item label="数据存储位置" prop="location">
        <div style="display:flex;width: 440px;"><el-input v-model="DataBaseInfoForm.location" placeholder="详细说明获取该数据的原始路径" :readonly="DataBaseInfoForm.isUpload==='true'"/>
        <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="storageUpload">上传</el-button></div>
      </el-form-item>
      <h5 style="margin-left: 120px;color:rgb(150,150,150);">说明：直接输入文件的下载链接 或者 通过上传生成下载链接</h5>
      <el-form-item label="数据格式" prop="format">
        <el-input v-model="DataBaseInfoForm.format"  placeholder="例如：栅格数据、矢量数据" />
      </el-form-item>
    </div>
    <div v-else-if="DataBaseInfoForm.type==='输入参数'">
      <el-form-item label="参数值" prop="parameter">
        <el-input v-model="DataBaseInfoForm.parameter"/>
      </el-form-item>
    </div>
      <el-form-item label="数据版本" prop="version">
        <el-input v-model="DataBaseInfoForm.version" placeholder="例如：V1"/>
      </el-form-item>
      <el-form-item label="发布时间" prop="produceTime">
        <el-input v-model="DataBaseInfoForm.produceTime" placeholder="数据发布的时间" />
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="DataBaseInfoForm.updateTime" placeholder="数据更新的时间"/>
      </el-form-item>
    <h4  class="mh4"><el-icon><CaretBottom /></el-icon>时间尺度:</h4>
    <ul class="mul">
      <li>
        <div class="mflex" >
          <div class="text">分辨率</div><el-input class="liinput" v-model="DataBaseInfoForm.time.resolution"  placeholder="1h"/>
        </div> 
      </li>
      <li>
        <div class="mflex">
          <div class="text">尺度</div><el-input class="liinput" v-model="DataBaseInfoForm.time.scale" autosize type="textarea" placeholder="1. 百万年以上；2. 百万年尺度；3. 万年尺度；4. 千年尺度；5. 百年尺度；6. 10 年尺度；7. 年；8. 月；9. 日；10. 日以下；11. 基于事件（次，如降水）"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">范围</div><el-input class="liinput" v-model="DataBaseInfoForm.time.scope" placeholder="2008-2016年9年间的6月-7月"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">步长</div><el-input class="liinput" v-model="DataBaseInfoForm.time.length" placeholder="1天"/>
        </div>
      </li>
    </ul>
    <h4 class="mh4"><el-icon><CaretBottom /></el-icon>空间尺度:</h4>
    <ul class="mul">
      <li>
        <div class="mflex">
          <div class="text">分辨率</div><el-input class="liinput" v-model="DataBaseInfoForm.space.resolution"  placeholder="1°*1°"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">尺度</div><el-input class="liinput" v-model="DataBaseInfoForm.space.scale" autosize type="textarea" placeholder="1. 全球尺度；2. 洲际尺度；3. 区域尺度；4. 流域尺度；5. 基本单元（地块尺度）"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">范围</div><el-input class="liinput" v-model="DataBaseInfoForm.space.scope" placeholder="2008-经度范围是 70°~140°E，纬度范围是 15°~59°N"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">维度</div><el-input class="liinput" v-model="DataBaseInfoForm.space.dimension" placeholder="1D"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">参考系</div><el-input class="liinput" v-model="DataBaseInfoForm.space.unit"/>
        </div>
      </li>
    </ul>
  </el-form>
    <h3>数据预处理信息</h3>
  <el-form ref="ruleFormRef" :model="DataActiveForm" status-icon label-width="120px" class="demo-ruleForm">
    <ul class="mul">
      <li>
        <div class="mflex">
          <div class="text">名称</div><el-input class="liinput" v-model="DataActiveForm.handleName"  placeholder="数据处理步骤名称"/>
        </div>
      </li>
      <li>
        <div class="mflex">
          <div class="text">描述</div><el-input class="liinput" v-model="DataActiveForm.handleDescription" type="textarea" placeholder="说明该数据之前进行了哪些数据处理步骤"/>
        </div>
      </li>
    </ul>
  </el-form>
    <h3>出处信息</h3>
  <el-form ref="ruleFormRef" :model="DataSourceForm" status-icon label-width="120px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="参考文献">
        <el-tag
          style="margin-right:5px"
          v-for="tag in DataSourceForm.references"
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
    <el-form-item label="唯一标识符" >
      <el-input v-model="DataSourceForm.UId" placeholder="例如：DOI"/>
    </el-form-item>
    <el-form-item label="出版机构" prop="publish">
      <el-input v-model="DataSourceForm.publish" placeholder="例如：例如国家气象信息中心"/>
    </el-form-item>
    <el-form-item label="发展机构">
      <el-input v-model="DataSourceForm.develop" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="dataoperateType==='add'" @click="submitForm">提交</el-button>
      <el-button type="primary" v-else @click="submitUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</el-scrollbar>
    <el-dialog v-model="upload" width="500px" title="数据上传" >
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, onMounted } from "vue";
import type { FormInstance, ElInput, FormRules } from 'element-plus'
import { notice } from "@/utils/notice";
import router from "@/router";
import { saveDataResources } from "@/api/request";
import { updateDataResources } from "@/api/request";
import { uploadData } from "@/api/request";
import { deleteData } from "@/api/request";
import { deleteDataLocation } from "@/api/request";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    dataItem: {
      type: Object,
    },
    dataoperateType: {
      type: String,
    },
  },
  emits: ["returnData","updateData","updateDataLocation"],
  setup(props,context) {
    const uploadRef =ref([] as any[])
    const upload = ref(false);
    const fileid = ref("")
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const add = ref(false);
    const Flag = ref(false);
    const STCIndex = ref(-1);
    const STCUpdateFlag = ref(false);
    const uploadForm = reactive({
      name:"",
      location:""
    })
    const inputForm = reactive({
      name: "",
      type: "",
      scope: "",
      resolution:"",
      other:"",
    });
    const dataResource = reactive({
      dataId:'',
      dataBaseInfo: {
        name: '',
        description: '',
        type: '',
        location: '',
        format: '',
        parameter:'',
        version: '',
        produceTime: '',
        updateTime: '',
        isUpload: '',
        time:{
          resolution:'',
          scale:'',
          scope:'',
          length:'',
          unit:'',
        },
        space:{
          resolution:'',
          scale:'',
          scope:'',
          dimension:'',
          unit:'',
        }
      },
      dataActive: {
        handleName:'',
        conversionName:'',
        handleDescription:'',
        conversionDescription:'',
      },
      dataSource: {
        publish:'',
        references:[] as any[],
        UId:'',
        develop:''
      }
    })
    const storageUpload = () => {
      if(DataBaseInfoForm.isUpload==='true'){
        uploadForm.location = DataBaseInfoForm.location
      }
      else
        uploadForm.location = ''
      upload.value = true
    }
    const submitUpload = async () => {
      let formData = new FormData()
      uploadForm.name = "模型应用竞赛"
      formData.append('name', uploadForm.name)
      formData.append('datafile', uploadRef.value[0])
      const data = await uploadData(formData);
      if (data != null && (data as any).code === 1) {
        notice("success", "成功", "上传成功！");
        fileid.value = data.data.id
        DataBaseInfoForm.location = 'http://221.226.60.2:8082/data/'+fileid.value
        uploadForm.location = 'http://221.226.60.2:8082/data/'+fileid.value
        DataBaseInfoForm.isUpload = 'true'
      }
    }
    const deleteUpload = async () => {
      const data = await deleteData(uploadForm.location);
      if (data != null && ((data as any).code === 1 ||(data as any).message === 'file not exist')) {
        notice("success", "成功", "删除成功！");
        uploadForm.location=''
        DataBaseInfoForm.location=''
        DataBaseInfoForm.isUpload = 'false'
        if((props.dataItem as any).dataId){
          await deleteDataLocation((router.currentRoute.value.params.apply as any).id, (props.dataItem as any))
          context.emit("updateDataLocation");
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
    const handleClose = (tag: string) => {
      DataSourceForm.references.splice(DataSourceForm.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        DataSourceForm.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    
    const uuid = require('uuid')
    const DataBaseInfoForm = reactive({
      isUpload:'false',
      name: '',
      description: '',
      type: '',
      location: '',
      format: '',
      parameter:'',
      version: '',
      produceTime: '',
      updateTime: '',
      time:{
        resolution:'',
        scale:'',
        scope:'',
        length:'',
        unit:'',
      },
      space:{
        resolution:'',
        scale:'',
        scope:'',
        dimension:'',
        unit:'',
      }
    });
    const DataActiveForm = reactive({
      handleName:'',
      conversionName:'',
      handleDescription:'',
      conversionDescription:'',
    });
    const DataSourceForm = reactive({
      publish:'',
      references:[] as any[],
      UId:'',
      develop:''
    });
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入数据名称', trigger: 'change' }
      ],
      location: [
        { required: true, message: '请输入存储位置', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入数据描述', trigger: 'change' }
      ],
      format: [
        { required: true, message: '请输入数据格式', trigger: 'change' }
      ],
      produceTime: [
        { required: true, message: '请输入发布时间', trigger: 'change' }
      ],
      parameter:[
        { required: true, message: '请输入参数值', trigger: 'change' }
      ],
      type: [
        { required: true, message: '请选择数据类型', trigger: 'change' }
      ],
      version: [
        { required: true, message: '请输入数据版本', trigger: 'change' }
      ],
      publish: [
        { required: true, message: '请输入出版机构', trigger: 'change' }
      ],
      })
      const strules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入名称', trigger: 'change' }
      ],
      type: [
        { required: true, message: '请选择类型', trigger: 'blur' }
      ],
      scope: [
        { required: true, message: '请输入范围', trigger: 'change' }
      ],
      resolution: [
        { required: true, message: '请输入分辨率', trigger: 'change' }
      ]
      })
    const submitForm = async () => {
      if(!DataBaseInfoForm.name){
        notice("warning", "失败", "“数据名称”不能为空")
        return
      }
      if(!DataBaseInfoForm.description){
        notice("warning", "失败", "“数据描述”不能为空")
        return
      }
      if(!DataBaseInfoForm.type){
        notice("warning", "失败", "“数据类型”不能为空")
        return
      }
      if(DataBaseInfoForm.type==='输入参数'){
        if(!DataBaseInfoForm.parameter){
        notice("warning", "失败", "“参数值”不能为空")
        return
        }
      }
      else{
        if(!DataBaseInfoForm.location){
        notice("warning", "失败", "“存储位置”不能为空")
        return
        }
        if(!DataBaseInfoForm.format){
        notice("warning", "失败", "“数据格式”不能为空")
        return
        }
      }
      if(!DataBaseInfoForm.version){
        notice("warning", "失败", "“数据版本”不能为空")
        return
      }
      if(!DataBaseInfoForm.produceTime){
        notice("warning", "失败", "“发布时间”不能为空")
        return
      }
      if(!DataSourceForm.publish){
        notice("warning", "失败", "“出版机构”不能为空")
        return
      }
      dataResource.dataBaseInfo.name = DataBaseInfoForm.name
      dataResource.dataBaseInfo.description = DataBaseInfoForm.description
      dataResource.dataBaseInfo.type = DataBaseInfoForm.type
      dataResource.dataBaseInfo.location = DataBaseInfoForm.location
      dataResource.dataBaseInfo.format = DataBaseInfoForm.format
      dataResource.dataBaseInfo.parameter = DataBaseInfoForm.parameter
      dataResource.dataBaseInfo.version = DataBaseInfoForm.version
      dataResource.dataBaseInfo.produceTime = DataBaseInfoForm.produceTime
      dataResource.dataBaseInfo.updateTime = DataBaseInfoForm.updateTime
      dataResource.dataBaseInfo.time = DataBaseInfoForm.time
      dataResource.dataBaseInfo.space = DataBaseInfoForm.space
      dataResource.dataBaseInfo.isUpload = DataBaseInfoForm.isUpload 

      dataResource.dataActive.handleName = DataActiveForm.handleName
      dataResource.dataActive.handleDescription = DataActiveForm.handleDescription
      dataResource.dataActive.conversionName = DataActiveForm.conversionName
      dataResource.dataActive.conversionDescription = DataActiveForm.conversionDescription

      dataResource.dataSource.publish = DataSourceForm.publish
      dataResource.dataSource.references = DataSourceForm.references
      dataResource.dataSource.UId = DataSourceForm.UId
      dataResource.dataSource.develop = DataSourceForm.develop
      
      dataResource.dataId = uuid.v4()
      const data = await saveDataResources(
        (router.currentRoute.value.params.apply as any).id,
        dataResource
      );
      if (data != null && (data as any).code === 0) {
        context.emit("returnData", dataResource);
        notice("success", "成功", "保存成功！");
      }
    }
    const submitUpdate = async () => {
      if(!DataBaseInfoForm.name){
        notice("warning", "失败", "“数据名称”不能为空")
        return
      }
      if(!DataBaseInfoForm.description){
        notice("warning", "失败", "“数据描述”不能为空")
        return
      }
      if(!DataBaseInfoForm.type){
        notice("warning", "失败", "“数据类型”不能为空")
        return
      }
      if(DataBaseInfoForm.type==='输入参数'){
        if(!DataBaseInfoForm.parameter){
        notice("warning", "失败", "“参数值”不能为空")
        return
        }
      }
      else{
        if(!DataBaseInfoForm.location){
        notice("warning", "失败", "“存储位置”不能为空")
        return
        }
        if(!DataBaseInfoForm.format){
        notice("warning", "失败", "“数据格式”不能为空")
        return
        }
      }
      if(!DataBaseInfoForm.version){
        notice("warning", "失败", "“数据版本”不能为空")
        return
      }
      if(!DataBaseInfoForm.produceTime){
        notice("warning", "失败", "“发布时间”不能为空")
        return
      }
      if(!DataSourceForm.publish){
        notice("warning", "失败", "“出版机构”不能为空")
        return
      }
      dataResource.dataBaseInfo.name = DataBaseInfoForm.name
      dataResource.dataBaseInfo.description = DataBaseInfoForm.description
      dataResource.dataBaseInfo.type = DataBaseInfoForm.type
      dataResource.dataBaseInfo.location = DataBaseInfoForm.location
      dataResource.dataBaseInfo.format = DataBaseInfoForm.format
      dataResource.dataBaseInfo.parameter = DataBaseInfoForm.parameter
      dataResource.dataBaseInfo.version = DataBaseInfoForm.version
      dataResource.dataBaseInfo.produceTime = DataBaseInfoForm.produceTime
      dataResource.dataBaseInfo.updateTime = DataBaseInfoForm.updateTime
      dataResource.dataBaseInfo.time = DataBaseInfoForm.time
      dataResource.dataBaseInfo.space = DataBaseInfoForm.space 
      dataResource.dataBaseInfo.isUpload = DataBaseInfoForm.isUpload 

      dataResource.dataActive.handleName = DataActiveForm.handleName
      dataResource.dataActive.handleDescription = DataActiveForm.handleDescription
      dataResource.dataActive.conversionName = DataActiveForm.conversionName
      dataResource.dataActive.conversionDescription = DataActiveForm.conversionDescription

      dataResource.dataSource.publish = DataSourceForm.publish
      dataResource.dataSource.references = DataSourceForm.references
      dataResource.dataSource.UId = DataSourceForm.UId
      dataResource.dataSource.develop = DataSourceForm.develop
      dataResource.dataId = (props.dataItem as any).dataId
      const data = await updateDataResources(
        (router.currentRoute.value.params.apply as any).id,
        dataResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
        context.emit("updateData", dataResource);
      }
    }

    onMounted(() => {
      if((props.dataItem as any) !='')
      {
      DataBaseInfoForm.name=(props.dataItem as any).dataBaseInfo.name,
      DataBaseInfoForm.description= (props.dataItem as any).dataBaseInfo.description,
      DataBaseInfoForm.type= (props.dataItem as any).dataBaseInfo.type,
      DataBaseInfoForm.location= (props.dataItem as any).dataBaseInfo.location,
      DataBaseInfoForm.format= (props.dataItem as any).dataBaseInfo.format,
      DataBaseInfoForm.parameter=(props.dataItem as any).dataBaseInfo.parameter,
      DataBaseInfoForm.version=(props.dataItem as any).dataBaseInfo.version,
      DataBaseInfoForm.produceTime= (props.dataItem as any).dataBaseInfo.produceTime,
      DataBaseInfoForm.updateTime=(props.dataItem as any).dataBaseInfo.updateTime,
      DataBaseInfoForm.time= (props.dataItem as any).dataBaseInfo.time,
      DataBaseInfoForm.space=(props.dataItem as any).dataBaseInfo.space,
      DataBaseInfoForm.isUpload=(props.dataItem as any).dataBaseInfo.isUpload,

      DataActiveForm.handleName= (props.dataItem as any).dataActive.handleName,
      DataActiveForm.handleDescription= (props.dataItem as any).dataActive.handleDescription,
      DataActiveForm.conversionName= (props.dataItem as any).dataActive.conversionName,
      DataActiveForm.conversionDescription= (props.dataItem as any).dataActive.conversionDescription,
      DataSourceForm.publish= (props.dataItem as any).dataSource.publish,
      DataSourceForm.references=(props.dataItem as any).dataSource.references,
      DataSourceForm.develop= (props.dataItem as any).dataSource.develop,
      DataSourceForm.UId= (props.dataItem as any).dataSource.UId
    }
    })
    
    return {
      DataBaseInfoForm,
      DataActiveForm,
      DataSourceForm,
      submitForm,
      submitUpdate,
      dataResource,
      uuid,
      add,
      Flag,
      STCIndex,
      STCUpdateFlag,
      inputForm,
      Plus,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      rules,
      strules,
      storageUpload,
      submitUpload,
      uploadForm,
      changeupload,
      removeupload,
      deleteUpload,
      fileid,
      upload
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
.liinput{
  margin-left: 5px;
  margin-top: 5px;
}
ul li 
{
    margin: 0px;
    padding: 0px;
    margin-left: 3.4em;
}
.mh4{
  margin-left:38px
}
.nh4{
  margin-left:10px
}
.mul{
  margin-left: 30px;
  
}
.text{
  width: 50px;
}
</style>