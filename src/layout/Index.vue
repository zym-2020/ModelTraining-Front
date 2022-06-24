<template>
  <div class="common-layout">
    <el-container>
      <el-header><my-header/></el-header>
      <el-main><router-view /></el-main>
      <el-footer><foot /></el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Foot from "./components/Foot.vue";
import MyHeader from "./components/Head.vue";
export default defineComponent({
  components: { Foot, MyHeader },
  setup() {},
});
</script>


<style lang="scss" scoped>
.el-container {
  .el-header,
  .el-footer,
  .el-main {
    padding: 0;
  }

  .el-main {
    min-height: calc(100vh - 260px);
  }
  .el-footer {
    height: 200px;
  }
}
</style>