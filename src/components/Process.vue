<template>
  <div>
    <div class="example">
      <div class="example-text"><strong>示例：</strong></div>
      <el-timeline>
        <el-timeline-item center timestamp="步骤一" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="步骤二" placement="top">
          <process-card></process-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <el-timeline>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <div class="add">
          <el-icon size="20px" ><Plus /></el-icon>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProcessCard from "./ProcessCard.vue";
export default defineComponent({
  components: { ProcessCard },
  setup() {},
});
</script>

<style lang="scss" scoped>
.example {
  margin-bottom: 20px;
  .example-text {
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.add {
  height: 100px;
  width: 100px;
  border: 2px dashed #eaeaea;
  &:hover {
    border-color: lightblue;
    cursor: pointer;
  }
  .el-icon {
    margin-top: 40px;
    margin-left: 40px;
  }
}
</style>