<template>
  <div class="result">
    <div class="title"><h2>实验结果</h2></div>
    <el-divider />
    <div class="resultDes">
      <div class="small-title">
        <div class="icon"></div>
        <h4>结果输出</h4>
      </div>
      <div class="body">
        <div class="example">
          <div><strong>示例：</strong></div>
          <div class="example-item">
            <div class="example-item-title">结果名称：</div>
            <div class="example-item-value">空间分布特征分析</div>
          </div>
          <div class="example-item">
            <div class="example-item-title">结果描述：</div>
            <div class="example-item-value">
              基于上述Step2的到的空间分布图，对中国降水日变化的空间分布特征进行描述和分析，对不同区域的降水日变化特征的影响因子进行探究，对不同历时降水事件的降水日变化特征进行对比分析，探究它们之间的差异和联系。
            </div>
          </div>
          <div class="example-item">
            <div class="example-item-title">结果位置：</div>
            <div class="example-item-value">xxxxxx</div>
          </div>
          <div class="example-item">
            <div class="example-item-title">结果格式：</div>
            <div class="example-item-value">png格式</div>
          </div>
          <div class="example-item">
            <div class="example-item-title">结果版本：</div>
            <div class="example-item-value">V1</div>
          </div>
          <div class="example-item">
            <div class="example-item-title">生成时间：</div>
            <div class="example-item-value">2020.01</div>
          </div>
          <div style="margin-top: 10px;">
            <img src="/example/2.png" alt="" />
          </div>
        </div>
        <div class="result-value">
          <result-form></result-form>
          <picture-upload></picture-upload>
        </div>
      </div>
    </div>
    <div class="result-validation">
      <div class="small-title">
        <div class="icon"></div>
        <h4>结果验证</h4>
      </div>
      <el-timeline>
        <el-timeline-item center timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="2018/4/2" placement="top">
          <div class="add">
            <el-icon size="20px"><Plus /></el-icon>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ResultForm from "./ResultForm.vue";
import PictureUpload from "./PictureUpload.vue";
export default defineComponent({
  components: { ResultForm, PictureUpload },
  setup() {},
});
</script>

<style lang="scss" scoped>
.result {
  padding-left: 20px;
  .small-title {
    display: flex;
    .icon {
      height: 20px;
      width: 10px;
      margin-top: 23px;
      margin-right: 5px;
      background: red;
    }
  }
  .body {
    display: flex;
    .example {
      flex: 1;
      padding: 0 15px;
      .example-item {
        display: flex;
        line-height: 30px;
        .example-item-title {
          width: 80px;
        }
        .example-item-value {
          width: calc(100% - 80px);
        }
      }
    }
    .result-value {
      flex: 1;
      padding: 0 15px;
    }
  }
  .result-validation {
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
  }
}
</style>