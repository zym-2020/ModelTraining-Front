<template>
  <div class="head-main">
    <div class="logo">
      <img src="/log/earth.png" alt="" height="50" @click="toNav('/')"/>
    </div>
    <div class="menu">
      <div class="menu-item" @click="toNav('/homework')">模型作业</div>
      <div class="menu-item" @click="toNav('/apply')">模型应用竞赛</div>
      <div class="menu-item" @click="toNav('/develp')">模型开发竞赛</div>
      <div class="menu-item" @click="toNav('/certificate')">证书</div>
    </div>
    <div class="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        @click="userInfoFlag = true"
      />
    </div>
  </div>
  <el-dialog v-model="userInfoFlag" title="学员信息" width="400px">
    <user-info-dialog></user-info-dialog>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserInfoDialog from "@/components/UserInfoDialog.vue";
import router from "@/router";
export default defineComponent({
  components: { UserInfoDialog },
  setup() {
    const userInfoFlag = ref(false);

    const toNav = (type: string) => {
      router.push({ path: type });
    };

    return {
      userInfoFlag,
      toNav
    };
  },
});
</script>

<style lang="scss" scoped>
.head-main {
  height: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px #eeeeee;
  position: relative;
  display: flex;
  line-height: 60px;
  .logo {
    margin-left: 100px;
  }
  .menu {
    display: flex;
    left: 400px;
    position: absolute;
    .menu-item {
      padding: 0 20px;
      cursor: pointer;
      font-size: 18px;
      &:hover {
        color: #76c1e4;
      }
    }
  }
  .avatar {
    position: absolute;
    right: 100px;
    .el-avatar {
      margin-top: 10px;
    }
    cursor: pointer;
  }
}
</style>