<template>
  <div class="user-info-dialog">
    <div>
      <el-avatar
        src="/modelTrainingCourse/submission/avatar.png"
        :size="100"
      />
    </div>
    <el-skeleton :rows="4" animated v-if="skeletonFlag"/>
    <div class="info" v-else>
      <div class="info-item" v-if="memberId != ''">
        <strong>学员编号：</strong>
        {{ memberId }}
      </div>
      <div class="info-item" v-if="teamId != ''">
        <strong>竞赛编号：</strong>
        {{ teamId }}
      </div>
      <div class="info-item">
        <strong>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</strong>
        {{ name }}
      </div>
      <div class="btn">
        <el-button size="small" @click="layoutClick">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { getUserInfo } from "@/api/request";
import { store } from "@/store";
export default defineComponent({
  setup() {
    const name = ref("");
    const memberId = ref("");
    const teamId = ref("");
    const skeletonFlag = ref(true)

    const layoutClick = () => {
      store.dispatch("logout");
    };

    onMounted(async () => {
      const data = await getUserInfo();
      if (data != null && (data as any).code === 0) {
        name.value = data.data.name;
        memberId.value = data.data.memberId;
        teamId.value = data.data.teamId;
      }
      skeletonFlag.value = false
    });

    return {
      name,
      memberId,
      teamId,
      layoutClick,
      skeletonFlag
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info-dialog {
  display: flex;
  .info {
    .info-item {
      margin-bottom: 20px;
      margin-left: 40px;
      font-size: 16px;
    }
  }
  .btn {
    .el-button {
      margin-left: 72px;
    }
  }
}
</style>