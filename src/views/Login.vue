<template>
  <el-form
    label-position="right"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.teamId" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
  </el-form>
  <el-button @click="loginClick">登录</el-button>
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
<style>
  .el-footer {
    height: 200px;
  }
  h3 {
    color: rgb(0, 140, 255);
    font-size: 24px;
    margin-left:95px;
  }
  .el-divider{
    border-color:rgb(0, 140, 255)
  }
  .el-button {
    width: 80%;
    margin-left:40px;
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