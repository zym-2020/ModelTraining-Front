<template>
  <el-form
    label-position="right"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="账号">
      <el-input v-model="formLabelAlign.account" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
  </el-form>
  <el-button @click="loginClick">登录</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { login } from "@/api/request";
// import { useStore } from "@/store";
import { store } from '@/store'
export default defineComponent({
  setup() {
    // const store = useStore();
    const formLabelAlign = reactive({
      account: "",
      password: "",
    });

    const loginClick = async () => {
      await store.dispatch("login", {
        account: formLabelAlign.account,
        password: formLabelAlign.password,
      });
    };

    return {
      formLabelAlign,
      loginClick
    };
  },
});
</script>
