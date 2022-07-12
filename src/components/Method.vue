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
            <model-base-info v-if="active === '1-1'"></model-base-info>
            <model-meta-data v-if="active === '1-2'"></model-meta-data>
            <model-source v-if="active === '1-3'"></model-source>
            <data-base-info v-if="active === '2-1'"></data-base-info>
            <data-active v-if="active === '2-2'"></data-active>
            <data-source v-if="active === '2-3'"></data-source>
            <compute-resource v-if="active === '3'"></compute-resource>
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
        <process />
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" plain>保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
import { defineComponent, ref, nextTick } from "vue";
import ModelBaseInfo from "./ModelBaseInfo.vue";
import ModelMetaData from "./ModelMetaData.vue";
import ModelSource from "./ModelSource.vue";
import DataBaseInfo from "./DataBaseInfo.vue";
import DataActive from "./DataActive.vue";
import DataSource from "./DataSource.vue";
import ComputeResource from "./ComputeResource.vue";
import Process from "./Process.vue";
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
  setup() {
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

    nextTick(() => {
      tree.value.setCurrentKey("1-1");
    });

    const nodeClick = (data: any) => {
      if (data.id != "1" && data.id != "2") {
        active.value = data.id;
      }
    };

    return {
      active,
      defaultProps,
      data,
      nodeClick,
      tree,
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