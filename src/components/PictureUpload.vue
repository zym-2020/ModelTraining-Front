<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      action="http://localhost:8888/upload/uploadImg"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      accept=".jpg,.png,.JPG,.PNG"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import type { UploadProps, UploadUserFile } from "element-plus";
import { notice } from "@/utils/notice";
export default defineComponent({
  props: {
    pictureList: {
      type: Array,
    },
  },
  emits: ['returnPictureList'],
  setup(props, context) {
    const fileList = ref<UploadUserFile[]>([]);
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
      console.log(fileList.value);
      context.emit("returnPictureList", fileList.value)
    };

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url!;
      dialogVisible.value = true;
    };

    const handleBeforeUpload = (rawFile: any) => {
      const fileType = rawFile.name.substring(rawFile.name.lastIndexOf("."));
      if (
        fileType != ".png" &&
        fileType != ".jpg" &&
        fileType != ".PNG" &&
        fileType != ".JPG"
      ) {
        notice("warning", "警告", "文件上传暂只支持.jpg,.png格式");
        return false;
      }
    };

    const handleSuccess = (response: any) => {
      fileList.value[fileList.value.length - 1].name = response.data
      context.emit("returnPictureList", fileList.value)
    };

    onMounted(() => {
      if (props.pictureList != undefined) {
        props.pictureList.forEach((item) => {
          fileList.value.push({
            name: item as string,
            url: "http://localhost:8888/upload/getImg/" + item,
          });
        });
      }
    });

    return {
      fileList,
      handlePictureCardPreview,
      handleRemove,
      dialogVisible,
      dialogImageUrl,
      handleSuccess,
      handleBeforeUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
/deep/ .el-upload-list__item {
  height: 100px;
  width: 100px;
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