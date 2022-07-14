<template>
    <el-form :inline="true"  class="form-inline">
        <el-row type="flex" justify="center">
        <h3 class="mh3">选择证书类型</h3>
        <el-divider />
            <el-form-item >
            <div class="select_btn">
            <el-select v-model="certificateType.mySelect" placeholder="请选择">
                <el-option label="模型培训" value="ModelTrian" />
                <el-option label="模型应用竞赛" value="Apply" />
                <el-option label="模型开发竞赛" value="Develop" />
            </el-select>
            </div>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="onDownLoad">下载</el-button>
            </el-form-item>
        </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'
export default defineComponent({
    setup() {
        const certificateType =reactive({
            mySelect:''
        })
        const onDownLoad = () => {
            console.log(certificateType.mySelect)
        }
        return{
            onDownLoad,
            certificateType
        }
    }
})
</script>

<style lang="scss" scoped>
.form-inline{
    background-size: 25% 50%;
    background-image:url("../../public/img/icons/CertificateSelect.png");
    background-repeat:no-repeat ;
    background-position: top left;
    background-color: rgb(255, 245, 245);
    width: 400px;
    height: 200px;
    margin: 200px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
    border: 2px solid  rgb(255, 100, 100);
    border-radius: 30px;
    box-shadow:var(--el-box-shadow-dark);
}

.el-divider{
    width: 300px;
    border-color: rgb(255, 100, 100);;
}
.mh3
.el-select-dropdown__item{
       color: rgb(255, 100, 100);
   }
.el-select-dropdown__item:hover{
       color:rgb(255, 100, 100);
       background-color: rgb(255, 245, 245);
   }

</style>