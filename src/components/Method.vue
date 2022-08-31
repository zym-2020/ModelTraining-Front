<template>
  <div class="method">
    <div class="title">
      <h2>2 实验流程</h2><h3>（具体的研究过程）</h3>
    </div>
    <el-divider style="width: 1000px;"/>
    <div class="resource">
      <div class="small-title">
        <div class="icon"></div>
        <h4>2.1 实验资源</h4>
      </div>
      <div class="body">
        <div>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="模型资源" name="1">
              <el-table :data="Modeltemp" style="width: 100%" max-height="250">
                <el-table-column align='center' prop="modelBaseInfo.name" label="模型资源名称" width="220" />
                <el-table-column align='center' label="输入信息" width="220">
                  <template #default="scope">
                    <div v-if="scope.row.modelMetaData != undefined">
                      <el-tag class="mtab" v-for="item in scope.row.modelMetaData.modelInputs">{{ item.name }}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align='center' label="输出信息" width="220">
                   <template #default="scope">
                   <div v-if="scope.row.modelMetaData != undefined">
                      <el-tag class="mtab" v-for="item in scope.row.modelMetaData.modelOutputs">{{item.name}}</el-tag>
                   </div>
                   </template>
                </el-table-column>
                <el-table-column align='center' label="参数信息" width="220">
                   <template #default="scope">
                   <div v-if="scope.row.modelMetaData != undefined">
                      <el-tag class="mtab" v-for="item in scope.row.modelMetaData.parameters">{{item.name}}</el-tag>
                   </div>
                   </template>
                </el-table-column>
                <el-table-column align='center' fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="updateModelClick(scope.$index)">
                      查看
                    </el-button>
                    <el-button link type="primary" size="small" @click="deleteModelClick(scope.$index)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="mt-4" style="width: 100%" @click="addModelClick">添加模型资源</el-button>
              <el-dialog v-if="addModelDialog" v-model="addModelDialog" width="600px" title="模型资源">
                <addModel @returnModel="returnModel" @updateModel="updateModel" :modelItem="modelItem"
                 @updateModelStorage="updateModelStorage" @updateModelcodeContent="updateModelcodeContent"
                  :modeloperateType="modeloperateType" v-if="addModelDialog"></addModel>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="数据资源" name="2">
              <el-table :data="Datatemp" style="width: 100%" max-height="250">
                <el-table-column align='center' fixed prop="dataBaseInfo.name" label="数据资源名称" width="220" />
                <el-table-column align='center' fixed prop="dataBaseInfo.description" label="数据描述" width="660" />
                <el-table-column align='center' fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="updateDataClick(scope.$index)">
                      查看
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="deleteDataClick(scope.$index)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="mt-4" style="width: 100%" @click="addDataClick">添加数据资源</el-button>
              <el-dialog v-if="addDataDialog" v-model="addDataDialog" width="600px" title="数据资源">
                <addData @returnData="returnData" @updateData="updateData" @updateDataLocation="updateDataLocation" :dataItem="dataItem"
                  :dataoperateType="dataoperateType"></addData>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="计算资源" name="3">
              <el-table :data="Computetemp" style="width: 100%" max-height="250">
                <el-table-column align='center' fixed prop="system.name" label="计算资源名称" width="220" />
                <el-table-column align='center' label="模型资源" width="330">
                  <template #default="scope">
                    <div v-if="scope.row.modelResources != undefined">
                      <el-tag class="mtab" v-for="item in scope.row.modelResources">{{ item.modelBaseInfo.name }}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align='center' label="数据资源" width="330">
                  <template #default="scope">
                    <div v-if="scope.row.dataResources != undefined">
                      <el-tag class="mtab" v-for="item in scope.row.dataResources">{{ item.dataBaseInfo.name }}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align='center' fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="updateComputeClick(scope.$index)">
                      查看
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="deleteComputeClick(scope.$index)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="mt-4" style="width: 100%" @click="addComputeClick">添加计算资源</el-button>
              <el-dialog v-if="addComputeDialog" v-model="addComputeDialog" width="600px" title="计算资源">
                <addCompute @returnCompute="returnCompute" @updateCompute="updateCompute" :computeItem="computeItem"
                  :computeoperateType="computeoperateType" :Modeltemp="Modeltemp" :Datatemp="Datatemp">
                </addCompute>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="small-title">
        <div class="icon"></div>
        <h4>2.2 实验步骤</h4>
      </div>
      <div>
        <process @returnProcessList="returnProcessList" :initProcessList="initProcessList" :Modeltemp="Modeltemp"
          :Datatemp="Datatemp" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  onMounted,
} from "vue";
import addModel from "./addModel.vue";
import addData from "./addData.vue";
import addCompute from "./addComoute.vue";
import Process from "./Process.vue";
import router from "@/router";
import { saveProcess } from "@/api/request";
import { deleteModelResources } from "@/api/request";
import { deleteDataResources } from "@/api/request";
import { deleteComputeResources } from "@/api/request";
import { notice } from "@/utils/notice";
import { isNull } from "lodash";
export default defineComponent({
  components: {
    addModel,
    addData,
    addCompute,
    Process,

  },
  props: {
    methodValue: {
      type: Object,
    },
  },
  setup(props,context) {
    const addModelDialog = ref(false)
    const addDataDialog = ref(false)
    const addComputeDialog = ref(false)
    const modelList = ref<any[]>((props.methodValue as any).resource.modelResources);
    const dataList = ref<any[]>((props.methodValue as any).resource.dataResources);
    const computeList = ref<any[]>((props.methodValue as any).resource.computeResources);
    const processes = ref<any[]>((props.methodValue as any).processes);
    const modelItem = ref<any>();
    const dataItem = ref<any>();
    const computeItem = ref<any>();
    const ModelIndex = ref(-1);
    const DataIndex = ref(-1);
    const ComputeIndex = ref(-1);
    const modeloperateType = ref("add");
    const dataoperateType = ref("add");
    const computeoperateType = ref("add");
    const Modeltemp = ref<any[]>(modelList.value)
    const Datatemp = ref<any[]>(dataList.value)
    const Computetemp = ref<any[]>(computeList.value)

    const addModelClick = () => {
      modelItem.value = {
        modelId: '',
        modelBaseInfo: {
          name: '',
          content: '',
          description: '',
          version: '',
          type: '',
          softDemand:'',
          softVersion:'',
          storage: '',
          algorithm:'',
          codeContent:'',
          language: '',
          dependent:'',
          refSystemTime:{
            type:'',
            name:'',
          },
          refSystemSpace:{
            type:'',
            name:'',
          },
          producteTime:'',
          updateTime:'',
          other: ''
        },
        modelMetaData: {
          hypothesis:'',
          modelInputs: [] as any[],
          modelOutputs: [] as any[],
          parameters:[] as any[],
          iterate:{
            name:'',
            description:'',
            defaultValue:''
          }
      },
        modelSource: {
          references:[] as any[],
          publication:'',
          develop:'',
          UId:'',
          license:''
        }
      };
      modeloperateType.value = "add"
      addModelDialog.value = true;
    };

    const updateModelClick = (scope: number) => {
      modelItem.value = modelList.value[scope]
      modeloperateType.value = "update"
      addModelDialog.value = true
      ModelIndex.value = scope
    }
    const deleteModelClick = async (scope: number) => {
      const data = await deleteModelResources(
        (router.currentRoute.value.params.apply as any).id,
        Modeltemp.value[scope]
      );
      if (data != null && (data as any).code === 0) {
        Modeltemp.value.splice(scope, 1)
        notice("success", "成功", "删除成功！");
      }
    }
    const addDataClick = () => {
      dataItem.value = {
       dataId:'',
      dataBaseInfo: {
        name: '',
        description: '',
        type: '',
        location: '',
        format: '',
        parameter:'',
        version: '',
        produceTime: '',
        updateTime: '',
        time:{
          resolution:'',
          scale:'',
          scope:'',
          length:'',
          unit:'',
        },
        space:{
          resolution:'',
          scale:'',
          scope:'',
          dimension:'',
          unit:'',
        }
      },
      dataActive: {
        handleName:'',
        conversionName:'',
        handleDescription:'',
        conversionDescription:'',
      },
      dataSource: {
        publish:'',
        references:[] as any[],
        UId:'',
        develop:''
      }
      };
      dataoperateType.value = "add"
      addDataDialog.value = true;
    };

    const updateDataClick = (scope: number) => {
      dataItem.value = dataList.value[scope]
      dataoperateType.value = "update"
      addDataDialog.value = true
      DataIndex.value = scope
    }

    const deleteDataClick = async (scope: number) => {
      const data = await deleteDataResources(
        (router.currentRoute.value.params.apply as any).id,
        Datatemp.value[scope]
      );
      if (data != null && (data as any).code === 0) {
        Datatemp.value.splice(scope, 1)
        notice("success", "成功", "删除成功！");
      }
    }
    const addComputeClick = () => {
      computeItem.value = {
        computeId:'',
        system:{
          name:'',
          version:''
        },
        cpu:{
          name:'',
          description:'',
          version:''
        },
        gpu:{
          name:'',
          description:'',
          version:''
        },
        ram:{
          name:'',
          description:'',
          version:''
        },
        hdd:{
          name:'',
          description:'',
          version:''
        },
        other:'',
        modelResources:[] as any[],
        dataResources:[] as any[]
      };
      computeoperateType.value = "add"
      addComputeDialog.value = true;
    }

    const updateComputeClick = (scope: number) => {
      computeItem.value = computeList.value[scope]
      computeoperateType.value = "update"
      addComputeDialog.value = true
      ComputeIndex.value = scope
    }

    const deleteComputeClick = async (scope: number) => {
      const data = await deleteComputeResources(
        (router.currentRoute.value.params.apply as any).id,
        Computetemp.value[scope]
      );
      if (data != null && (data as any).code === 0) {
        Computetemp.value.splice(scope, 1)
        notice("success", "成功", "删除成功！");
      }
    }

    const initProcessList = computed(() => {
      return (router.currentRoute.value.params.apply as any).method.processes;
    });

    const returnProcessList = async(val: any[]) => {
      processes.value = val
      const data = await saveProcess(
        (router.currentRoute.value.params.apply as any).id,
        processes.value
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
      }
    };


    const returnModel = (val: any) => {
      Modeltemp.value.push(JSON.parse(JSON.stringify(val)))
      addModelDialog.value = false
    }
    const updateModel = (val: any) => {
      Modeltemp.value.splice(ModelIndex.value, 1, JSON.parse(JSON.stringify(val)))
      addModelDialog.value = false
    }
    const updateModelStorage = () => {
      Modeltemp.value[ModelIndex.value].modelBaseInfo.storage=''
      Modeltemp.value[ModelIndex.value].modelBaseInfo.isUpload='false'
    }
    const updateModelcodeContent = () => {
      Modeltemp.value[ModelIndex.value].modelBaseInfo.codeContent=''
      Modeltemp.value[ModelIndex.value].modelBaseInfo.isCodeUpload='false'
    }
    const updateData = (val: any) => {
      Datatemp.value.splice(DataIndex.value, 1, JSON.parse(JSON.stringify(val)))
      addDataDialog.value = false
    }
    const updateDataLocation = () => {
      Datatemp.value[DataIndex.value].dataBaseInfo.location=''
      Datatemp.value[DataIndex.value].dataBaseInfo.isUpload='false'
    }
    const returnData = (val: any) => {
      Datatemp.value.push(JSON.parse(JSON.stringify(val)))
      addDataDialog.value = false
    }
    const updateCompute = (val: any) => {
      Computetemp.value.splice(ComputeIndex.value, 1, JSON.parse(JSON.stringify(val)))
      addComputeDialog.value = false
    }
    const returnCompute = (val: any) => {
      Computetemp.value.push(JSON.parse(JSON.stringify(val)))
      addComputeDialog.value = false
    }

    const saveClick = async () => {
      const data = await saveProcess(
        (router.currentRoute.value.params.apply as any).id,
        processes.value
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
      }
    };

    return {
      activeName: '1',
      returnProcessList,
      initProcessList,
      saveClick,
      modelItem,
      dataItem,
      computeItem,
      modeloperateType,
      dataoperateType,
      computeoperateType,
      Modeltemp,
      Datatemp,
      Computetemp,
      addModelDialog,
      addDataDialog,
      addComputeDialog,
      addModelClick,
      updateModelClick,
      deleteModelClick,
      addDataClick,
      updateDataClick,
      deleteDataClick,
      addComputeClick,
      updateComputeClick,
      deleteComputeClick,
      returnModel,
      updateModel,
      ModelIndex,
      DataIndex,
      ComputeIndex,
      returnData,
      updateData,
      returnCompute,
      updateCompute,
      updateDataLocation,
      updateModelStorage,
      updateModelcodeContent
    };
  },
});
</script>

<style lang="scss" scoped>
.method {
  width: 1000px;
  padding-left: 20px;
  .title{
    display: flex;
    align-items: flex-end;
  }
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

  .resource {
    .body {
      display: flex;

      .left {
        width: 300px;
      }

      .right {
        padding-left: 20px;
        width: calc(100% - 280px);
      }
    }
  }

  .resource,
  .step {
    margin-bottom: 40px;
  }

  .btn {
    text-align: center;
    margin: 40px 0px;
  }
}

.saveCompute {
  width: 20%;
  margin-left: 100px;
}
.mtab{
  margin-right: 5px;
}
</style>