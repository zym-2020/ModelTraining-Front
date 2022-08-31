<template>
  <div class="head-main">
    <div class="logo">
      <img
        src="/modelTrainingCourse/submission/log/earth.png"
        alt=""
        height="50"
        @click="toNav('/modelTrainingCourse/submission')"
      />
    </div>
    <div class="menu">
      <div
        :class="active === 1 ? 'menu-item active' : 'menu-item'"
        @click="toNav('/modelTrainingCourse/submission/homework')"
      >
        模型作业
      </div>
      <div
        :class="active === 2 ? 'menu-item active' : 'menu-item'"
        @click="toNav('/modelTrainingCourse/submission/apply')"
      >
        模型应用/开发竞赛
      </div>
      <div
        :class="active === 4 ? 'menu-item active' : 'menu-item'"
        @click="toNav('/modelTrainingCourse/submission/certificate')"
      >
        证书
      </div>
    </div>
    <div class="avatar">
      <el-avatar
        src="/modelTrainingCourse/submission/avatar.png"
        @click="userInfoFlag = true"
      />
    </div>
  </div>
  <el-dialog v-model="userInfoFlag" title="学员信息" width="400px">
    <user-info-dialog></user-info-dialog>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import UserInfoDialog from "@/components/UserInfoDialog.vue";
import router from "@/router";
import { notice } from "@/utils/notice";
export default defineComponent({
  components: { UserInfoDialog },
  setup() {
    const userInfoFlag = ref(false);
    const active = ref(0);

    const toNav = (type: string) => {
      if (type === "/modelTrainingCourse/submission/homework") {
        router.push({ path: type });
        active.value = 1;
      } else if (type === "/modelTrainingCourse/submission") {
        router.push({ path: type });
        active.value = 0;
      } else if (type === "/modelTrainingCourse/submission/certificate") {
        router.push({ path: type });
        active.value = 4;
      } else if (type === "/modelTrainingCourse/submission/apply") {
        router.push({ path: type });
        active.value = 2;
      }else {
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
        } else if (newValue === "Apply") {
          active.value = 2;
        } else if (newValue === "Develp") {
          active.value = 3;
        } else if (newValue === "Certificate") {
          active.value = 4;
        }
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