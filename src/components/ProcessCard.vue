<template>
  <div>
    <el-card>
      <h3>{{ stepInfo.name }}</h3>
      <div class="process-item">
        <strong>步骤类型：</strong
        ><el-tag type="success" size="large">{{ stepInfo.stepType }}</el-tag>
      </div>
      <div class="process-item">
        <strong>操作类型：</strong
        ><el-tag size="large">{{ stepInfo.operateType }}</el-tag>
      </div>
      <div class="process-item resource" v-if="stepInfo.processResources.length > 0">
        <strong>资源配置：</strong>
        <el-scrollbar>
          <div class="card">
            <div
              v-for="(item, index) in stepInfo.processResources"
              :key="index"
              class="card-item"
            >
              <div class="name item">
                <strong>名称：</strong>
                <div class="text" :title="item.name">
                  {{ item.name }}
                </div>
              </div>
              <div class="type item">
                <strong>类型：</strong>
                <el-tag size="large" v-if="item.type == 'data'"
                  >数据资源</el-tag
                >
                <el-tag size="large" v-else>模型资源</el-tag>
              </div>
              <div class="description item">
                <strong>描述：</strong>
                <div
                  class="text"
                  v-if="item.type == 'data'"
                  :title="item.dataInfo"
                >
                  {{ item.dataInfo }}
                </div>
                <div class="text" v-else :title="item.modelInfo">
                  {{ item.modelInfo }}
                </div>
              </div>
              <div v-if="item.type == 'model'">
                <div class="input item">
                  <strong>输入：</strong>
                  <el-button
                    type="primary"
                    :icon="MoreFilled"
                    size="small"
                    @click="inputClick(item.modelInputs)"
                  />
                </div>
                <div class="output item">
                  <strong>输出：</strong>
                  <el-button
                    type="primary"
                    :icon="MoreFilled"
                    size="small"
                    @click="outputClick(item.modelOutputs)"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="des process-item">
        <strong>步骤描述：</strong>
        <div class="text">
          {{ stepInfo.description }}
        </div>
      </div>
      <div class="process-item" v-if="stepInfo.pictures.length > 0">
        <strong>图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：</strong>
        <div class="text">
          <img
            :src="'http://localhost:8888/upload/getImg/' + item"
            style="height: 100px; width: 100px; margin-right: 10px"
            v-for="(item, index) in stepInfo.pictures"
            :key="index"
          />
        </div>
      </div>

      <div class="process-item" v-if="stepInfo.reference != ''">
        <strong>参考文献：</strong>
        <div class="text">
          {{ stepInfo.reference }}
        </div>
      </div>
      <div class="process-item" v-if="stepInfo.other != ''">
        <strong>其他补充：</strong>
        <div class="text">{{ stepInfo.other }}</div>
      </div>
      <slot name="button"></slot>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <input-or-output-show
        v-if="dialogVisible"
        :info="inputOutputValue"
      ></input-or-output-show>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { MoreFilled } from "@element-plus/icons-vue";
import InputOrOutputShow from "./InputOrOutputShow.vue";
export default defineComponent({
  props: {
    stepInfo: {
      type: Object,
    },
  },
  components: { InputOrOutputShow },
  setup(props) {
    const dialogVisible = ref(false);
    const title = ref("");
    const inputOutputValue = ref<any[]>([]);
    const stepInfo = computed(() => {
      return props.stepInfo;
    });

    const inputClick = (data: any[]) => {
      inputOutputValue.value = [];
      data.forEach((item, index) => {
        inputOutputValue.value.push(item);
        inputOutputValue.value[index].type = "input";
      });
      title.value = "输入";
      dialogVisible.value = true;
    };

    const outputClick = (data: any[]) => {
      inputOutputValue.value = [];
      data.forEach((item, index) => {
        inputOutputValue.value.push(item);
        inputOutputValue.value[index].type = "output";
      });
      title.value = "输出";
      dialogVisible.value = true;
    };

    return {
      dialogVisible,
      MoreFilled,
      inputOutputValue,
      stepInfo,
      inputClick,
      outputClick,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  .des {
    line-height: 25px;
  }
  .process-item {
    margin-bottom: 10px;
    display: flex;
    .text {
      width: calc(100% - 70px);
    }
  }
  .resource {
    display: flex;
    .el-scrollbar {
      width: calc(100% - 70px);
      .card {
        display: flex;
        .card-item {
          flex-shrink: 0;
          width: 300px;
          height: 200px;
          margin: 10px;
          background: #fef0f0;
          border-radius: 6px;
          padding: 10px;
          .item {
            margin-bottom: 10px;
          }
          .name {
            display: flex;
            .text {
              width: calc(100% - 42px);
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              cursor: pointer;
            }
          }
          .description {
            display: flex;
            .text {
              width: calc(100% - 42px);
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>