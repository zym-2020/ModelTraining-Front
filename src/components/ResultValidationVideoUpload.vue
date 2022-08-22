<template>
    <el-form label-width="200px">
      <el-form-item label="上传结果验证视频" prop="file">
        <el-upload
          accept=".MP4, .mp4"
          ref="uploadRef"
          class="upload-demo"
          :auto-upload="false"
          :on-change="changeupload"
          :on-remove="removeupload"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
                最多上传一个文件，格式为.mp4，上传状态变更后请及时保存
            </div>
        </template>
          <el-button v-if="!dialogVisible" style="margin-left:10px" class="ml-3" type="success" @click="submitUpload">
            上传
          </el-button>
          <el-button v-if="dialogVisible" style="margin-left:10px" class="ml-3" type="danger" @click="deleteUpload">
            删除
          </el-button>
          <div v-if="dialogVisible" style="margin-top:10px">已上传文件：<el-tag>{{uploadForm.name}}</el-tag></div>
          
          </el-upload>
        </el-form-item>
      </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import router from "@/router";
import type { UploadProps, UploadUserFile, UploadInstance, UploadFile } from "element-plus";
import { createFileChunk, handlePostVideoFiles, checkVideoMergeStatus } from "@/utils/file";
import {
  removeResultValidationVideoFile,
  clearVideoTemp,
  mergeResultValidationVideoFiles
} from "@/api/request";
import { notice } from "@/utils/notice";
import test from "node:test";
export default defineComponent({
  props: {
    videoItem: {
      type: Object,
    }
  },
  emits: ['returnVideo'],
  setup(props, context) {
    const upload = ref<UploadInstance>();
    const dialogVideoUrl = ref("");
    const dialogVisible = ref(false);
    const uploadFile = ref<any>();
    const uploadFlag = ref(false);
    const percentage = ref(0);
    const uuid = require('uuid')
    const videoId = uuid.v4()
    const uploadRef =ref([] as any[])
    const uploadForm = reactive({
      name:'',
      id:''
    });
    const changeupload = (file:any,files:any) =>{
      if (files.length > 1) {
        files.splice(0, 1);
      }
        uploadFile.value=files[0]
    }
    const removeupload = (file:any,files:any) =>{
    }

    const deleteUpload = async () => {
      const data = await removeResultValidationVideoFile((router.currentRoute.value.params.apply as any).id);
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "删除成功！");
        dialogVisible.value = false
        uploadForm.name = '';
        uploadForm.id = '';
        context.emit("returnVideo", uploadForm)
      }
    }

    const handleChange = (file: UploadFile) => {
      uploadFile.value = file
    }


    const submitUpload = async () => {
      const suffix = uploadFile.value.name.substring(
        uploadFile.value.name.lastIndexOf(".")
      );
      if (!(suffix === ".mp4")) {
        notice("warning", "警告", "暂只支持.mp4类型的文件上传");
        return;
      }
      const files = createFileChunk(uploadFile.value.raw);
      const chunkList = [];
      for (let i = 0; i < files.length; i++) {
        chunkList.push(i.toString());
      }
      uploadFlag.value = true;
      await clearVideoTemp(videoId);
      await handlePostVideoFiles(
        chunkList,
        files,
        videoId
      );
      if (chunkList.length > 0) {
        notice("error", "错误", "文件上传时出错！");
        return
      }
      const key = await mergeResultValidationVideoFiles(
        (router.currentRoute.value.params.apply as any).id,
        {
        uuid: videoId,
        name: uploadFile.value.name,
        total: files.length,
      });
      if (key != null && (key as any).code === 0) {
        function check(res: number) {
          if (res === 1) {
            notice("success", "成功", "上传成功!");
            dialogVisible.value = true
            uploadForm.id = videoId
            uploadForm.name = uploadFile.value.name
            context.emit("returnVideo", uploadForm)
          } else {
            notice("error", "失败", "上传失败！");
          }
        }
        await checkVideoMergeStatus(key.data, check);
      }
    };
    onMounted(() => {
      if((props.videoItem as any)){
        uploadForm.name = (props.videoItem as any).name
        uploadForm.id = (props.videoItem as any).id
        if(uploadForm.id){
          dialogVisible.value = true
        }
      }

    });

    return {
      dialogVisible,
      dialogVideoUrl,
      submitUpload,
      uploadFile,
      uploadFlag,
      percentage,
      upload,
      handleChange,
      uuid,
      videoId,
      changeupload,
      removeupload,
      deleteUpload,
      uploadRef,
      uploadForm
    };
  },
});
</script>

<style lang="scss" scoped>
.video {
  display: flex;
  margin: 0 auto;
}

/deep/ .el-upload-list__item {


  .el-icon--close-tip {
    display: none !important;
  }
}

/deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  margin-right: 8px;
}
</style>