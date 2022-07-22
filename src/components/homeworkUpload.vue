<template>
  <div>
        <el-upload
            ref="upload"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            accept=".rar,.zip,.7z"
            :auto-upload="false"
        >
        <template #trigger>
            <el-button type="primary">选择文件</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
            上传文件
            </el-button>
            <template #tip>
            <div class="el-upload__tip text-red">
                最多上传一个文件, 新文件将覆盖旧文件
            </div>
        </template>
        </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
export default defineComponent({
  setup() { 
        const upload = ref<UploadInstance>()

        const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles)
        }

        const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
        console.log(uploadFile)
        }

        const handleExceed: UploadProps['onExceed'] = (files) => {
            upload.value!.clearFiles()
            const file = files[0] as UploadRawFile
            file.uid = genFileId()
            upload.value!.handleStart(file)
        }

        const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
        return ElMessageBox.confirm(
            `是否删除文件 ${uploadFile.name} ?`,'提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'}
        ).then(
            () => true,
            () => false
        )}
        const submitUpload = () => {
            upload.value!.submit()
        }
        return{
            handleRemove,
            handlePreview,
            handleExceed,
            beforeRemove,
            submitUpload,
            upload

        }
    }
});
</script>

<style lang="scss" scoped>
.ml-3{
    margin-left: 20px;
}
.el-divider{
    margin-left: 20px;
    width: 560px;
    opacity: 0.8;
    margin-top: 10px;
    margin-bottom: 10px;
    border-color: rgb(0, 140, 255);
}
</style>