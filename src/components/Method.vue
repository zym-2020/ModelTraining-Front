<template>
  <div class="method">
    <div class="title">
      <h2>实验方法</h2>
    </div>
    <el-divider />
    <div class="resource">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究资源</h4>
      </div>
      <div class="body">
        <div>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="模型资源" name="1">
              <el-table :data="Modeltemp" style="width: 100%" max-height="250">
                <el-table-column align='center' prop="modelBaseInfo.name" label="模型资源名称" width="1200" />
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
              <el-dialog v-model="addModelDialog" width="600px" title="添加模型资源">
                <addModel @returnModel="returnModel" @updateModel="updateModel" :modelItem="modelItem" :modeloperateType="modeloperateType"></addModel>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="数据资源" name="2">
              <el-table :data="Datatemp" style="width: 100%" max-height="250">
                <el-table-column align='center' fixed prop="dataBaseInfo.name" label="数据资源名称" width="1200" />
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
              <el-dialog v-model="addDataDialog" width="600px" title="添加数据资源">
                <addData @returnData="returnData" @updateData="updateData" :dataItem="dataItem" :dataoperateType="dataoperateType"></addData>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="计算资源" name="3">
              <ComputeResource :computeResourceValue="computeResourceValue"
                @returnComputResource="returnComputResource">
              </ComputeResource>
              <el-button class="saveCompute" @click="addComputeClick">保存计算资源</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="small-title">
        <div class="icon"></div>
        <h4>实验过程</h4>
      </div>
      <div>
        <process @returnProcessList="returnProcessList" :initProcessList="initProcessList" :Modeltemp="Modeltemp"
          :Datatemp="Datatemp" />
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="saveClick">保存</el-button>
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
import ModelBaseInfo from "./ModelBaseInfo.vue";
import ModelMetaData from "./ModelMetaData.vue";
import ModelSource from "./ModelSource.vue";
import DataBaseInfo from "./DataBaseInfo.vue";
import DataActive from "./DataActive.vue";
import DataSource from "./DataSource.vue";
import ComputeResource from "./ComputeResource.vue";
import Process from "./Process.vue";
import router from "@/router";
import { saveProcess } from "@/api/request";
import { saveComputeResource } from "@/api/request";
import { deleteModelResources } from "@/api/request";
import { deleteDataResources } from "@/api/request";
import { notice } from "@/utils/notice";
import { isNull } from "lodash";
export default defineComponent({
  components: {
    addModel,
    addData,
    ModelBaseInfo,
    ModelMetaData,
    ModelSource,
    DataBaseInfo,
    DataActive,
    DataSource,
    ComputeResource,
    Process,
  },
  props: {
    methodValue: {
      type: Object,
    },
  },
  setup(props) {
    const addModelDialog = ref(false)
    const addDataDialog = ref(false)
    const modelList = ref<any[]>((props.methodValue as any).resource.modelResources);
    const dataList = ref<any[]>((props.methodValue as any).resource.dataResources);
    const processes = ref<any[]>((props.methodValue as any).processes);
    const modelItem = ref<any>();
    const dataItem = ref<any>();
    const ModelIndex = ref(-1);
    const DataIndex = ref(-1);
    const modeloperateType = ref("add");
    const dataoperateType = ref("add");
    let Modeltemp = ref<any[]>(JSON.parse(JSON.stringify(modelList.value)))
    let Datatemp = ref<any[]>(JSON.parse(JSON.stringify(dataList.value)))
    const computeResourceValue = ref((props.methodValue as any).resource.computeResource);

    const active = ref("1-1");
    const defaultProps = {
      children: "children",
      label: "label",
    };

    const addModelClick = () => {
      modelItem.value = {
        modelId:'',
        modelBaseInfo: {
          name: '',
          content: '',
          description: '',
          type: '',
          storage: '',
          version: '',
          language: '',
          other: ''
        },
        modelMetaData: {
          hypothesis:'',
          algorithm:'',
          iterate:'',
          version:'',
          necessity:'',
          demand:'',
          modelInputs: [] as any[],
          modelOutputs: [] as any[],
          parameters:[] as any[],
        },
        modelSource: {
          references:[] as any[],
          publication:'',
          develop:''
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
        location: '',
        description: '',
        format: '',
        version: '',
        produceTime: '',
        updateTime: '',
        unit: '',
        precision: '',
        spacetimescales: [] as any[],
        identifier: ''
      },
      dataActive: {
        handle:'',
        conversion:'',
      },
      dataSource: {
        publish:'',
        references:[] as any[],
        license:'',
        develop:''
      }
      };
      modeloperateType.value = "add"
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
    const addComputeClick = async () => {
      const computeResource = computeResourceValue.value
      const data = await saveComputeResource(
        (router.currentRoute.value.params.apply as any).id,
        computeResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
      }
    }
    const initProcessList = computed(() => {
      return (router.currentRoute.value.params.apply as any).method.processes;
    });

    const returnProcessList = (val: any[]) => {
      processes.value = val;
    };

    const returnComputResource = (val: any) => {
      computeResourceValue.value = val;
    };
    const returnModel = (val: any) => {
      Modeltemp.value.push(JSON.parse(JSON.stringify(val)))
      addModelDialog.value = false
    }
    const updateModel = (val:any) =>{
      Modeltemp.value.splice(ModelIndex.value,1,JSON.parse(JSON.stringify(val)))
      addModelDialog.value = false
    }
    const updateData = (val:any) =>{
      Datatemp.value.splice(DataIndex.value,1,JSON.parse(JSON.stringify(val)))
      addDataDialog.value = false
    }
    const returnData = (val: any) => {
      Datatemp.value.push(JSON.parse(JSON.stringify(val)))
      addDataDialog.value = false
    }

    const saveClick = async () => {
      console.log(processes.value)
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
      active,
      defaultProps,
      returnProcessList,
      initProcessList,
      computeResourceValue,
      returnComputResource,
      saveClick,
      modelItem,
      dataItem,
      modeloperateType,
      dataoperateType,
      Modeltemp,
      Datatemp,
      addModelDialog,
      addDataDialog,
      addModelClick,
      updateModelClick,
      deleteModelClick,
      addDataClick,
      updateDataClick,
      deleteDataClick,
      addComputeClick,
      returnModel,
      updateModel,
      ModelIndex,
      DataIndex,
      returnData,
      updateData
    };
  },
});
</script>

<style lang="scss" scoped>
.method {
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
</style>