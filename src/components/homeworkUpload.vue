<template>
  <div>
    <div class="current">
      <div style="color: #409eff; margin-left: 5px">
        <strong>当前保存作业：</strong>
      </div>
      <div class="current-item" v-if="currentFile != ''">
        <svg style="width: 40px; height: 40px">
          <use xlink:href="#icon-word"></use>
        </svg>
        <div class="title">{{ currentFile }}</div>
        <div class="btn">
          <el-button type="info" plain @click="handleDownload">下载</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定删除该作业？"
            @confirm="handleRemove"
          >
            <template #reference>
              <el-button type="danger" plain :disabled="state === 1"
                >删除</el-button
              >
            </template>
          </el-popconfirm>

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确定提交该作业？"
            @confirm="handleCommit"
          >
            <template #reference>
              <el-button type="success" plain :disabled="state === 1"
                >提交</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="current-item" v-else>
        <div class="no-data">暂无</div>
      </div>
    </div>
    <el-upload
      ref="upload"
      action="#"
      :on-change="handleChange"
      :limit="1"
      :on-exceed="handleExceed"
      accept=".doc,.docx"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary" class="open-file" :disabled="state === 1"
          >选择文件</el-button
        >
      </template>
      <el-button
        type="success"
        @click="submitUpload"
        :disabled="uploadFile == undefined || state === 1"
      >
        上传文件
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          最多上传一个文件, 新文件将覆盖旧文件，点击提交后，将不能再进行更改
        </div>
      </template>
    </el-upload>
    <el-progress :percentage="percentage" v-if="uploadFlag" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { genFileId } from "element-plus";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
} from "element-plus";
import { notice } from "@/utils/notice";
import { createFileChunk, handlePostFiles, checkMergeStatus } from "@/utils/file";
import {
  mergeFiles,
  clearTemp,
  removeFile,
  download,
  commit,
  getUserInfo
} from "@/api/request";
import { InfoFilled } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    index: {
      type: String,
    },
    currentFileName: {
      type: String,
    },
    state: {
      type: Number,
    },
  },
  emits: ['changeState'],
  setup(props, context) {
    const upload = ref<UploadInstance>();
    const uploadFile = ref<any>();
    const currentFile = ref<string>(props.currentFileName as string);
    const uploadFlag = ref(false);
    const percentage = ref(0);
    const state = ref(props.state as number);

    const handleExceed: UploadProps["onExceed"] = (files) => {
      upload.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upload.value!.handleStart(file);
    };

    const handleChange = (file: UploadFile) => {
      uploadFile.value = file;
      console.log(file);
    };

    const handleRemove = async () => {
      const data = await removeFile(props.index as string);
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "删除成功！");
        currentFile.value = "";
      }
    };

    const handleCommit = async () => {
      if (uploadFile.value != "") {
        const data = await commit(props.index as string);
        if (data != null && (data as any).code === 0) {
          notice("success", "成功", "提交成功!");
          state.value = 1;
          context.emit('changeState', props.index)
        }
      } else {
        notice("error", "错误", "请先上传文件再提交");
      }
    };

    const handleDownload = async () => {
      const data = await getUserInfo()
      // await download(props.index as string, currentFile.value);
      if(data != null && (data as any).code === 0) {
        window.location.href = `https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/homework/download/${data.data.memberId}/${props.index}`
      }
      
    };

    const submitUpload = async () => {
      const suffix = uploadFile.value.name.substring(
        uploadFile.value.name.lastIndexOf(".")
      );
      if (!(suffix === ".doc" || suffix === ".docx")) {
        notice("warning", "警告", "暂只支持.doc，.docx类型的文件上传");
        return;
      }
      const files = createFileChunk(uploadFile.value.raw);
      const chunkList = [];
      for (let i = 0; i < files.length; i++) {
        chunkList.push(i.toString());
      }
      uploadFlag.value = true;
      await clearTemp(props.index as string);
      await handlePostFiles(
        chunkList,
        files,
        props.index as string,
        percentage
      );
      if (chunkList.length > 0) {
        notice("error", "错误", "文件上传时出错！");
      }
      const key = await mergeFiles({
        number: props.index as string,
        name: uploadFile.value.name,
        total: files.length,
      });
      if (key != null && (key as any).code === 0) {
        function check(res: number) {
          if (res === 1) {
            notice("success", "成功", "上传成功!");
            currentFile.value = uploadFile.value.name;
            upload.value!.clearFiles();
            uploadFile.value = undefined;
            uploadFlag.value = false;
          } else {
            notice("error", "失败", "上传失败！");
          }
        }
        await checkMergeStatus(key.data, check);
        // while (state.data === 0) {
        //   setTimeout(async () => {
        //     state = await checkState(key.data);
        //   }, 1500);
        // }
        // if (state.data === 1) {
        //   notice("success", "成功", "上传成功!");
        //   currentFile.value = uploadFile.value.name;
        // } else {
        //   notice("error", "失败", "上传失败！");
        // }
        // upload.value!.clearFiles();
        // uploadFile.value = undefined;
        // uploadFlag.value = false;
      }
    };

    return {
      handleChange,
      handleExceed,
      submitUpload,
      handleRemove,
      handleDownload,
      handleCommit,
      currentFile,
      upload,
      uploadFile,
      uploadFlag,
      percentage,
      state,
      InfoFilled,
    };
  },
});
</script>

<style lang="scss" scoped>
.current {
  margin-bottom: 10px;
  font-size: 14px;
  .current-item {
    height: 40px;
    display: flex;
    .title {
      line-height: 40px;
      width: 425px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .no-data {
      margin: 0 auto;
      line-height: 40px;
      color: #cdced1;
    }
  }
}
.open-file {
  margin-right: 10px;
}
.el-divider {
  margin-left: 20px;
  width: 560px;
  opacity: 0.8;
  margin-top: 10px;
  margin-bottom: 10px;
  border-color: rgb(0, 140, 255);
}
</style>