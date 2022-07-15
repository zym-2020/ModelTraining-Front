<template>
<div class="login-wrap">
  <el-form :model="formLabelAlign" class="inform">
    <h3>模型培训提交系统</h3>
    <el-divider/>
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.teamId" placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.name" placeholder="请输入密码"/>
      </el-form-item>
  </el-form>
  <el-button type="primary" @click="loginClick">登录</el-button>
</div>
  <el-footer><foot /></el-footer>
</template>

<script lang="ts">
import Foot from "../layout/components/Foot.vue";
import { defineComponent, reactive, ref } from "vue";
// import { useStore } from "@/store";
import { store } from '@/store'
export default defineComponent({
  setup() {
    // const store = useStore();
    const formLabelAlign = reactive({
      teamId: "",
      name: "",
    });

    const loginClick = async () => {
      await store.dispatch("login", {
        teamId: formLabelAlign.teamId,
        name: formLabelAlign.name,
      });
    };

    return {
      formLabelAlign,
      loginClick
    };
  },
  components:{Foot}
});
</script>
<style lang="scss" scoped>
  .el-footer {
    margin-bottom: 150px;
  }
  h3 {
    display: flex;
    justify-content: center;
    color: rgb(0, 140, 255);
    font-size: 24px;
  }
  .el-divider{
    border-color:rgb(0, 140, 255);
    width: 300px;
    margin-left: 50px;
  }
  .el-button {
    width: 160px;
    margin-left: 120px;
  }
  .el-form-item{
    width: 240px;
    margin-left: 80px;
  }


  .login-wrap {
    background-image:url("../../public/img/icons/loginbg.png");
    background-size:80% 150%;
    background-repeat:no-repeat ;
    background-position: right;
    background-color: rgb(245, 245, 255);
    width: 400px;
    height: 300px;
    margin: 210px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
    border: 2px solid  rgb(0, 140, 255);
    border-radius: 30px;
    box-shadow:var(--el-box-shadow-dark);
}

</style>