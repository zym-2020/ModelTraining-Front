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
});
</script>
