<template>
  <div class="apply-main">
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="body">
          <div class="left">
            <div class="title">模型应用竞赛</div>
            <el-menu default-active="1" @select="selectHandle">
              <el-menu-item index="1">
                <el-icon>
                  <Menu />
                </el-icon>
                <span>提交文档</span>
              </el-menu-item>
              <el-sub-menu index="2" @click="active = 'document'">
                <template #title>
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>文档</span>
                </template>
                <el-menu-item index="2-1" @click="goAnchor('#anchor-1')">实验描述</el-menu-item>
                <el-menu-item index="2-2" @click="goAnchor('#anchor-2')">实验方法</el-menu-item>
                <el-menu-item index="2-3" @click="goAnchor('#anchor-3')">实验结果</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="3">
                <el-icon>
                  <setting />
                </el-icon>
                <span>团队详情</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="right">
            <team v-if="active == 'team'" :researcherValue="researcherValue" />
            <apply-home v-if="active == 'commit'" :summaryValue="summaryValue" :researcherValue="researcherValue"
              :descriptionValue="descriptionValue" :methodValue="methodValue" :resultValue="resultValue" />
            <div v-if="active == 'document'">
              <div id="anchor-1">
                <description :descriptionValue="descriptionValue" @rerturnDescription="rerturnDescription" />
              </div>
              <div id="anchor-2">
                <method :methodValue="methodValue" />
              </div>
              <div id="anchor-3">
                <result :resultValue="resultValue" :methodValue="methodValue" @rerturnResult="rerturnResult" />
              </div>
              <div class="btn">
                <el-divider />
                <el-button class="finalButton" type="success" @click="addTabF">
                  生成总览文档
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick } from "vue";
import Team from "@/components/Team.vue";
import ApplyHome from "@/components/ApplyHome.vue";
import Description from "@/components/Description.vue";
import Method from "@/components/Method.vue";
import Result from "@/components/Result.vue";
import router from '@/router'
import { addSummary } from "@/api/request";
import { notice } from "@/utils/notice";
import { getResource } from '@/api/request'
import { reference } from "@popperjs/core";
export default defineComponent({
  components: { Team, ApplyHome, Description, Method, Result },
  setup() {
    const test = ref("")
    const active = ref("commit");
    const descriptionValue = ref<any>((router.currentRoute.value.params.apply as any).description)
    const methodValue = ref<any>((router.currentRoute.value.params.apply as any).method)
    const resultValue = ref<any>((router.currentRoute.value.params.apply as any).result)
    const researcherValue = ref<any>((router.currentRoute.value.params.apply as any).researcher)
    const summaryValue = ref<any>((router.currentRoute.value.params.apply as any).summary)
    const descriptionTemp = reactive({
      background: {
        text: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        },
        references: []
      },
      purpose: {
        text: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        },
      },
      scheme: {
        purpose: '',
        target: '',
        method: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        },
        time: {
          resolution: '',
          scale: '',
          scope: '',
          length: '',
          unit: ''
        },
        space: {
          resolution: '',
          scale: '',
          scope: '',
          dimension: '',
          unit: ''
        }
      },

    })
    const resultTemp = reactive({
      resultValidation: {
        name: '',
        description: '',
        stepType: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        },
        dataResource: '',
        resultOutput: {
          name: '',
          description: '',
          time: '',
          storage: '',
          format: '',
          isUpload:'',
        },
        softName: '',
        softVersion: '',
        softStorage: '',
        softDepend: '',
        codeContent: '',
        codeLanguage: '',
        codeDepend: '',
      },
      resultVisualization: {
        name: '',
        description: '',
        stepType: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        },
        dataResource: '',
        resultOutput: {
          name: '',
          description: '',
          time: '',
          storage: '',
          format: '',
          isUpload:'',
        },
        softName: '',
        softVersion: '',
        softStorage: '',
        softDepend: '',
        codeContent: '',
        codeLanguage: '',
        codeDepend: '',
      },
      conclusion: {
        text: '',
        paper: '',
        pictures: [],
        video: {
          id: '',
          name: ''
        }
      }
    })
    const methodTemp = reactive({
      resource: {
        modelResources: [],
        dataResources: [],
        computeResources: []
      },
      processes: []
    })
    const addTabF = async () => {
      resultTemp.resultValidation = resultValue.value.resultValidation
      resultTemp.resultVisualization = resultValue.value.resultVisualization
      resultTemp.conclusion = resultValue.value.conclusion
      descriptionTemp.background = descriptionValue.value.background
      descriptionTemp.purpose = descriptionValue.value.purpose
      descriptionTemp.scheme = descriptionValue.value.scheme
      methodTemp.resource.modelResources = methodValue.value.resource.modelResources
      methodTemp.resource.dataResources = methodValue.value.resource.dataResources
      methodTemp.resource.computeResources = methodValue.value.resource.computeResources
      methodTemp.processes = methodValue.value.processes
      const summaryItem = {
        description: descriptionTemp,
        method: methodTemp,
        result: resultTemp,
        researcher: researcherValue.value,
      }

      if (summaryItem.description.background.text == '') {
        notice("warning", "失败", "1.1 实验背景不能为空")
        return
      }
      if (summaryItem.description.purpose.text == '') {
        notice("warning", "失败", "1.2 实验问题不能为空")
        return
      }
      if (summaryItem.description.scheme.purpose == '') {
        notice("warning", "失败", "1.3 研究目的不能为空")
        return
      }
      if (summaryItem.description.scheme.target == '') {
        notice("warning", "失败", "1.3 研究对象不能为空")
        return
      }

      if (summaryItem.description.scheme.time.resolution == '') {
        notice("warning", "失败", "1.3 时间尺度的分辨率不能为空")
        return
      }

      if (summaryItem.description.scheme.time.scale == '') {
        notice("warning", "失败", "1.3 时间尺度的尺度不能为空")
        return
      }

      if (summaryItem.description.scheme.time.scope == '') {
        notice("warning", "失败", "1.3 时间尺度的范围不能为空")
        return
      }
      if (summaryItem.description.scheme.space.resolution == '') {
        notice("warning", "失败", "1.3 空间尺度的分辨率不能为空")
        return
      }
      if (summaryItem.description.scheme.space.scale == '') {
        notice("warning", "失败", "1.3 空间尺度的尺度不能为空")
        return
      }
      if (summaryItem.description.scheme.space.scope == '') {
        notice("warning", "失败", "1.3 空间尺度的范围不能为空")
        return
      }
      if (summaryItem.description.scheme.space.dimension == '') {
        notice("warning", "失败", "1.3 空间尺度的维度不能为空")
        return
      }

      if (summaryItem.description.scheme.method == '') {
        notice("warning", "失败", "1.3 研究方法不能为空")
        return
      }
      if (summaryItem.method.resource.modelResources.length == 0) {
        notice("warning", "失败", "2.1 模型资源不能为空")
        return
      }
      if (summaryItem.method.resource.dataResources.length == 0) {
        notice("warning", "失败", "2.1 数据资源不能为空")
        return
      }
      if (summaryItem.method.resource.computeResources.length == 0) {
        notice("warning", "失败", "2.1 计算资源不能为空")
        return
      }
      if (summaryItem.method.processes.length == 0) {
        notice("warning", "失败", "2.2 实验步骤不能为空")
        return
      }
      if (summaryItem.result.conclusion.text == '') {
        notice("warning", "失败", "3.3 结果分析及结论不能为空")
        return
      }
      if (summaryItem.researcher.persons.length == 0) {
        notice("warning", "失败", "团队详情中的研究人员不能为空")
        return
      }
      const data = await addSummary(
        (router.currentRoute.value.params.apply as any).id,
        summaryItem
      );
      if (data != null && (data as any).code === 0) {
        summaryValue.value.push(summaryItem)
        notice("success", "成功", "生成成功！");
      }
    }
    const selectHandle = (index: string) => {
      if (index === "3") {
        active.value = "team";
      } else if (index === "1") {
        active.value = "commit";
      } else if (index === "2") {
        active.value = "document";
      }
    };


    const goAnchor = async(selector: any) => {
        if(active.value==="document"){
          var anchor = document.querySelector(selector)
          document.documentElement.scrollTop = anchor.offsetTop
        }
        else{
          active.value="document"
          await nextTick()
          goAnchor(selector)
        }

    }
    const rerturnDescription = (val: any) => {
      descriptionValue.value = val
    }
    const rerturnResult = (val: any) => {
      resultValue.value = val
    }

    onMounted(() => {

    })


    return {
      test,
      active,
      selectHandle,
      descriptionValue,
      methodValue,
      resultValue,
      rerturnDescription,
      rerturnResult,
      researcherValue,
      summaryValue,
      goAnchor,
      addTabF,
      resultTemp,
      descriptionTemp,
      methodTemp
    };
  },
});
</script>

<style lang="scss" scoped>
.apply-main {
  margin-top: 20px;

  .body {
    display: flex;

    .left {
      position: fixed;
      border-radius: 6px;
      min-width: 200px;
      height: 420px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.35);

      .title {
        height: 40px;
        text-align: center;
        background: #eaeaea;
        line-height: 40px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
    }

    .right {
      margin-left: 200px;
      width: calc(100% - 300px);
    }
    .finalButton{
      margin-left: -75px;
    }

    .team,
    .description,
    .method,
    .result,
    .apply-home {
      // width: calc(100%-500px);
    }
  }
}

.btn {
  text-align: center;
  margin: 40px 0;
}
</style>