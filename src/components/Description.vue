<template>
  <div class="description">
    <div class="title">
      <h2>1 实验介绍</h2>
    </div>
    <el-divider />
    <div class="background">
      <div class="small-title">
        <div class="icon"></div>
        <h4>1.1 实验背景</h4>
      </div>
      <div class="body">
        <el-form class="input" :model="backgroundForm" :rules="rules" @submit.native.prevent>
          <el-form-item prop="backgroundValue">
            <el-input v-model="backgroundForm.backgroundValue" :rows="3" type="textarea" placeholder="说明：需要详细说明该研究/实验的研究背景：包括理论背景和现实需求，所选课题/实验现有研究情况，阐述这项课题研究的具体原因/研究的意义。形式：文本、图片、视频"/>
          </el-form-item>
          <div class="left-item">
            <p class="left-text value">示例：降水是一种常见的天气现象，是大气中达到饱和状态的水汽冷凝后降落到地表的过程。降水是全球水循环中的一个基本环节，也是地表淡水的一个重要来源，与人们的生产活动和日常生活休戚相关。一方面，降水在气候的调节、农作物的 灌溉以及净化空气等方面有利于人们的生产和生活；另一方面，降水具有非连续 性以及时空分布不均的特点，降水异常引起的洪水、雪灾、干旱等灾害性天气对 人们的生活影响巨大，给社会的经济发展、人类的生产活动以及人民的日常生活 造成了巨大的损失（黄荣辉，2004）。因此，降水的特征及其变化一直受到来自 专家学者、政府以及广大人民的广泛关注。</p>
          </div>
          <el-form-item label="参考文献" prop="references">
            <el-tag 
              v-for="tag in backgroundForm.references"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{tag.length>75?tag.substring(0,65)+'......'+tag.substring(tag.length-30,tag.length):tag}}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
              + 添加参考文献
            </el-button>
            </el-form-item>
          <h5 style="color:rgb(150,150,150);">建议格式:[1]岳天祥,刘纪远.生态地理建模中的多尺度问题[J].第四纪研究,2003(03):256-261.</h5>
        </el-form>
        <div style="display:flex;align-items:flex-start;">
        <picture-upload :pictureList="backgroundPictureList" @returnPictureList="returnBackgroundPictures">
        </picture-upload>
        <div style="display: flex;align-items:flex-end;">
        <el-button style="margin-left:50px;margin-right: 10px;" type="primary" @click="uploadBackgroundVideo=true">视频上传</el-button>
        <div v-if=" backgroundVideoItem && backgroundVideoItem.id!=''">已上传文件：<el-tag>{{backgroundVideoItem.name}}</el-tag></div>
        </div>
        </div>
      </div>
    </div>
    <div class="purpose">
      <div class="small-title">
        <div class="icon"></div>
        <h4>1.2 实验问题</h4>
      </div>
      <div class="body">
        <el-form class="input" :model="purposeForm" :rules="rules">
          <el-form-item prop="purposeValue">
            <el-input v-model="purposeForm.purposeValue" :rows="3" type="textarea" placeholder="说明：需要详细说明该研究/实验的需要解决的问题，包含两个方面，现有研究的不足之处以及需要解决的问题。形式：文本、图片、视频" />
          </el-form-item>
        </el-form>
        <div class="left-item">
            <p class="left-text value">示例：如何从空间分布模式和机理探究的角度改进已有分析方法、深入挖掘中国夏季降水日变化的空间分布特征？</p>
          </div>
          <div style="display:flex;align-items:flex-start;">
        <picture-upload :pictureList="purposePictureList" @returnPictureList="returnPurposePictures"></picture-upload>
        <div style="display: flex;align-items:flex-end;">
        <el-button style="margin-left: 50px;margin-right: 10px;" type="primary" @click="uploadPurposeVideo=true">视频上传</el-button>
        <div v-if="purposeVideoItem && purposeVideoItem.id!=''">已上传文件：<el-tag>{{purposeVideoItem.name}}</el-tag></div>
        </div>
        </div>
      </div>
    </div>
    <div class="scheme">
      <div class="small-title">
        <div class="icon"></div>
        <h4>1.3 问题分析及设计</h4>
      </div>
      <div class="body">
        <div class="right">
          <el-form :rules="rules" label-position="right" label-width="80px" :model="schemeForm">
          <el-form-item label="研究对象" prop="target">
            <el-input v-model="schemeForm.target" placeholder="研究/实验的研究主题"/>
          </el-form-item>
          <div class="left-item">
            <p class="left-text value">示例：中国降水日变化</p>
          </div>
            <el-form-item label="研究目标"  prop="purpose">
              <el-input v-model="schemeForm.purpose" type="textarea" :rows="3" placeholder="详细说明该研究/实验的目的或目标"/>
            </el-form-item>
          <div class="left-item">
            <p class="left-text value">示例：针对当前降水日变化研究中区域确定主观性强、所提取降水日变化特征准确性差等问题，采用“自下而上”的数据挖掘方法，并基于不同历时的降水事件，从连续分布的栅格降水数据中，深入挖掘中国夏季降水日变化的空间分布特征，进一步对降水量日变化的控制因子进行分析，深化对降水日变化特征的认识，为日后更深入的机理研究提供参考依据。</p>
          </div>
            <h5 class="mflex"><el-icon><CaretBottom /></el-icon>研究时间维度:<div style="color:rgb(150,150,150);margin-left:10px;font-weight: 500;">研究/实验的所在区域的时间尺度、研究步长、单位等；（分辨率，尺度，范围，步长，单位）</div></h5>
            <ul class="mul">
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>分辨率</p><el-input class="liinput" v-model="schemeForm.time.resolution"  placeholder="1h"/>
                </div> 
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>尺度</p><el-input class="liinput" autosize type="textarea" v-model="schemeForm.time.scale" placeholder="1. 百万年以上；2. 百万年尺度；3. 万年尺度；4. 千年尺度；5. 百年尺度；6. 10 年尺度；7. 年；8. 月；9. 日；10. 日以下；11. 基于事件（次，如降水）"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>范围</p><el-input class="liinput" v-model="schemeForm.time.scope" placeholder="2008-2016年9年间的6月-7月"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp">步长</p><el-input class="liinput" v-model="schemeForm.time.length" placeholder="1天"/>
                </div>
              </li>
            </ul>
            <h5 class="mflex"><el-icon><CaretBottom /></el-icon>研究空间维度:<div style="color:rgb(150,150,150);margin-left:10px;font-weight: 500;">研究/实验的所在区域的空间维度、研究步长、单位等；（分辨率，尺度，范围，维度，单位）</div></h5>
            <ul class="mul"> 
              <li >
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>分辨率</p><el-input v-model="schemeForm.space.resolution"  placeholder="1°*1°"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>尺度</p><el-input class="liinput" v-model="schemeForm.space.scale" placeholder="1. 全球尺度；2. 洲际尺度；3. 区域尺度；4. 流域尺度；5. 基本单元（地块尺度）"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>范围</p><el-input class="liinput" v-model="schemeForm.space.scope" placeholder="2008-经度范围是 70°~140°E，纬度范围是 15°~59°N"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>维度</p><el-input class="liinput" v-model="schemeForm.space.dimension" placeholder="1D"/>
                </div>
              </li>
              <li>
                <div class="mflex1">
                  <p class="mp"><div class="necess">*</div>参考系</p><el-input class="liinput" v-model="schemeForm.space.unit" placeholder="参考系"/>
                </div>
              </li>
            </ul>
            <el-form-item label="研究方法" prop="method">
              <el-input v-model="schemeForm.method" type="textarea" :rows="3" placeholder="研究/实验涉及的方法、总体的流程图"/>
            </el-form-item>
          </el-form>
            <div class="left-item">
              <p class="left-text value">示例：在降水事件提取和分类的基础上，使用聚类方法挖掘中国夏季降水量日变化的空间分布特征；在此基础上，分析不同历时降水事件的降水日变化特征及其与总降水量日变化的关系，揭示其区域性差异；最后，度量降水量日变化受频次和雨强日变化的控制程度，为进一步的机理研究提供参考依据，为其他区域的降水日变化研究提供方法借鉴。</p>
            </div>
        <div style="display:flex;align-items:flex-start;">
        <picture-upload :pictureList="schemePictureList" @returnPictureList="returnSchemePictures"></picture-upload>
        <div style="display: flex;align-items:flex-end;">
        <el-button style="margin-left: 50px;margin-right: 10px;" type="primary" @click="uploadSchemeVideo=true">视频上传</el-button>
        <div v-if="schemeVideoItem && schemeVideoItem.id!=''">已上传文件：<el-tag>{{schemeVideoItem.name}}</el-tag></div>
        </div>
        </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin: 40px 0">
      <el-button type="primary" plain @click="save">保存实验介绍内容</el-button>
    </div>
  </div>
    <el-dialog v-if="uploadBackgroundVideo" v-model="uploadBackgroundVideo">
        <background-video-upload :videoItem="backgroundVideoItem" @returnVideo="returnBackgroundVideo"></background-video-upload>
    </el-dialog>
    <el-dialog v-if="uploadPurposeVideo" v-model="uploadPurposeVideo">
        <purpose-video-upload :videoItem="purposeVideoItem" @returnVideo="returnPurposeVideo"></purpose-video-upload>
    </el-dialog>
    <el-dialog v-if="uploadSchemeVideo" v-model="uploadSchemeVideo">
        <scheme-video-upload :videoItem="schemeVideoItem" @returnVideo="returnSchemeVideo"></scheme-video-upload>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import PictureUpload from "./PictureUpload.vue";
