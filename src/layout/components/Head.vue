<template>
  <div class="head-main">
    <div class="logo">
      <img src="/earth.png" alt="" height="50" @click="toNav('/')" />
    </div>
    <div class="menu">
      <div
        :class="active === 1 ? 'menu-item active' : 'menu-item'"
        @click="toNav('/homework')"
      >
        模型作业
      </div>

      <div
        :class="active === 4 ? 'menu-item active' : 'menu-item'"
        @click="toNav('/certificate')"
      >
        证书
      </div>
    </div>
    <div class="avatar">
      <el-avatar src="/avatar.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { notice } from "@/utils/common";
import router from "@/router";

export default defineComponent({
  setup() {
    const userInfoFlag = ref(false);
    const active = ref(0);

    const toNav = (type: string) => {
      if (type === "/homework") {
        router.push({ path: type });
        active.value = 1;
      } else if (type === "/certificate") {
        router.push({ path: type });
        active.value = 4;
      } else {
        notice("warning", "警告", "页面暂未开放");
      }
    };

    watch(
      () => {
        return router.currentRoute.value.name;
      },
      (newValue) => {
        if (newValue === "Home") {
          active.value = 0;
        } else if (newValue === "Homework") {
          active.value = 1;
        } else if (newValue === "Certificate") {
          active.value = 4;
        }
      },
      {
        immediate: true,
      }
    );

    return {
      active,
      userInfoFlag,
      toNav,
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
    cursor: pointer;
  }
  .menu {
    display: flex;
    left: 400px;
    position: relative;
    .menu-item {
      margin: 0 20px;
      cursor: pointer;
      font-size: 18px;

      &:hover {
        color: #76c1e4;
      }
    }
    .active {
      box-sizing: border-box;
      border-bottom: solid 2px #76c1e4;
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