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
          <div style="margin-top: 10px">
            <img src="/example/2.png" alt="" />
          </div>
        </div>
        <div class="result-value">
          <result-form
            :resultFormValue="resultFormValue"
            @returnResultFormValue="returnResultFormValue"
          ></result-form>
        </div>
      </div>
    </div>
    <div class="result-validation">
      <div class="small-title">
        <div class="icon"></div>
        <h4>结果验证</h4>
      </div>
      <!-- <div class="example">
        <div class="example-text"><strong>示例：</strong></div>
        <el-timeline>
          <el-timeline-item center timestamp="步骤1" placement="top">
            <process-card :stepInfo="step1"></process-card>
          </el-timeline-item>
        </el-timeline>
      </div> -->

      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in processList"
          :key="index"
          center
          :timestamp="'步骤' + (index + 1)"
          placement="top"
        >
          <process-card :stepInfo="item" class="card">
            <template #button>
              <div class="button">
                <el-button
                  type="primary"
                  :icon="Edit"
                  circle
                  @click="editClick(index)"
                />
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  @click="deleteClick(index)"
                />
              </div>
            </template>
          </process-card>
        </el-timeline-item>
        <el-timeline-item timestamp="添加步骤" placement="top">
          <div class="add" @click="addProcessClick">
            <el-icon size="20px"><Plus /></el-icon>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="saveClick">保存</el-button>
    </div>
  </div>
  <el-dialog v-model="addFlag" width="600px" title="添加步骤">
    <add-process
      @returnProcess="returnProcess"
      @updateProcess="updateProcess"
      :operateType="operateType"
      :processItem="processItem"
      :processType="processType"
      :Modeltemp="Modeltemp" 
      :Datatemp="Datatemp"
    ></add-process>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ResultForm from "./ResultForm.vue";
import ProcessCard from "./ProcessCard.vue";
import AddProcess from "./AddProcess.vue";
import router from "@/router";
import { step1 } from "@/utils/ExampleData";
import { saveResult } from "@/api/request";
import { notice } from "@/utils/notice";
import { Delete, Edit } from "@element-plus/icons-vue";
export default defineComponent({
  components: { ResultForm, ProcessCard, AddProcess },
  props: {
    resultValue: {
      type: Object,
    },
    methodValue: {
      type: Object,
    },
  },
  setup(props) {
    const addFlag = ref(false);
    const processItem = ref<any>();
    const operateType = ref("add");
    const updateIndex = ref(-1);
    const resultFormValue = ref((props.resultValue as any).resultOutput);
    const processType = ref("result")
    const modelList = ref<any[]>((props.methodValue as any).resource.modelResources);
    const dataList = ref<any[]>((props.methodValue as any).resource.dataResources);
    let Modeltemp = ref<any[]>(JSON.parse(JSON.stringify(modelList.value)))
    let Datatemp = ref<any[]>(JSON.parse(JSON.stringify(dataList.value)))
    const processList = ref<any[]>(
      (props.resultValue as any).resultValidations
    );

    const returnResultFormValue = (val: any) => {
      resultFormValue.value = val;
    };

    const returnProcess = (val: any) => {
      processList.value.push(JSON.parse(JSON.stringify(val)));
      addFlag.value = false;
    };

    const saveClick = async () => {
      if(!resultFormValue.value.name){
        notice("warning", "失败", "“结果名称”不能为空")
        return
      }
      if(!resultFormValue.value.description){
        notice("warning", "失败", "“结果描述”不能为空")
        return
      }
      if(!resultFormValue.value.format){
        notice("warning", "失败", "“结果格式”不能为空")
        return
      }
      if(!resultFormValue.value.time){
        notice("warning", "失败", "“生产时间”不能为空")
        return
      }
      const result = {
        resultValidations: processList.value,
        resultOutput: resultFormValue.value,
      };
      const data = await saveResult(
        (router.currentRoute.value.params.apply as any).id,
        result
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功");
      }
    };

    const addProcessClick = () => {
      processItem.value = {
        name: "",
        stepType: "",
        operateType: "",
        description: "",
        references: [] ,
        other: "",
        pictures: [],
        modelResources: [],
        dataResources: [],
      };
      operateType.value = "add";
      addFlag.value = true;
    };

    const editClick = (index: number) => {
      processItem.value = processList.value[index];
      operateType.value = "update";
      updateIndex.value = index;
      addFlag.value = true;
    };

    const deleteClick = (index: number) => {
      processList.value.splice(index, 1);
    };

    const updateProcess = (val: any) => {
      processList.value[updateIndex.value] = JSON.parse(JSON.stringify(val));
      addFlag.value = false;
    };

    return {
      addFlag,
      resultFormValue,
      returnResultFormValue,
      step1,
      processList,
      returnProcess,
      saveClick,
      deleteClick,
      editClick,
      addProcessClick,
      updateProcess,
      processItem,
      operateType,
      processType,
      Modeltemp,
      Datatemp,
      Delete,
      Edit,
    };
  },
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
  }
  .btn {
    text-align: center;
    margin: 40px 0;
  }
}
.card {
  position: relative;

  .button {
    position: absolute;
    z-index: 99;
    top: 20px;
    right: 40px;
  }
}

</style>