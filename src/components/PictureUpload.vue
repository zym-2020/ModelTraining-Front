<template>
  <div>
    <!-- <el-upload
      v-model:file-list="fileList"
      action="http://:8888/upload/uploadImg"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-change = "changeupload"
      accept=".jpg,.png,.JPG,.PNG"
    >
      <el-icon><Plus /></el-icon>
    </el-upload> -->
  <el-upload
      v-model:file-list="fileList"
      action="https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/upload/uploadImg"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-change = "changeupload"
      list-type="picture"
      accept=".jpg,.png,.JPG,.PNG"
  >
    <el-button type="primary">图片上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        单个 .JPG .PNG 文件大小限制为2.5M
      </div>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" @click="handlePictureCardPreview(file)"/>
      <label class="el-upload-list__item-status-label">
      <i class="el-icon--upload-success el-icon--check" style="transform:rotate(0deg);margin-bottom:12px;"><el-icon><Check /></el-icon></i>
      </label>
      <i class="el-icon--close" ><el-icon @click="handleRemove(file,fileList)"><Close /></el-icon></i>
      </div>
    </template>
  </el-upload>
    <el-dialog v-model="dialogVisible">
      <img class="image" w-full :src="dialogImageUrl" alt="Preview Image" />
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
    let formData = new FormData()
    const fileList = ref<UploadUserFile[]>([]);
    const uploadRef =ref([] as any[])
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const handleRemove= (file:any, files:any) => {
        let arr = files,newArr = [];
				for(let i=0;i<arr.length;i++){
					if(file != arr[i]){
						newArr.push(arr[i])
					}
				}
				fileList.value = newArr;
      context.emit("returnPictureList", fileList.value)
    };

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url!;
      dialogVisible.value = true;
    };
    const changeupload = (file:any,files:any) =>{
      const temp = [] as any[]
      for(let item of files){
        temp.push(item.raw)
      }
      uploadRef.value=temp
      formData.append('datafile', uploadRef.value[0])
    }
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
            url: "https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/upload/getImg/" + item,
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
      uploadRef,
      formData,
      changeupload,
    };
  },
});
</script>

<style lang="scss" scoped>
.image{
    display: flex;
    margin: 0 auto;
}
/deep/ .el-upload-list__item {
  height: 100px;
  width: 110px;
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
