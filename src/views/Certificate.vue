<template>
  <el-form :inline="true" :model="certificate" class="certificate-form">
    <h3>选择证书类型</h3>
    <el-divider/>
    <el-row class="select-form">
    <el-col :span="12">
        <el-form-item >
        <el-select v-model="certificate.ctype" placeholder="请选择">
            <el-option label="模型培训" value="Train" />
            <el-option label="模型应用竞赛" value="Apply" />
            <el-option label="模型开发竞赛" value="Develop" />
        </el-select>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item>
            <el-button type="danger" @click="onDownLoad">下载</el-button>
        </el-form-item>
    </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'
export default defineComponent({
    setup() {
    const certificate = reactive({
            ctype: ''
        })
    const onDownLoad = () => {
        console.log('certificate.type')
    }
    return{
        certificate,
        onDownLoad
    }
    }

})
</script>

<style lang="scss" scoped>
  .el-footer {
    margin-bottom: 150px;
  }
  h3 {
    display: flex;
    justify-content: center;
    color: rgb(255, 100, 100);
    font-size: 24px;
  }
  .el-divider{
    border-color:rgb(255, 100, 100);
    width: 300px;
    margin-left: 50px;
  }
  .select-form{
    width: 400px;
    margin-left: 65px;
  }
  /deep/ .el-select,
  /deep/ .el-input,
  /deep/ .el-input__inner{
    color:rgb(255, 100, 100);
    border:0px;
    border-radius:0px;
    text-align: center;
  }

    .el-select-dropdown__item{
        background-color: transparent;
        color:rgb(255, 100, 100);
    }
    .el-select-dropdown__item:hover{
    color:rgb(255, 0, 170);
  }
  .certificate-form {
    background-image:url("../../public/img/icons/CertificateSelect.png");
    background-size:25% 50%;
    background-repeat:no-repeat ;
    background-position: left top;
    background-color: rgb(255, 230, 230);
    width: 400px;
    height: 200px;
    margin: 210px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
    border: 2px solid  rgb(255, 100, 100);
    border-radius: 30px;
    box-shadow:var(--el-box-shadow-dark);
}
</style>