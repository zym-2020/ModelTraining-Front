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
        {{ account }}
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
import { computed, defineComponent } from "vue";
import { store } from "@/store";
export default defineComponent({
  setup() {
    const name = computed(() => {
      return store.state.user.name;
    });
    const account = computed(() => {
      return store.state.user.teamId;
    });

    const layoutClick = () => {
      store.dispatch("logout")
    };

    return {
      name,
      account,
      layoutClick
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