<template>
  <div>
    <el-card>
      <h3>{{ stepInfo.name }}</h3>
      <div class="process-item">
        <strong>步骤类型：</strong>
        <el-tag  type="warning" size="large">{{ stepInfo.stepType }}</el-tag>
      </div>
      <div class="process-item">
        <strong>操作类型：</strong>
        <el-tag size="large"  type="warning">{{ stepInfo.operateType }}</el-tag>
      </div>
      <strong>资源配置：</strong>
      <div class="process-item resource" v-if="stepInfo.modelResources.length > 0">
        <el-scrollbar>
          <div class="card">
            <div v-for="(item, index) in stepInfo.modelResources" :key="index" class="card-item">
              <div class="type item">
                <strong>类型：</strong>
                <el-tag size="large" type="success">模型资源</el-tag>
              </div>
              <div class="name item">
                <strong>名称：</strong>
                <div class="text" :title="item.modelBaseInfo.name">
                  {{ item.modelBaseInfo.name }}
                </div>
              </div>

              <div class="description item">
                <strong>描述：</strong>
                <div class="text" :title="item.modelBaseInfo.description">
                  {{ item.modelBaseInfo.description }}
                </div>
              </div>
              <div>
                <div class="input item">
                  <strong>输入：</strong>
                  <el-button type="primary" :icon="MoreFilled" size="small"
                    @click="inputClick(item.modelMetaData.modelInputs)" />
                </div>
                <div class="output item">
                  <strong>输出：</strong>
                  <el-button type="primary" :icon="MoreFilled" size="small"
                    @click="outputClick(item.modelMetaData.modelOutputs)" />
                </div>
                <div class="param item">
                  <strong>参数：</strong>
                  <el-button type="primary" :icon="MoreFilled" size="small"
                    @click="paramClick(item.modelMetaData.parameters)" />
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="process-item resource" v-if="stepInfo.dataResources.length > 0">
        <el-scrollbar>
          <div class="card">
            <div v-for="(item, index) in stepInfo.dataResources" :key="index" class="card-item">
              <div class="type item">
                <strong>类型：</strong>
                <el-tag size="large">数据资源</el-tag>
              </div>
              <div class="name item">
                <strong>名称：</strong>
                <div class="text" :title="item.dataBaseInfo.name">
                  {{ item.dataBaseInfo.name }}
                </div>
              </div>

              <div class="description item">
                <strong>描述：</strong>
                <div class="text" :title="item.dataBaseInfo.description">
                  {{ item.dataBaseInfo.description }}
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
          <img :src="'http://localhost:8888/upload/getImg/' + item"
            style="height: 100px; width: 100px; margin-right: 10px" v-for="(item, index) in stepInfo.pictures"
            :key="index" />
        </div>
      </div>

      <div class="process-item" v-if="stepInfo.references.length > 0">
      <strong>参考文献：</strong>
        <el-tag
          v-for="tag in stepInfo.references"
          :key="tag"
          class="mx-1"
        >
          {{tag.length>33?tag.substring(0,22)+'......'+tag.substring(tag.length-10,tag.length):tag}}
        </el-tag>
      </div>
      <div class="process-item" v-if="stepInfo.other != ''">
        <strong>其他补充：</strong>
        <div class="text">{{ stepInfo.other }}</div>
      </div>
      <slot name="button"></slot>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <input-or-output-show v-if="dialogVisible" :info="inputOutputValue"></input-or-output-show>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
    /*     const stepInfo = computed(() => {
          return props.stepInfo;
        }); */
    const stepInfo = ref<any>(props.stepInfo as any);

    const inputClick = (data: any[]) => {
      inputOutputValue.value = [];
      data.forEach((item) => {
        inputOutputValue.value.push(item);
      });
      title.value = "输入";
      dialogVisible.value = true;
    };

    const outputClick = (data: any[]) => {
      inputOutputValue.value = [];
      data.forEach((item) => {
        inputOutputValue.value.push(item);
      });
      title.value = "输出";
      dialogVisible.value = true;
    };
    const paramClick = (data: any[]) => {
      inputOutputValue.value = [];
      data.forEach((item) => {
        inputOutputValue.value.push(item);
      });
      title.value = "参数";
      dialogVisible.value = true;
    };

    onMounted(() => {
      console.log((props.stepInfo as any).dataResources, (props.stepInfo as any).modelResources)
    })

    return {
      dialogVisible,
      MoreFilled,
      inputOutputValue,
      stepInfo,
      inputClick,
      outputClick,
      paramClick,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  width: 1100px;
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


      .card {
        display: flex;

        .card-item {
          flex-shrink: 0;
          width: 300px;
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