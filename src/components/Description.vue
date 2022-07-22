<template>
  <div class="description">
    <div class="title">
      <h2>实验描述</h2>
    </div>
    <el-divider />
    <div class="background">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究背景</h4>
      </div>
      <div class="body">
        <el-form class="input" :model="backgroundForm" :rules="rules">
          <el-form-item prop="backgroundValue">
            <el-input v-model="backgroundForm.backgroundValue" :rows="3" type="textarea" placeholder="研究背景"/>
          </el-form-item>
        </el-form>
        <div class="mflex">
        <picture-upload :pictureList="backgroundPictureList" @returnPictureList="returnBackgroundPictures">
        </picture-upload>
        <div class="tips">
        <h5>说明：需要详细说明该研究/实验的背景</h5>
        <h5>形式：文本、图片、视频</h5>
        </div>
        </div>
      </div>
    </div>
    <div class="purpose">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究目的</h4>
      </div>
      <div class="body">
        <el-form class="input" :model="purposeForm" :rules="rules">
          <el-form-item prop="purposeValue">
            <el-input v-model="purposeForm.purposeValue" :rows="3" type="textarea" placeholder="研究目的" />
          </el-form-item>
        </el-form>
        <div class="mflex">
        <picture-upload :pictureList="purposePictureList" @returnPictureList="returnPurposePictures"></picture-upload>
        <div class="tips">
        <h5>说明：需要详细说明该研究/实验的目的</h5>
        <h5>形式：文本、图片、视频</h5>
        </div>
        </div>
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
          <el-form :rules="rules" label-position="right" label-width="80px" :model="schemeForm">
            <el-form-item label="研究对象" prop="target">
              <el-input v-model="schemeForm.target" />
            </el-form-item>
            <el-form-item label="研究地点" prop="location">
              <el-input v-model="schemeForm.location" />
            </el-form-item>
            <el-form-item label="研究时间" prop="time">
              <el-input v-model="schemeForm.time" />
            </el-form-item>
            <el-form-item label="研究人物" prop="person">
              <el-input v-model="schemeForm.person" />
            </el-form-item>
            <el-form-item label="研究方法" prop="method">
              <el-input v-model="schemeForm.method" type="textarea" :rows="3" />
            </el-form-item>
          </el-form>
        <div class="mflex">
          <picture-upload :pictureList="schemePictureList" @returnPictureList="returnSchemePictures"></picture-upload>
          <div class="tips">
          <h5>说明：需要详细说明具体的研究方案/实验设计，建议从研究对象、研究时空维度、研究人员、研究方法五个方面说明。研究对象指该研究/实验的研究主题；研究时空维度指该研究/实验的所在区域的时间尺度、空间维度、研究步长、时空单位；研究人员指该研究/实验的执行人员；研究方法指该研究/实验涉及的方法、总体的流程图</h5>
          <h5>形式：文本、流程图</h5>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin: 40px 0">
      <el-button type="primary" plain @click="save">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import PictureUpload from "./PictureUpload.vue";
import { saveDescription } from "@/api/request";
import router from "@/router";
import { notice } from "@/utils/notice";
import type { FormRules } from 'element-plus'
export default defineComponent({
  props: {
    descriptionValue: {
      type: Object,
    },
  },
  components: { PictureUpload },
  setup(props) {
    const backgroundForm = reactive({
      backgroundValue: (props.descriptionValue as any).background.text
    })

    const purposeForm = reactive({
      purposeValue:(props.descriptionValue as any).purpose.text
    })

    const schemeForm = reactive({
      target: (props.descriptionValue as any).scheme.target,
      location: (props.descriptionValue as any).scheme.location,
      time: (props.descriptionValue as any).scheme.time,
      person: (props.descriptionValue as any).scheme.person,
      method: (props.descriptionValue as any).scheme.method,
    });

    const backgroundPictureList = ref(
      (props.descriptionValue as any).background.pictures
    );
    const purposePictureList = ref(
      (props.descriptionValue as any).purpose.pictures
    );
    const schemePictureList = ref(
      (props.descriptionValue as any).scheme.pictures
    );
    const rules = reactive<FormRules>({
      backgroundValue: [{
        required: true,
        message: '请输入研究背景',
        trigger: 'blur'
      }],
      purposeValue: [{
        required: true,
        message: '请输入研究目的',
        trigger: 'change'
      }],
      target: [{
        required: true,
        message: '请输入研究对象',
        trigger: 'change'
      }],
      method: [{
        required: true,
        message: '请输入研究方法',
        trigger: 'change'
      }]

    })

    const returnBackgroundPictures = (val: any[]) => {
      backgroundPictureList.value = [];
      val.forEach((item) => {
        backgroundPictureList.value.push(item.name);
      });
      console.log(backgroundPictureList.value);
    };

    const returnPurposePictures = (val: any[]) => {
      purposePictureList.value = [];
      val.forEach((item) => {
        purposePictureList.value.push(item.name);
      });
    };

    const returnSchemePictures = (val: any[]) => {
      schemePictureList.value = [];
      val.forEach((item) => {
        schemePictureList.value.push(item.name);
      });
    };

    const save = async () => {
      if (backgroundForm.backgroundValue == '') {
        notice("warning", "失败", "研究背景不能为空")
        return
      }
      else if (purposeForm.purposeValue.value == '') {
        notice("warning", "失败", "研究目的不能为空")
        return
      }
      else if (schemeForm.target == '') {
        notice("warning", "失败", "研究对象不能为空")
        return
      }
      else if (schemeForm.method == '') {
        notice("warning", "失败", "研究方法不能为空")
        return
      }

      const background = {
        text: backgroundForm.backgroundValue,
        pictures: backgroundPictureList.value,
        videos: []
      }
      const purpose = {
        text: purposeForm.purposeValue,
        pictures: purposePictureList.value,
        videos: []
      }
      const scheme = {
        target: schemeForm.target,
        location: schemeForm.location,
        time: schemeForm.time,
        person: schemeForm.person,
        method: schemeForm.method,
        pictures: schemePictureList.value,
        videos: []
      }
      const description = {
        background,
        purpose,
        scheme
      }
      const data = await saveDescription((router.currentRoute.value.params.apply as any).id, description)
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功")
      }
    }

    return {
      backgroundForm,
      purposeForm,
      schemeForm,
      backgroundPictureList,
      purposePictureList,
      schemePictureList,
      returnBackgroundPictures,
      returnPurposePictures,
      returnSchemePictures,
      rules,
      save
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

  .background,
  .purpose,
  .scheme {
    margin-bottom: 40px;
  }
}
.mflex{
  display: flex;
  align-items: flex-start
}
.tips{
  margin-left: 30px;
  color: rgb(150, 150, 150);
}
</style>