import BackgroundVideoUpload from "./BackgroundVideoUpload.vue";
import PurposeVideoUpload from "./PurposeVideoUpload.vue";
import SchemeVideoUpload from "./SchemeVideoUpload.vue";
import { saveDescription } from "@/api/request";
import router from "@/router";
import { Plus } from "@element-plus/icons-vue";
import { notice } from "@/utils/notice";
import Upload from "@/components/homeworkUpload copy.vue";
import type { FormRules, ElInput } from 'element-plus'
import { emit } from "process";
export default defineComponent({
  props: {
    descriptionValue: {
      type: Object,
    },
  },
  emits: ['rerturnDescription'],
  components: { PictureUpload,SchemeVideoUpload,PurposeVideoUpload,BackgroundVideoUpload },
  setup(props, context) {
    const inputVisible = ref(false)
    const inputValue = ref('')
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const uploadBackgroundVideo = ref(false)
    const uploadPurposeVideo = ref(false)
    const uploadSchemeVideo = ref(false)


    const backgroundForm = reactive({
      backgroundValue: (props.descriptionValue as any).background.text,
      references:[] as any[]
    })

    const purposeForm = reactive({
      purposeValue:(props.descriptionValue as any).purpose.text
    })

    const schemeForm = reactive({
      purpose: (props.descriptionValue as any).scheme.purpose,
      target: (props.descriptionValue as any).scheme.target,
      time:(props.descriptionValue as any).scheme.time,
      space:(props.descriptionValue as any).scheme.space,
      method: (props.descriptionValue as any).scheme.method,
    });

    const backgroundPictureList = ref(
      (props.descriptionValue as any).background.pictures
    );
    const backgroundVideoItem = ref(
      (props.descriptionValue as any).background.video
    );
    const purposePictureList = ref(
      (props.descriptionValue as any).purpose.pictures
    );
    const purposeVideoItem = ref(
      (props.descriptionValue as any).purpose.video
    );
    const schemePictureList = ref(
      (props.descriptionValue as any).scheme.pictures
    );
    const schemeVideoItem = ref(
      (props.descriptionValue as any).scheme.video
    );
    const handleClose = (tag: string) => {
      backgroundForm.references.splice(backgroundForm.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        backgroundForm.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    const rules = reactive<FormRules>({
      backgroundValue: [{
        required: true,
        message: '请输入实验背景',
        trigger: 'blur'
      }],
      purposeValue: [{
        required: true,
        message: '请输入实验问题',
        trigger: 'change'
      }],
      purpose: [{
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
    };
    const returnBackgroundVideo = (val: any[]) => {
      backgroundVideoItem.value = val
    };

    const returnPurposePictures = (val: any[]) => {
      purposePictureList.value = [];
      val.forEach((item) => {
        purposePictureList.value.push(item.name);
      });
    };
    const returnPurposeVideo = (val: any[]) => {
      purposeVideoItem.value = val
    };
    const returnSchemePictures = (val: any[]) => {
      schemePictureList.value = [];
      val.forEach((item) => {
        schemePictureList.value.push(item.name);
      });
    };
    const returnSchemeVideo = (val: any[]) => {
      schemeVideoItem.value = val
    };
    const save = async () => {
      if (backgroundForm.backgroundValue == '') {
        notice("warning", "失败", "实验背景不能为空")
        return
      }
      if (purposeForm.purposeValue.value == '') {
        notice("warning", "失败", "实验问题不能为空")
        return
      }
      if (schemeForm.purpose == '') {
        notice("warning", "失败", "研究目的不能为空")
        return
      }
      if (schemeForm.target == '') {
        notice("warning", "失败", "研究对象不能为空")
        return
      }
      if (schemeForm.time.resolution == '') {
        notice("warning", "失败", "时间尺度的分辨率不能为空")
        return
      }
      if (schemeForm.time.scale == '') {
        notice("warning", "失败", "时间尺度的尺度不能为空")
        return
      }
      if (schemeForm.time.scope == '') {
        notice("warning", "失败", "时间尺度的范围不能为空")
        return
      }
      if (schemeForm.space.resolution == '') {
        notice("warning", "失败", "空间尺度的分辨率不能为空")
        return
      }
      if (schemeForm.space.scale == '') {
        notice("warning", "失败", "空间尺度的尺度不能为空")
        return
      }
      if (schemeForm.space.scope == '') {
        notice("warning", "失败", "空间尺度的范围不能为空")
        return
      }
      if (schemeForm.space.dimension == '') {
        notice("warning", "失败", "空间尺度的维度不能为空")
        return
      }
      if (schemeForm.method == '') {
        notice("warning", "失败", "研究方法不能为空")
        return
      }
      const background = {
        text: backgroundForm.backgroundValue,
        pictures: backgroundPictureList.value,
        video: backgroundVideoItem.value,
        references:backgroundForm.references
      }
      const purpose = {
        text: purposeForm.purposeValue,
        pictures: purposePictureList.value,
        video: purposeVideoItem.value,
      }
      const scheme = {
        purpose: schemeForm.purpose,
        target: schemeForm.target,
        time:schemeForm.time,
        space:schemeForm.space,
        method: schemeForm.method,
        pictures: schemePictureList.value,
        video: schemeVideoItem.value,
      }
      const description = {
        background,
        purpose,
        scheme
      }
      const data = await saveDescription((router.currentRoute.value.params.apply as any).id, description)
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功")
        context.emit('rerturnDescription', description)
      }
    }
    onMounted(() => {
        if((props.descriptionValue as any).background.references!="{}")
          backgroundForm.references=(props.descriptionValue as any).background.references
    })
    return {
      backgroundForm,
      purposeForm,
      schemeForm,
      backgroundPictureList,
      backgroundVideoItem,
      purposePictureList,
      purposeVideoItem,
      schemePictureList,
      schemeVideoItem,
      returnBackgroundPictures,
      returnBackgroundVideo,
      returnPurposePictures,
      returnPurposeVideo,
      returnSchemePictures,
      returnSchemeVideo,
      rules,
      save,
      Plus,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      uploadBackgroundVideo,
      uploadPurposeVideo,
      uploadSchemeVideo,
    };
  },
});
</script>

<style lang="scss" scoped>
.verText{
  text-align: center;
  margin-top: 20px;
  margin-right: 0px;
  writing-mode: vertical-rl ;
  color: rgb(150, 150, 150);
}
.vdivider{
  height: 100px;
}
.rtext{
  text-align:left;
  margin-top: 0px;
  margin-bottom: 10px;
  color: rgb(150, 150, 150);
}

.rdivider{
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.left-item {
.left-text {
  font-style:oblique;
  color: rgb(160, 160, 160);
  font-size: smaller;
}
}
.description {
  width: 1000px;
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
      .left-text {
            font-size: small;
          }
        .left-item {
          display: flex;
          color: rgb(130, 130, 130);
          .left-text {
            line-height: 20px;
            font-size: small;
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
  align-items: flex-start;
  }
.necess{
  color:lightcoral;
  margin-right: 5px;
}
.mul{
  margin-left: 50px;
}
.mflex1{
  display: flex;
  align-items: center;
  
  .mp{
      display: flex;
    color: rgb(90, 90, 90);
    font-size: small;
    width: 60px;
  }
}
.mx-1{
  margin-right: 10px;
}
.tips{
  margin-left: 30px;
  color: rgb(150, 150, 150);
}
</style>