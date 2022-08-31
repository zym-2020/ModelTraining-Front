<template>
  <el-scrollbar height="600px">
  <h3>基础信息</h3>
  <el-form ref="ruleFormRef" :model="ModelBaseInfoForm" status-icon label-width="120px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="模型名称" prop="name">
      <el-input v-model="ModelBaseInfoForm.name" placeholder="详细说明该模型的名称"/>
    </el-form-item>
    <el-form-item label="模型内容" prop="content">
      <el-input v-model="ModelBaseInfoForm.content" type="textarea" placeholder="详细说明该模型的基本原理" />
    </el-form-item>
    <el-form-item label="模型描述" prop="description">
      <el-input v-model="ModelBaseInfoForm.description" type="textarea" placeholder="详细说明该模型的用途"/>
    </el-form-item>
    <el-form-item label="模型版本" prop="version">
      <el-input v-model="ModelBaseInfoForm.version" placeholder="模型的版本信息"/>
    </el-form-item>
    <el-form-item label="模型类型" prop="type">
      <el-select style="width:440px" v-model="ModelBaseInfoForm.type" placeholder="模块/服务/代码">
        <el-option label="模块" value="模块" />
        <el-option label="服务" value="服务" />
        <el-option label="代码" value="代码" />
      </el-select>
    </el-form-item>
    <div v-if="ModelBaseInfoForm.type==='模块'">
      <el-form-item label="软件需求" prop="softDemand">
        <el-input v-model="ModelBaseInfoForm.softDemand" placeholder="说明该模型所需的软件"/>
      </el-form-item>
      <el-form-item label="软件版本" prop="softVersion">
        <el-input v-model="ModelBaseInfoForm.softVersion" placeholder="需要说明该模型所需的软件版本"/>
      </el-form-item>
      <el-form-item label="软件存储位置" prop="storage">
        <div style="display:flex;width: 440px;"><el-input v-model="ModelBaseInfoForm.storage" placeholder="详细说明获取该模型的原始路径" :readonly="ModelBaseInfoForm.isUpload==='true'"/>
        <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="storageUpload">上传</el-button></div>
      </el-form-item>
      <h5 style="margin-left: 120px;color:rgb(150,150,150);">说明：直接输入文件的下载链接 或者 通过上传生成下载链接</h5>
    </div>
    <div v-if="ModelBaseInfoForm.type==='服务'">
      <el-form-item label="服务存储位置" prop="serverStorage">
        <el-input v-model="ModelBaseInfoForm.serverStorage" placeholder="详细说明获取该模型的原始路径（下载链接）" />
      </el-form-item>
    </div>
    <div v-if="ModelBaseInfoForm.type==='代码'">
      <el-form-item label="涉及公式/算法" >
          <el-input v-model="ModelBaseInfoForm.algorithm" />
      </el-form-item>
      <el-form-item label="代码内容" prop="codeContent">
        <div style="display:flex;width: 440px;"><el-input v-model="ModelBaseInfoForm.codeContent" type="textarea" placeholder="代码内容" :readonly="ModelBaseInfoForm.isCodeUpload==='true'"/>
        <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="codeContentUpload">上传</el-button></div>
      </el-form-item>
      <h5 style="margin-left: 120px;color:rgb(150,150,150);">说明：直接输入代码 或者 通过上传生成下载链接</h5>
      <el-form-item label="编程语言" prop="language">
        <el-input v-model="ModelBaseInfoForm.language" placeholder="例如：Fortran77, Fortran90, C, C++, Python, Java, IDL, Matlab等" />
      </el-form-item>
      <el-form-item label="模型依赖库" prop="dependent">
        <el-input v-model="ModelBaseInfoForm.dependent" placeholder="部署或运行模型所需要引入的依赖库，例如：Scrapy、Urllib3等" />
      </el-form-item>
    </div>
    <ul>
      <h4 class="mflex"><el-icon><CaretBottom /></el-icon>模型参考系:</h4>
      <li style="margin-bottom: 10px">
        时间参考系：
      </li>
    </ul>
    <el-form-item label="类型" prop="refSystemTime">
        <el-select  v-model="ModelBaseInfoForm.refSystemTime.type" filterable allow-create placeholder="请选择">
        <el-option label="UTC" value="UTC" />
        <el-option label="GMT" value="GMT" />
        <el-option label="UT" value="UT" />
        <el-option label="其他(请直接输入)" value=" " disabled/>
        </el-select>
     </el-form-item>
    <el-form-item label="名称" prop="refSystemTime">
      <el-input  v-model="ModelBaseInfoForm.refSystemTime.name" placeholder="UTC +8、GMT+0"/>
    </el-form-item>
    <ul>
      <li style="margin-bottom: 10px">
        空间参考系：
      </li>
    </ul>       
    <el-form-item label="类型" prop="refSystemSpace">
    <el-select v-model="ModelBaseInfoForm.refSystemSpace.type" filterable allow-create placeholder="请选择">
    <el-option label="地理坐标系" value="地理坐标系" />
    <el-option label="投影坐标系" value="投影坐标系" />
    <el-option label="高程参考系" value="高程参考系" />
    <el-option label="其他(请直接输入)" value=" " disabled/>
    </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="refSystemSpace">
    <el-input  v-model="ModelBaseInfoForm.refSystemSpace.name" placeholder="WGS 84、Beijing 1954"/>
    </el-form-item>
    <el-divider/>
    <el-form-item label="发布时间" prop="producteTime">
      <el-input v-model="ModelBaseInfoForm.producteTime"  placeholder="模型构建并发布的时间" />
    </el-form-item>
    <el-form-item label="模型假设" prop="hypothesis">
      <el-input v-model="ModelBaseInfoForm.hypothesis"  placeholder="执行模型所需的假设" />
    </el-form-item>
    <el-form-item label="模型适用范围" prop="application">
      <el-input v-model="ModelBaseInfoForm.application"  placeholder="介绍性内容" />
    </el-form-item>
      <el-form-item label="更新时间">
      <el-input v-model="ModelBaseInfoForm.updateTime"  placeholder="模型后续更新的版本及其时间" />
    </el-form-item>
    <el-form-item label="其他">
      <el-input v-model="ModelBaseInfoForm.other" type="textarea" placeholder="补充内容" />
    </el-form-item>
  </el-form>
    <h3>运行信息</h3>
  <el-form ref="ruleFormRef" :model="ModelMetaDataForm" status-icon label-width="120px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="输入信息" prop="modelInputs">
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.modelInputs"
        :key="index"
        closable
        @close="inputClose(index)"
        @click="inputClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="addInput" />
    </el-form-item>
    <el-form-item label="参数信息" prop="parameters">
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.parameters"
        :key="index"
        closable
        @close="paramClose(index)"
        @click="paramClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="addParam" />
    </el-form-item>
    <el-form-item label="输出信息" prop="modelOutputs">
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.modelOutputs"
        :key="index"
        closable
        @close="outputClose(index)"
        @click="outputClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="addOutput" />
    </el-form-item>

    <h4 class="mflex" style="margin-left:20px"><el-icon><CaretBottom /></el-icon>模型运行边界条件:</h4>
     <el-form-item label="上边界" >
        <el-input v-model="ModelMetaDataForm.upperboundary"/>
     </el-form-item>
      <el-form-item label="下边界" >
        <el-input v-model="ModelMetaDataForm.lowerboundary"/>
     </el-form-item>
  </el-form>
    <h3>出处信息</h3>
  <el-form ref="ruleFormRef" :model="ModelSourceForm" status-icon label-width="120px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="参考文献" prop="references">
        <el-tag
          v-for="tag in ModelSourceForm.references"
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
    <el-form-item label="出版机构" prop="publication">
      <el-input v-model="ModelSourceForm.publication" placeholder="开发者所在单位"/>
    </el-form-item>
    <el-form-item label="发展机构" >
      <el-input v-model="ModelSourceForm.develop" placeholder="说明更新该模型的机构"/>
    </el-form-item>
    <el-form-item label="唯一标识符">
      <el-input v-model="ModelSourceForm.UId" placeholder="例如：DOI"/>
    </el-form-item>
    <el-form-item label="许可证明">
      <el-input v-model="ModelSourceForm.license" placeholder="例如：OSI-approved licenses:MIT license、Apache License 2.0等"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="modeloperateType==='add'" @click="submitForm">提交</el-button>
      <el-button type="primary" v-else @click="submitUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</el-scrollbar>
    <el-dialog v-model="add" v-if="add" width="400px" title="信息添加" >
      <el-form :model="inputForm" label-width="100px" :rules="xrules">
        <el-form-item label="输入名称" prop="name">
          <el-input v-model="inputForm.name" />
        </el-form-item>
        <el-form-item label="输入描述" prop="description">
          <el-input v-model="inputForm.description" />
        </el-form-item>
        <el-form-item v-if="Flag!='addoutput' && Flag!='updateoutput' && Flag!='addinput' && Flag!='updateinput'" label="输入默认值" >
          <el-input v-model="inputForm.defaultValue" />
        </el-form-item>
        <el-form-item label="输入格式" prop="format">
          <el-input v-model="inputForm.format" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="Flag==='addinput'">
          <el-button type="primary" @click="addInputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateinput'">
          <el-button type="success" @click="updateInputClick">修改</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='addoutput'">
          <el-button type="primary" @click="addOutputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateoutput'">
          <el-button type="success" @click="updateOutputClick">修改</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='addparam'">
          <el-button type="primary" @click="addParamClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateparam'">
          <el-button type="success" @click="updateParamClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="upload" width="500px" title="模型上传" >
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
          <el-button :disabled="uploadForm.storage!=''" style="margin-left:10px" class="ml-3" type="success" @click="submitUpload">
            上传
          </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="uploadForm.storage" label="下载地址" prop="storage">
          <el-input v-model="uploadForm.storage" :disabled="true" type="textarea"/>
          <el-button style="margin-top:10px" class="ml-3" type="danger" @click="deleteUpload">
            删除
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="codeupload" width="500px" title="代码上传" >
      <el-form :model="codeuploadForm" label-width="100px">
      <el-form-item label="上传文件" prop="file">
        <el-upload
          ref="codeuploadRef"
          class="upload-demo"
          :auto-upload="false"
          :on-change="changecodeupload"
          :on-remove="removecodeupload"
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
          <el-button :disabled="codeuploadForm.codeContent!=''" style="margin-left:10px" class="ml-3" type="success" @click="submitcodeUpload">
            上传
          </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="codeuploadForm.codeContent" label="下载地址" prop="storage">
          <el-input v-model="codeuploadForm.codeContent" :disabled="true" type="textarea"/>
          <el-button style="margin-top:10px" class="ml-3" type="danger" @click="deletecodeUpload">
            删除
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick, toRaw} from "vue";
import type { FormInstance, ElInput, FormRules, UploadInstance } from 'element-plus'
import { notice } from "@/utils/notice";
import router from "@/router";
import { deleteData, deleteModelStorage, deleteModelcodeContent, uploadData, updateModelResources, saveModelResources} from "@/api/request";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    modelItem: {
      type: Object,
    },
    modeloperateType: {
      type: String,
    },
  },
  emits: ["returnModel","updateModel","updateModelStorage","updateModelcodeContent"],
  setup(props,context) {
    const uploadRef =ref([] as any[])
    const codeuploadRef =ref([] as any[])
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const add = ref(false);
    const upload = ref(false);
    const codeupload = ref(false);
    const inputUpdateFlag = ref(false);
    const inputIndex = ref(-1);
    const outputUpdateFlag = ref(false);
    const outputIndex = ref(-1);
    const paramUpdateFlag = ref(false);
    const paramIndex = ref(-1);
    const Flag = ref("");
    const fileid = ref("")
    const modelResource = reactive({
      modelId:'',
      modelBaseInfo: {
        isUpload:'false',
        isCodeUpload:'false',
        serverStorage:'',
        name: '',
        content: '',
        description: '',
        version: '',
        type: '',
        softDemand:'',
        softVersion:'',
        storage: '',
        algorithm:'',
        codeContent:'',
        language: '',
        dependent:'',
        refSystemTime:{
          type:'',
          name:'',
        },
        refSystemSpace:{
          type:'',
          name:'',
        },
        producteTime:'',
        hypothesis:'',
        application:'',
        updateTime:'',
        other: ''
      },
      modelMetaData: {
        modelInputs: [] as any[],
        modelOutputs: [] as any[],
        parameters:[] as any[],
        upperboundary:'',
        lowerboundary:''
      },
      modelSource: {
        references:[] as any[],
        publication:'',
        develop:'',
        UId:'',
        license:''
      }
    })
    const uuid = require('uuid')
    const ModelBaseInfoForm = reactive({
        name: '',
        content: '',
        description: '',
        version: '',
        type: '',
        softDemand:'',
        softVersion:'',
        storage: '',
        serverStorage:'',
        algorithm:'',
        codeContent:'',
        language: '',
        dependent:'',
        refSystemTime:{
          type:'',
          name:'',
        },
        refSystemSpace:{
          type:'',
          name:'',
        },
        producteTime:'',
        hypothesis:'',
        application:'',
        updateTime:'',
        other: '',
        isUpload:'',
        isCodeUpload:'',
    });
    const ModelMetaDataForm = reactive({
        modelInputs: [] as any[],
        modelOutputs: [] as any[],
        parameters:[] as any[],
        upperboundary:'',
        lowerboundary:''
    });
    const ModelSourceForm = reactive({
        references:[] as any[],
        publication:'',
        develop:'',
        UId:'',
        license:''
    });
    const storageUpload = () => {
      if(ModelBaseInfoForm.isUpload==='true'){
        uploadForm.storage = ModelBaseInfoForm.storage
      }
      else
        uploadForm.storage = ''
      upload.value = true
    }
    const codeContentUpload = () => {
      if(ModelBaseInfoForm.isCodeUpload==='true'){
        codeuploadForm.codeContent = ModelBaseInfoForm.codeContent
      }
      else
        codeuploadForm.codeContent = ''
      codeupload.value = true
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
        ModelBaseInfoForm.isUpload = 'true'
        ModelBaseInfoForm.storage = 'http://221.226.60.2:8082/data/'+fileid.value
        uploadForm.storage = 'http://221.226.60.2:8082/data/'+fileid.value
      }
    }
    const deleteUpload = async () => {
      const data = await deleteData(uploadForm.storage);
      if (data != null && ((data as any).code === 1||(data as any).message === 'file not exist')) {
        notice("success", "成功", "删除成功！");
        ModelBaseInfoForm.isUpload = 'false'
        uploadForm.storage=''
        ModelBaseInfoForm.storage=''
        if((props.modelItem as any).modelId){
          await deleteModelStorage((router.currentRoute.value.params.apply as any).id, (props.modelItem as any))
          context.emit("updateModelStorage");
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
    const submitcodeUpload = async () => {
      let formData = new FormData()
      codeuploadForm.name = "模型应用竞赛"
      formData.append('name', codeuploadForm.name)
      formData.append('datafile', codeuploadRef.value[0])
      const data = await uploadData(formData);
      if (data != null && (data as any).code === 1) {
        notice("success", "成功", "上传成功！");
        fileid.value = data.data.id
        ModelBaseInfoForm.isCodeUpload = 'true'
        ModelBaseInfoForm.codeContent = 'http://221.226.60.2:8082/data/'+fileid.value
        codeuploadForm.codeContent = 'http://221.226.60.2:8082/data/'+fileid.value
      }
    }
    const deletecodeUpload = async () => {
      const data = await deleteData(codeuploadForm.codeContent);
      if (data != null && (data as any).code === 1) {
        notice("success", "成功", "删除成功！");
        ModelBaseInfoForm.isCodeUpload = 'false'
        codeuploadForm.codeContent=''
        ModelBaseInfoForm.codeContent=''
        if((props.modelItem as any).modelId){
          await deleteModelcodeContent((router.currentRoute.value.params.apply as any).id, (props.modelItem as any))
          context.emit("updateModelcodeContent");
        }
      }
    }
    const changecodeupload = (file:any,files:any) =>{
      const temp = [] as any[]
      for(let item of files){
        temp.push(item.raw)
      }
      codeuploadRef.value=temp
    }
    const removecodeupload = (file:any,files:any) =>{
      const temp = [] as any[]
      for(let item of files){
        temp.push(item.raw)
      }
      codeuploadRef.value=temp
    }
    const handleClose = (tag: string) => {
      ModelSourceForm.references.splice(ModelSourceForm.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        ModelSourceForm.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    const inputForm = reactive({
      name: "",
      unit: "",
      description: "",
      defaultValue:"",
      format:"",
    });
    const uploadForm = reactive({
      name:"",
      storage:""
    })
    const codeuploadForm = reactive({
      name:"",
      codeContent:""
    })
    const addInput = () => {
      inputForm.name = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      Flag.value = "addinput"
      add.value = true
    }
    const addOutput = () => {
      inputForm.name = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      Flag.value = "addoutput"
      add.value = true
    }
    const addParam = () => {
      inputForm.name = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      Flag.value = "addparam"
      add.value = true
    }
    const addInputClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }

      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelInputs.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateInputClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }

      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelInputs[inputIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const addOutputClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }
      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelOutputs.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateOutputClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }
      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelOutputs[outputIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const addParamClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }

      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.parameters.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateParamClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.description){
        notice("warning", "失败", "“描述”不能为空")
        return
      }

      if(!inputForm.format){
        notice("warning", "失败", "“格式”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.parameters[paramIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    
    const inputClose = (index: number) => {
      ModelMetaDataForm.modelInputs.splice(index, 1);
    };
    const inputClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.modelInputs[index].name;
      inputForm.unit = ModelMetaDataForm.modelInputs[index].unit;
      inputForm.description = ModelMetaDataForm.modelInputs[index].description;
      inputForm.defaultValue = ModelMetaDataForm.modelInputs[index].defaultValue;
      inputForm.format = ModelMetaDataForm.modelInputs[index].format;
      inputUpdateFlag.value = true;
      Flag.value = "updateinput";
      inputIndex.value = index;
      add.value = true;
    };
    const outputClose = (index: number) => {
      ModelMetaDataForm.modelOutputs.splice(index, 1);
    };
    const outputClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.modelOutputs[index].name;
      inputForm.unit = ModelMetaDataForm.modelOutputs[index].unit;
      inputForm.description = ModelMetaDataForm.modelOutputs[index].description;
      inputForm.defaultValue = ModelMetaDataForm.modelOutputs[index].defaultValue;
      inputForm.format = ModelMetaDataForm.modelOutputs[index].format;
      Flag.value = "updateoutput";
      outputIndex.value = index;
      add.value = true;
    };
    const paramClose = (index: number) => {
      ModelMetaDataForm.parameters.splice(index, 1);
    };
    const paramClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.parameters[index].name;
      inputForm.unit = ModelMetaDataForm.parameters[index].unit;
      inputForm.description = ModelMetaDataForm.parameters[index].description;
      inputForm.defaultValue = ModelMetaDataForm.parameters[index].defaultValue;
      inputForm.format = ModelMetaDataForm.parameters[index].format;
      Flag.value = "updateparam";
      paramIndex.value = index;
      add.value = true;
    };

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入模型名称', trigger: 'change' }
      ],
      content: [
        { required: true, message: '请输入模型内容', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入模型描述', trigger: 'change' }
      ],
      version: [
        { required: true, message: '请输入版本信息', trigger: 'change' }
      ],
      type: [
        { required: true, message: '请输入模型类型', trigger: 'change' }
      ],
      softVersion: [
        { required: true, message: '请输入软件版本信息', trigger: 'change' }
      ],
      storage: [
        { required: true, message: '请输入软件存储位置', trigger: 'change' }
      ],
      serverStorage:[
        { required: true, message: '请输入服务存储位置', trigger: 'change' }
      ],
      algorithm: [
        { required: true, message: '请输入算法/等式', trigger: 'change' }
      ],
      modelInputs: [
        { required: true, message: '请添加输入信息', trigger: 'change' }
      ],
      modelOutputs: [
        { required: true, message: '请添加输出信息', trigger: 'change' }
      ],
      softDemand: [
        { required: true, message: '请输入软件需求', trigger: 'change' }
      ],
      necessity: [
        { required: true, message: '请选择软件必要性', trigger: 'change' }
      ],
      dependent: [
        { required: true, message: '请输入模型依赖库', trigger: 'change' }
      ],
      language: [
        { required: true, message: '请输入编程语言', trigger: 'change' }
      ],
      producteTime: [
        { required: true, message: '请输入发布时间', trigger: 'change' }
      ],
      hypothesis: [
        { required: true, message: '请输入模型假设', trigger: 'change' }
      ],
      application: [
        { required: true, message: '请输入模型适用范围', trigger: 'change' }
      ],
      parameters: [
        { required: true, message: '请添加参数信息', trigger: 'change' }
      ],
      upperboundary: [
        { required: true,message: '请添加模型运行上边界条件', trigger: 'change' }
      ],
      lowerboundary: [
        { required: true,message: '请添加模型运行下边界条件', trigger: 'change' }
      ],
      references: [
        { required: true,message: '请添加参考文献', trigger: 'none' }
      ],
      publication: [
        { required: true, message: '请输入出版机构', trigger: 'change' }
      ],
      codeContent: [
        { required: true, message: '请输入代码内容', trigger: 'change' }
      ],
      refSystemTime:[
        { required: true, message: '请输入时间参考系', trigger: 'none' }
      ],
      refSystemSpace:[
        { required: true, message: '请输入空间参考系', trigger: 'none' }
      ],
      })
      const xrules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入名称信息', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入描述信息', trigger: 'change' }
      ],
      format: [
        { required: true, message: '请输入格式信息', trigger: 'change' }
      ],

      })

    const submitForm = async () => {
      if(!ModelBaseInfoForm.name){
        notice("warning", "失败", "“模型名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.content){
        notice("warning", "失败", "“模型内容”不能为空")
        return
      }
      if(!ModelBaseInfoForm.description){
        notice("warning", "失败", "“模型描述”不能为空")
        return
      }
      if(!ModelBaseInfoForm.version){
        notice("warning", "失败", "“模型版本”不能为空")
        return
      }
      if(!ModelBaseInfoForm.type){
        notice("warning", "失败", "“模型类型”不能为空")
        return
      }
      if(ModelBaseInfoForm.type==="模块"){
        if(!ModelBaseInfoForm.softDemand){
          notice("warning", "失败", "“软件需求”不能为空")
          return
        }
        if(!ModelBaseInfoForm.softVersion){
          notice("warning", "失败", "“软件版本”不能为空")
          return
        }
        if(!ModelBaseInfoForm.storage){
          notice("warning", "失败", "“软件存储位置”不能为空")
          return
        }
      }
      else if(ModelBaseInfoForm.type==="服务"){
        if(!ModelBaseInfoForm.serverStorage){
          notice("warning", "失败", "“服务存储位置”不能为空")
          return
        }
      }
      else if(ModelBaseInfoForm.type==="代码"){
        if(!ModelBaseInfoForm.codeContent){
          notice("warning", "失败", "“代码内容”不能为空")
          return
        }
        if(!ModelBaseInfoForm.language){
          notice("warning", "失败", "“编程语言”不能为空")
          return
        }
        if(!ModelBaseInfoForm.dependent){
          notice("warning", "失败", "“模型依赖库”不能为空")
          return
        }
      }
      if(!ModelBaseInfoForm.refSystemTime.type){
        notice("warning", "失败", "“时间参考系类型”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemTime.name){
        notice("warning", "失败", "“时间参考系名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemSpace.type){
        notice("warning", "失败", "“空间参考系类型”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemSpace.name){
        notice("warning", "失败", "“空间参考系名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.producteTime){
        notice("warning", "失败", "“发布时间”不能为空")
        return
      }
      if(!ModelBaseInfoForm.hypothesis){
        notice("warning", "失败", "“模型假设”不能为空")
        return
      }
      if(!ModelBaseInfoForm.application){
        notice("warning", "失败", "“模型适用范围”不能为空")
        return
      }
      if(!(ModelMetaDataForm.modelInputs.length>0)){
        notice("warning", "失败", "“输入信息”不能为空")
        return
      }
      if(!(ModelMetaDataForm.modelOutputs.length>0)){
        notice("warning", "失败", "“输出信息”不能为空")
        return
      }
      if(!(ModelMetaDataForm.parameters.length>0)){
        notice("warning", "失败", "“参数信息”不能为空")
        return
      }
      if(!(ModelSourceForm.references.length>0)){
        notice("warning", "失败", "“参考文献”不能为空")
        return
      }
      if(!ModelSourceForm.publication){
        notice("warning", "失败", "“出版机构”不能为空")
        return
      }

      modelResource.modelBaseInfo.name = ModelBaseInfoForm.name
      modelResource.modelBaseInfo.content = ModelBaseInfoForm.content
      modelResource.modelBaseInfo.description = ModelBaseInfoForm.description
      modelResource.modelBaseInfo.version = ModelBaseInfoForm.version
      modelResource.modelBaseInfo.type = ModelBaseInfoForm.type
      modelResource.modelBaseInfo.softDemand = ModelBaseInfoForm.softDemand
      modelResource.modelBaseInfo.softVersion = ModelBaseInfoForm.softVersion
      modelResource.modelBaseInfo.storage = ModelBaseInfoForm.storage 
      modelResource.modelBaseInfo.serverStorage = ModelBaseInfoForm.serverStorage
      modelResource.modelBaseInfo.algorithm = ModelBaseInfoForm.algorithm
      modelResource.modelBaseInfo.codeContent = ModelBaseInfoForm.codeContent
      modelResource.modelBaseInfo.language = ModelBaseInfoForm.language
      modelResource.modelBaseInfo.dependent = ModelBaseInfoForm.dependent
      modelResource.modelBaseInfo.refSystemTime = ModelBaseInfoForm.refSystemTime
      modelResource.modelBaseInfo.refSystemSpace = ModelBaseInfoForm.refSystemSpace
      modelResource.modelBaseInfo.producteTime = ModelBaseInfoForm.producteTime
      modelResource.modelBaseInfo.hypothesis = ModelBaseInfoForm.hypothesis
      modelResource.modelBaseInfo.application = ModelBaseInfoForm.application
      modelResource.modelBaseInfo.updateTime = ModelBaseInfoForm.updateTime
      modelResource.modelBaseInfo.other = ModelBaseInfoForm.other
      modelResource.modelBaseInfo.isUpload = ModelBaseInfoForm.isUpload
      modelResource.modelBaseInfo.isCodeUpload = ModelBaseInfoForm.isCodeUpload

      modelResource.modelMetaData.upperboundary = ModelMetaDataForm.upperboundary
      modelResource.modelMetaData.parameters = ModelMetaDataForm.parameters
      modelResource.modelMetaData.lowerboundary = ModelMetaDataForm.lowerboundary
      modelResource.modelMetaData.modelInputs = ModelMetaDataForm.modelInputs
      modelResource.modelMetaData.modelOutputs = ModelMetaDataForm.modelOutputs
      
      modelResource.modelSource.references = ModelSourceForm.references
      modelResource.modelSource.publication = ModelSourceForm.publication
      modelResource.modelSource.develop = ModelSourceForm.develop
      modelResource.modelSource.UId = ModelSourceForm.UId
      modelResource.modelSource.license = ModelSourceForm.license
      
      modelResource.modelId = uuid.v4()
      const data = await saveModelResources(
        (router.currentRoute.value.params.apply as any).id,
        modelResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
        context.emit("returnModel", modelResource);
      }
    }
    const submitUpdate = async () => {
      if(!ModelBaseInfoForm.name){
        notice("warning", "失败", "“模型名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.content){
        notice("warning", "失败", "“模型内容”不能为空")
        return
      }
      if(!ModelBaseInfoForm.description){
        notice("warning", "失败", "“模型描述”不能为空")
        return
      }
      if(!ModelBaseInfoForm.version){
        notice("warning", "失败", "“模型版本”不能为空")
        return
      }
      if(!ModelBaseInfoForm.type){
        notice("warning", "失败", "“模型类型”不能为空")
        return
      }
      if(ModelBaseInfoForm.type==="模块"){
        if(!ModelBaseInfoForm.softDemand){
          notice("warning", "失败", "“软件需求”不能为空")
          return
        }
        if(!ModelBaseInfoForm.softVersion){
          notice("warning", "失败", "“软件版本”不能为空")
          return
        }
        if(!ModelBaseInfoForm.storage){
          notice("warning", "失败", "“软件存储位置”不能为空")
          return
        }
      }
      else if(ModelBaseInfoForm.type==="服务"){
        if(!ModelBaseInfoForm.serverStorage){
          notice("warning", "失败", "“服务存储位置”不能为空")
          return
        }
      }
      else if(ModelBaseInfoForm.type==="代码"){
        if(!ModelBaseInfoForm.codeContent){
          notice("warning", "失败", "“代码内容”不能为空")
          return
        }
        if(!ModelBaseInfoForm.language){
          notice("warning", "失败", "“编程语言”不能为空")
          return
        }
        if(!ModelBaseInfoForm.dependent){
          notice("warning", "失败", "“模型依赖库”不能为空")
          return
        }
      }
      if(!ModelBaseInfoForm.refSystemTime.type){
        notice("warning", "失败", "“时间参考系类型”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemTime.name){
        notice("warning", "失败", "“时间参考系名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemSpace.type){
        notice("warning", "失败", "“空间参考系类型”不能为空")
        return
      }
      if(!ModelBaseInfoForm.refSystemSpace.name){
        notice("warning", "失败", "“空间参考系名称”不能为空")
        return
      }
      if(!ModelBaseInfoForm.producteTime){
        notice("warning", "失败", "“发布时间”不能为空")
        return
      }
      if(!ModelBaseInfoForm.hypothesis){
        notice("warning", "失败", "“模型假设”不能为空")
        return
      }
      if(!ModelBaseInfoForm.application){
        notice("warning", "失败", "“模型适用范围”不能为空")
        return
      }
      if(!(ModelMetaDataForm.modelInputs.length>0)){
        notice("warning", "失败", "“输入信息”不能为空")
        return
      }
      if(!(ModelMetaDataForm.modelOutputs.length>0)){
        notice("warning", "失败", "“输出信息”不能为空")
        return
      }
      if(!(ModelMetaDataForm.parameters.length>0)){
        notice("warning", "失败", "“输出信息”不能为空")
        return
      }
      if(!(ModelSourceForm.references.length>0)){
        notice("warning", "失败", "“参考文献”不能为空")
        return
      }
      if(!ModelSourceForm.publication){
        notice("warning", "失败", "“出版机构”不能为空")
        return
      }
      modelResource.modelBaseInfo.name = ModelBaseInfoForm.name
      modelResource.modelBaseInfo.content = ModelBaseInfoForm.content
      modelResource.modelBaseInfo.description = ModelBaseInfoForm.description
      modelResource.modelBaseInfo.version = ModelBaseInfoForm.version
      modelResource.modelBaseInfo.type = ModelBaseInfoForm.type
      modelResource.modelBaseInfo.softDemand = ModelBaseInfoForm.softDemand
      modelResource.modelBaseInfo.softVersion = ModelBaseInfoForm.softVersion
      modelResource.modelBaseInfo.storage = ModelBaseInfoForm.storage
      modelResource.modelBaseInfo.serverStorage = ModelBaseInfoForm.serverStorage
      modelResource.modelBaseInfo.algorithm = ModelBaseInfoForm.algorithm
      modelResource.modelBaseInfo.codeContent = ModelBaseInfoForm.codeContent
      modelResource.modelBaseInfo.language = ModelBaseInfoForm.language
      modelResource.modelBaseInfo.dependent = ModelBaseInfoForm.dependent
      modelResource.modelBaseInfo.refSystemTime = ModelBaseInfoForm.refSystemTime
      modelResource.modelBaseInfo.refSystemSpace = ModelBaseInfoForm.refSystemSpace
      modelResource.modelBaseInfo.producteTime = ModelBaseInfoForm.producteTime
      modelResource.modelBaseInfo.hypothesis = ModelBaseInfoForm.hypothesis
      modelResource.modelBaseInfo.application = ModelBaseInfoForm.application
      modelResource.modelBaseInfo.updateTime = ModelBaseInfoForm.updateTime
      modelResource.modelBaseInfo.other = ModelBaseInfoForm.other
      modelResource.modelBaseInfo.isUpload = ModelBaseInfoForm.isUpload
      modelResource.modelBaseInfo.isCodeUpload = ModelBaseInfoForm.isCodeUpload

      modelResource.modelMetaData.upperboundary = ModelMetaDataForm.upperboundary
      modelResource.modelMetaData.parameters = ModelMetaDataForm.parameters
      modelResource.modelMetaData.lowerboundary = ModelMetaDataForm.lowerboundary
      modelResource.modelMetaData.modelInputs = ModelMetaDataForm.modelInputs
      modelResource.modelMetaData.modelOutputs = ModelMetaDataForm.modelOutputs
      
      modelResource.modelSource.references = ModelSourceForm.references
      modelResource.modelSource.publication = ModelSourceForm.publication
      modelResource.modelSource.develop = ModelSourceForm.develop
      modelResource.modelSource.UId = ModelSourceForm.UId
      modelResource.modelSource.license = ModelSourceForm.license
      modelResource.modelId = (props.modelItem as any).modelId
      const data = await updateModelResources(
        (router.currentRoute.value.params.apply as any).id,
        modelResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
        context.emit("updateModel", modelResource);
      }
    }
    onMounted(() => {
      if((props.modelItem as any) !='')
      {
        ModelBaseInfoForm.name = (props.modelItem as any).modelBaseInfo.name,
        ModelBaseInfoForm.content = (props.modelItem as any).modelBaseInfo.content,
        ModelBaseInfoForm.description = (props.modelItem as any).modelBaseInfo.description,
        ModelBaseInfoForm.version = (props.modelItem as any).modelBaseInfo.version,
        ModelBaseInfoForm.type = (props.modelItem as any).modelBaseInfo.type,
        ModelBaseInfoForm.softDemand = (props.modelItem as any).modelBaseInfo.softDemand,
        ModelBaseInfoForm.softVersion = (props.modelItem as any).modelBaseInfo.softVersion,
        ModelBaseInfoForm.storage = (props.modelItem as any).modelBaseInfo.storage,
        ModelBaseInfoForm.serverStorage = (props.modelItem as any).modelBaseInfo.serverStorage,
        ModelBaseInfoForm.algorithm = (props.modelItem as any).modelBaseInfo.algorithm,
        ModelBaseInfoForm.codeContent = (props.modelItem as any).modelBaseInfo.codeContent,
        ModelBaseInfoForm.language = (props.modelItem as any).modelBaseInfo.language,
        ModelBaseInfoForm.dependent = (props.modelItem as any).modelBaseInfo.dependent,
        ModelBaseInfoForm.refSystemTime = (props.modelItem as any).modelBaseInfo.refSystemTime,
        ModelBaseInfoForm.refSystemSpace = (props.modelItem as any).modelBaseInfo.refSystemSpace,
        ModelBaseInfoForm.producteTime = (props.modelItem as any).modelBaseInfo.producteTime,
        ModelBaseInfoForm.hypothesis = (props.modelItem as any).modelBaseInfo.hypothesis,
        ModelBaseInfoForm.application = (props.modelItem as any).modelBaseInfo.application,
        ModelBaseInfoForm.updateTime = (props.modelItem as any).modelBaseInfo.updateTime,
        ModelBaseInfoForm.other = (props.modelItem as any).modelBaseInfo.other,
        ModelBaseInfoForm.isUpload = (props.modelItem as any).modelBaseInfo.isUpload,
        ModelBaseInfoForm.isCodeUpload = (props.modelItem as any).modelBaseInfo.isCodeUpload,

        ModelMetaDataForm.upperboundary = (props.modelItem as any).modelMetaData.upperboundary,
        ModelMetaDataForm.lowerboundary = (props.modelItem as any).modelMetaData.lowerboundary,
        ModelMetaDataForm.modelInputs = (props.modelItem as any).modelMetaData.modelInputs,
        ModelMetaDataForm.modelOutputs = (props.modelItem as any).modelMetaData.modelOutputs,
        ModelMetaDataForm.parameters = (props.modelItem as any).modelMetaData.parameters,

        ModelSourceForm.references = (props.modelItem as any).modelSource.references,
        ModelSourceForm.publication = (props.modelItem as any).modelSource.publication,
        ModelSourceForm.develop = (props.modelItem as any).modelSource.develop,
        ModelSourceForm.UId = (props.modelItem as any).modelSource.UId,
        ModelSourceForm.license = (props.modelItem as any).modelSource.license
    }
    })
    
    return {
      Plus,
      inputClose,
      inputClick,
      outputClose,
      outputClick,
      paramClose,
      paramClick,
      ModelBaseInfoForm,
      ModelMetaDataForm,
      ModelSourceForm,
      submitForm,
      submitUpdate,
      modelResource,
      uuid,
      inputForm,
      add,
      upload,
      inputUpdateFlag,
      inputIndex,
      outputUpdateFlag,
      outputIndex,
      paramUpdateFlag,
      paramIndex,
      addInput,
      addOutput,
      addParam,
      addInputClick,
      updateInputClick,
      addOutputClick,
      updateOutputClick,
      addParamClick,
      updateParamClick,
      Flag,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      rules,
      xrules,
      storageUpload,
      codeContentUpload,
      submitUpload,
      uploadForm,
      changeupload,
      removeupload,
      deleteUpload,
      submitcodeUpload,
      codeuploadForm,
      changecodeupload,
      removecodeupload,
      deletecodeUpload,
      fileid,
      codeupload
    }

  }

});
</script>
<style lang="scss" scoped>
.el-tag{
  margin-right: 5px;
}
.mflex{
display: flex;
}
.necess{
  margin-right: 5px;
  color:lightcoral;
}
.text{
  display: flex;
  width: 80px;
  justify-content: flex-end;
  margin-right: 10px;
}
</style>