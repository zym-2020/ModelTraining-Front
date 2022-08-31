<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    disabled
  >
    <el-icon><Plus /></el-icon>
        <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible" >
    <img class="previewPicture" w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile, UploadFile } from 'element-plus'

export default defineComponent({
props:{
fileList:{
    type: Array
},
fileName:{
  type:String
}
},
setup(props) {
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref<UploadUserFile[]>([]);
const fileName = computed(()=>{
  return props.fileName
})
const handleDownload = (file:any) => {
    // let url = window.URL.createObjectURL(new Blob([file.url]));
    // let link = document.createElement('a');
    // link.style.display = 'none';
    // link.href = url
    // link.setAttribute('download', file.name);
    // document.body.appendChild(link);
    // link.click();
    downloadIamge(file.url)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const downloadIamge=(imgsrc:string)=> {
      //下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        if(context!=null)
            context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = fileName.value || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
 
      image.src = imgsrc;
    }

onMounted(() => {
    if (props.fileList != undefined) {
    props.fileList.forEach((item) => {
        fileList.value.push({
        name: item as string,
        url: "https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/upload/getImg/" + item,
        });
    });
    }
});

  return{
    dialogImageUrl,
    dialogVisible,
    handlePictureCardPreview,
    fileList,
    handleDownload,
    downloadIamge
  }
  }
});
</script>

<style lang="scss">

.el-upload--picture-card {
    display: none !important; /* 上传按钮隐藏 */
}
.previewPicture{
    display: flex;
    margin: 0 auto;
    height: 600px;
}

</style>