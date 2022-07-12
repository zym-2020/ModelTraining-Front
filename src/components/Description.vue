<template>
  <div class="description">
    <div class="title"><h2>实验描述</h2></div>
    <el-divider />
    <div class="background">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究背景</h4>
      </div>
      <div class="body">
        <div class="input">
          <el-input
            v-model="backgroundValue"
            :rows="3"
            type="textarea"
            placeholder="研究背景"
            resize="none"
          />
        </div>
        <picture-upload></picture-upload>
      </div>
    </div>
    <div class="purpose">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究目的</h4>
      </div>
      <div class="body">
        <div class="input">
          <el-input
            v-model="purposeValue"
            :rows="3"
            type="textarea"
            placeholder="研究目的"
            resize="none"
          />
        </div>
        <picture-upload></picture-upload>
      </div>
    </div>
    <div class="scheme">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究方案</h4>
      </div>
      <div class="body">
        <div class="left">
          <div><strong>示例：</strong></div>
          <div class="left-item">
            <div class="left-text">研究对象：</div>
            <div class="left-text value">中国降水日变化</div>
          </div>
          <div class="left-item">
            <div class="left-text">研究地点：</div>
            <div class="left-text value">
              经度范围是 70°~140°E，纬度范围是 15°~59°N
            </div>
          </div>
          <div class="left-item">
            <div class="left-text">研究时间：</div>
            <div class="left-text value">
              2008-2016 年 9 年间的夏季（6 月、7 月、8 月）
            </div>
          </div>
          <div class="left-item">
            <div class="left-text">研究人物：</div>
            <div class="left-text value">杨蕾</div>
          </div>
          <div class="left-item">
            <div class="left-text">研究方法：</div>
            <div class="left-text value">
              在降水事件提取和分类的基础上，使用聚类方法挖掘中国夏季降水量日变化的空间分布特征；在此基础上，分析不同历时降水事件的降水日变化特征及其与总降水量日变化的关系，揭示其区域性差异；最后，度量降水量日变化受频次和雨强日变化的控制程度，为进一步的机理研究提供参考依据，为其他区域的降水日变化研究提供方法借鉴。
            </div>
          </div>
          <div>
            <img src="/example/1.png" alt="" />
          </div>
        </div>
        <div class="right">
          <el-form
            label-position="right"
            label-width="80px"
            :model="schemeForm"
          >
            <el-form-item label="研究对象">
              <el-input v-model="schemeForm.target" />
            </el-form-item>
            <el-form-item label="研究地点">
              <el-input v-model="schemeForm.location" />
            </el-form-item>
            <el-form-item label="研究时间">
              <el-input v-model="schemeForm.time" />
            </el-form-item>
            <el-form-item label="研究人物">
              <el-input v-model="schemeForm.person" />
            </el-form-item>
            <el-form-item label="研究方法">
              <el-input
                v-model="schemeForm.methon"
                type="textarea"
                resize="none"
                :rows="3"
              />
            </el-form-item>
          </el-form>
          <picture-upload></picture-upload>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin: 40px 0">
      <el-button type="primary" plain>保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import PictureUpload from "./PictureUpload.vue";
export default defineComponent({
  components: { PictureUpload },
  setup() {
    const backgroundValue = ref("");
    const purposeValue = ref("");
    const schemeValue = ref("");
    const schemeForm = reactive({
      target: "",
      location: "",
      time: "",
      person: "",
      methon: "",
    });
    return {
      backgroundValue,
      purposeValue,
      schemeValue,
      schemeForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.description {
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
    .input {
      margin-bottom: 10px;
    }
  }
  .scheme {
    .body {
      display: flex;
      .left {
        padding: 0 10px;
        flex: 1;
        .left-item {
          display: flex;
          .left-text {
            line-height: 30px;
          }
          .value {
            width: calc(100% - 110px);
          }
        }
      }
      .right {
        padding: 0 10px;
        flex: 1;
        
      }
    }
  }
  .background, .purpose, .scheme {
    margin-bottom: 40px;
  }
}
</style>