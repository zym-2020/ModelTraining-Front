<template>
  <div class="user-info-dialog">
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="100"
      />
    </div>
    <div class="info">
      <div class="info-item">
        <strong>学员编号：</strong>
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
    const name = ref("")
    const teamId = ref("")

    const layoutClick = () => {
      store.dispatch("logout");
    };

    onMounted(async () => {
      const data = await getUserInfo()
      if(data != null && (data as any).code === 0) {
        name.value = data.data.name 
        teamId.value = data.data.teamId
      }
    })

    return {
      name,
      teamId,
      layoutClick,
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