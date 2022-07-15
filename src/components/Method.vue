<template>
  <div class="method">
    <div class="title"><h2>实验方法</h2></div>
    <el-divider />
    <div class="resource">
      <div class="small-title">
        <div class="icon"></div>
        <h4>研究资源</h4>
      </div>
      <div class="body">
        <div class="left">
          <el-tree
            ref="tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            highlight-current
            @node-click="nodeClick"
            node-key="id"
          />
        </div>
        <div class="right">
          <div class="model-base-info">
            <model-base-info
              :modelBaseInfoValue="modelBaseInfoValue"
              @returnModelBaseInfo="returnModelBaseInfo"
              v-if="active === '1-1'"
            ></model-base-info>
            <model-meta-data
              :modelMetaDataValue="modelMetaDataValue"
              @returnModelMetaData="returnModelMetaData"
              v-if="active === '1-2'"
            ></model-meta-data>
            <model-source
              :modelSourceValue="modelSourceValue"
              @returnModelSource="returnModelSource"
              v-if="active === '1-3'"
            ></model-source>
            <data-base-info
              :dataBaseInfoValue="dataBaseInfoValue"
              @returnDataBase="returnDataBase"
              v-if="active === '2-1'"
            ></data-base-info>
            <data-active
              v-if="active === '2-2'"
              :dataActiveValue="dataActiveValue"
              @returnDataActive="returnDataActive"
            ></data-active>
            <data-source
              :dataSourceValue="dataSourceValue"
              @returnDataSource="returnDataSource"
              v-if="active === '2-3'"
            ></data-source>
            <compute-resource
              :computeResourceValue="computeResourceValue"
              @returnComputResource="returnComputResource"
              v-if="active === '3'"
            ></compute-resource>
          </div>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="small-title">
        <div class="icon"></div>
        <h4>实验过程</h4>
      </div>
      <div>
        <process
          @returnProcessList="returnProcessList"
          :initProcessList="initProcessList"
        />
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="saveClick">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
import {
  defineComponent,
  ref,
  nextTick,
  computed,
  reactive,
  onMounted,
} from "vue";
import ModelBaseInfo from "./ModelBaseInfo.vue";
import ModelMetaData from "./ModelMetaData.vue";
import ModelSource from "./ModelSource.vue";
import DataBaseInfo from "./DataBaseInfo.vue";
import DataActive from "./DataActive.vue";
import DataSource from "./DataSource.vue";
import ComputeResource from "./ComputeResource.vue";
import Process from "./Process.vue";
import router from "@/router";
import { savaMethod } from "@/api/request";
import { notice } from "@/utils/notice";
export default defineComponent({
  components: {
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
    const processes = ref<any[]>((props.methodValue as any).processes);

    const modelBaseInfoValue = ref(
      (props.methodValue as any).resource.modelResource.modelBaseInfo
    );
    const modelMetaDataValue = ref(
      (props.methodValue as any).resource.modelResource.modelMetaData
    );
    const modelSourceValue = ref(
      (props.methodValue as any).resource.modelResource.modelSource
    );
    const dataBaseInfoValue = ref(
      (props.methodValue as any).resource.dataResource.dataBaseInfo
    );
    const dataActiveValue = ref(
      (props.methodValue as any).resource.dataResource.dataActive
    );
    const dataSourceValue = ref(
      (props.methodValue as any).resource.dataResource.dataSource
    );
    const computeResourceValue = ref(
      (props.methodValue as any).resource.computeResource
    );

    const active = ref("1-1");
    const tree = ref();
    const defaultProps = {
      children: "children",
      label: "label",
    };
    const data: Tree[] = [
      {
        id: "1",
        label: "模型资源",
        children: [
          {
            id: "1-1",
            label: "基础信息",
          },
          {
            id: "1-2",
            label: "元数据信息",
          },
          {
            id: "1-3",
            label: "出处信息",
          },
        ],
      },
      {
        id: "2",
        label: "数据资源",
        children: [
          { id: "2-1", label: "基础信息" },
          { id: "2-2", label: "活动信息" },
          { id: "2-3", label: "出处信息/代理属性" },
        ],
      },
      { id: "3", label: "计算资源" },
    ];

    const initProcessList = computed(() => {
      return (router.currentRoute.value.params.apply as any).method.processes;
    });

    nextTick(() => {
      tree.value.setCurrentKey("1-1");
    });

    const nodeClick = (data: any) => {
      if (data.id != "1" && data.id != "2") {
        active.value = data.id;
      }
    };

    const returnProcessList = (val: any[]) => {
      processes.value = val;
    };

    const returnModelBaseInfo = (val: any) => {
      modelBaseInfoValue.value = val;
    };

    const returnDataActive = (val: any) => {
      dataActiveValue.value = val;
    };

    const returnModelMetaData = (val: any) => {
      modelMetaDataValue.value = val;
    };

    const returnModelSource = (val: any) => {
      modelSourceValue.value = val;
    };

    const returnDataBase = (val: any) => {
      dataBaseInfoValue.value = val;
    };

    const returnDataSource = (val: any) => {
      dataSourceValue.value = val;
    };

    const returnComputResource = (val: any) => {
      computeResourceValue.value = val;
    };

    const saveClick = async () => {
      const method = {
        processes: processes.value,
        resource: {
          computeResource: computeResourceValue.value,
          dataResource: {
            dataBaseInfo: dataBaseInfoValue.value,
            dataActive: dataActiveValue.value,
            dataSource: dataSourceValue.value,
          },
          modelResource: {
            modelBaseInfo: modelBaseInfoValue.value,
            modelMetaData: modelMetaDataValue.value,
            modelSource: modelSourceValue.value,
          },
        },
      };
      const data = await savaMethod(
        (router.currentRoute.value.params.apply as any).id,
        method
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
      }
    };

    return {
      active,
      defaultProps,
      data,
      nodeClick,
      tree,
      returnProcessList,
      initProcessList,
      dataActiveValue,
      returnDataActive,
      modelBaseInfoValue,
      returnModelBaseInfo,
      modelMetaDataValue,
      returnModelMetaData,
      modelSourceValue,
      returnModelSource,
      dataBaseInfoValue,
      returnDataBase,
      dataSourceValue,
      returnDataSource,
      computeResourceValue,
      returnComputResource,
      saveClick,
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
    /deep/ .el-tree-node__label {
      font-size: 16px;
      font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
      color: #999999;
    }
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
</style>