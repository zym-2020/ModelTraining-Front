<template>
  <div>
    <el-form label-position="right" label-width="110px" :model="resultForm" :rules="rules">
      <el-form-item label="结果名称" prop="name">
        <el-input v-model="resultForm.name" @change="changeHandle" placeholder="详细说明该数据的名称"/>
      </el-form-item>
      <el-form-item label="结果描述" prop="description">
        <el-input v-model="resultForm.description" @change="changeHandle" type="textarea"/>
      </el-form-item>
      <el-form-item label="结果存储位置" prop="location">
        <div style="display:flex;width: 520px;"><el-input @change="changeHandle" v-model="resultForm.location" placeholder="详细说明获取该结果的原始路径"/>
        <a style="margin-left:10px">或</a><el-button style="margin-left:10px" type="primary" @click="storageUpload">上传</el-button></div>
      </el-form-item>
      <h5 style="margin-left: 120px;color:rgb(150,150,150);">说明：直接输入文件的下载链接 或者 通过上传生成下载链接</h5>
      <el-form-item label="结果格式" prop="format">
        <el-input v-model="resultForm.format" @change="changeHandle" placeholder="例如：栅格数据、矢量数据"/>
      </el-form-item>
      <el-form-item label="结果版本" prop="version">
        <el-input v-model="resultForm.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="发布时间" prop="time">
        <el-input v-model="resultForm.time" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="resultForm.updateTime" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据单位" prop="nuit">
        <el-input v-model="resultForm.unit" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="小数位" prop="precision">
        <el-input v-model="resultForm.precision" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="唯一标识符">
        <el-input v-model="resultForm.identifier" @change="changeHandle" />
      </el-form-item>
    <el-form-item label="时空尺度" prop="spacetimescales" >
      <el-tag
        type="success"
        v-for="(item, index) in resultForm.spacetimescales"
        :key="index"
        closable
        @close="STCClose(index)"
        @click="STCClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag=false" />
    </el-form-item>

    </el-form>
    <picture-upload
      :pictureList="resultForm.pictures"
      @returnPictureList="returnPictureList"
    ></picture-upload>
  </div>
    <el-dialog v-model="add" width="400px" title="添加时空尺度">
      <el-form :model="inputForm" label-width="100px" :rules="strules">
        <el-form-item label="输入名称" prop="name">
          <el-input v-model="inputForm.name" />
        </el-form-item>
        <el-form-item label="输入类型" prop="type">
          <el-select v-model="inputForm.type" placeholder="请选择">
            <el-option label="时间" value="时间" />
            <el-option label="空间" value="空间" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入范围" prop="scope">
          <el-input v-model="inputForm.scope" />
        </el-form-item>
        <el-form-item label="输入分辨率" prop="resolution">
          <el-input v-model="inputForm.resolution" />
        </el-form-item>
        <el-form-item label="其他补充">
          <el-input v-model="inputForm.other" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!Flag">
          <el-button type="primary" @click="addSTCClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else>
          <el-button type="success" @click="updateSTCClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="upload" width="500px" title="结果上传" >
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
                最多上传一个文件，请勿重复上传
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import PictureUpload from "./PictureUpload.vue";
import type {  FormRules } from 'element-plus'
import { Plus } from "@element-plus/icons-vue";
import { notice } from "@/utils/notice";
import { uploadData } from "@/api/request";
import { deleteData } from "@/api/request";
export default defineComponent({
  components: { PictureUpload },
  props: {
    resultFormValue: {
      type: Object,
    },
  },
  emits: ["returnResultFormValue"],
  setup(props, context) {
    const add = ref(false);
    const Flag = ref(false);
    const STCIndex = ref(-1);
    const STCUpdateFlag = ref(false);
    const uploadRef =ref([] as any[])
    const upload = ref(false);
    const fileid = ref("")
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
    const resultForm = reactive({
      name: (props.resultFormValue as any).name,
      description: (props.resultFormValue as any).description,
      location: (props.resultFormValue as any).location,
      format: (props.resultFormValue as any).format,
      version: (props.resultFormValue as any).version,
      time: (props.resultFormValue as any).time,
      updateTime: (props.resultFormValue as any).updateTime,
      unit: (props.resultFormValue as any).unit,
      precision: (props.resultFormValue as any).precision,
      spacetimescales:[] as any [],
      identifier: (props.resultFormValue as any).identifier,
      visualization: (props.resultFormValue as any).visualization,
      dataHandle: (props.resultFormValue as any).dataHandle,
      dataTransformation: (props.resultFormValue as any).dataTransformation,
      pictures: (props.resultFormValue as any).pictures,
    });
    const storageUpload = () => {
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
        resultForm.location = 'http://221.226.60.2:8082/data/'+fileid.value
        uploadForm.location = 'http://221.226.60.2:8082/data/'+fileid.value
        changeHandle()
      }
    }
    const deleteUpload = async () => {
      const data = await deleteData(fileid.value);
      if (data != null && ((data as any).code === 1||(data as any).message === 'file not exist')) {
        notice("success", "成功", "删除成功！");
        uploadForm.location=''
        resultForm.location=''
        changeHandle()
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
    const addSTCClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.type){
        notice("warning", "失败", "“类型”不能为空")
        return
      }
      if(!inputForm.scope){
        notice("warning", "失败", "“范围”不能为空")
        return
      }
      if(!inputForm.resolution){
        notice("warning", "失败", "“分辨率”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        type: inputForm.type,
        scope: inputForm.scope,
        resolution: inputForm.resolution,
        other: inputForm.other
      };
      resultForm.spacetimescales.push(temp);
      inputForm.name = "";
      inputForm.type = "";
      inputForm.scope = "";
      inputForm.resolution = "";
      inputForm.other = "";
      add.value = false;
    };
    const updateSTCClick = () => {
      if(!inputForm.name){
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if(!inputForm.type){
        notice("warning", "失败", "“类型”不能为空")
        return
      }
      if(!inputForm.scope){
        notice("warning", "失败", "“范围”不能为空")
        return
      }
      if(!inputForm.resolution){
        notice("warning", "失败", "“分辨率”不能为空")
        return
      }
      const temp = {
        name: inputForm.name,
        type: inputForm.type,
        scope: inputForm.scope,
        resolution: inputForm.resolution,
        other: inputForm.other
      };
      resultForm.spacetimescales[STCIndex.value] = temp;
      inputForm.name = "";
      inputForm.type = "";
      inputForm.scope = "";
      inputForm.resolution = "";
      inputForm.other = "";
      add.value = false;
    };
    const STCClose = (index: number) => {
      resultForm.spacetimescales.splice(index, 1);
    };
    const STCClick = (index: number) => {
      inputForm.name = resultForm.spacetimescales[index].name;
      inputForm.type = resultForm.spacetimescales[index].type;
      inputForm.scope = resultForm.spacetimescales[index].scope;
      inputForm.resolution = resultForm.spacetimescales[index].resolution;
      inputForm.other = resultForm.spacetimescales[index].other;
      STCUpdateFlag.value = true;
      Flag.value = true;
      STCIndex.value = index;
      add.value = true;
    };
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入结果名称', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入结构描述', trigger: 'change' }
      ],
      location: [
        { required: true, message: '请输入结果位置', trigger: 'change' }
      ],
      format: [
        { required: true, message: '请输入结构格式', trigger: 'change' }
      ],
      time: [
        { required: true, message: '请输入发布时间', trigger: 'change' }
      ],
      spacetimescales: [
        { required: true, message: '请添加时空尺度', trigger: 'change' }
      ]
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
    const changeHandle = () => {
      context.emit("returnResultFormValue", resultForm);
    };

    const returnPictureList = (val: any[]) => {
      resultForm.pictures = [];
      val.forEach((item) => {
        resultForm.pictures.push(item.name);
      });
    };
    onMounted(() => {
        if((props.resultFormValue as any).spacetimescales!="{}")
        resultForm.spacetimescales=(props.resultFormValue as any).spacetimescales
    })

    return {
      resultForm,
      changeHandle,
      returnPictureList,
      rules,
      strules,
      add,
      Flag,
      STCIndex,
      STCUpdateFlag,
      inputForm,
      addSTCClick,
      updateSTCClick,
      STCClose,
      STCClick,
      Plus,
      storageUpload,
      submitUpload,
      uploadForm,
      changeupload,
      removeupload,
      deleteUpload,
      fileid,
      upload
    };
  },
});
</script>

<style lang="scss" scoped>
</style>