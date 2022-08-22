<template>
  <div>
    <el-card>
      <h3>{{ stepInfo.name }}</h3>
      <div class="process-item">
        <strong>步骤类型：</strong>
        <el-tag  size="large">{{ stepInfo.stepType }}</el-tag>
      </div>
      <div class="process-item">
        <strong>操作类型：</strong>
        <el-tag size="large" >{{ stepInfo.operateType }}</el-tag>
      </div>
      <strong>资源配置：</strong>
      <div class="process-item resource" v-if="stepInfo.modelResource">
          <div class="card">
            <div class="card-item1">
              <div class="name item">
                <strong>模型名称：</strong>
                <div class="text" :title="stepInfo.modelResource.modelBaseInfo.name">
                  {{ stepInfo.modelResource.modelBaseInfo.name }}
                </div>
              </div>
              <div class="description item" >
                <strong>模型描述：</strong>
                <div class="text" :title="stepInfo.modelResource.modelBaseInfo.description">
                  {{ stepInfo.modelResource.modelBaseInfo.description }}
                </div>
              </div>
              <div>
                <div class="input item" v-if="stepInfo.modelResource.modelMetaData.modelInputs.length>0">
                  <strong>输入：</strong>
                  <el-scrollbar>
                  <div class="card">
                    <div v-for="item in stepInfo.modelResource.modelMetaData.modelInputs">
                      <div v-if="item.dataResource"  class="card-item2">
                      <el-scrollbar height="200px">
                        <h5>{{ item.name }}</h5>
                        <div class="type item">
                          <strong>输入描述：</strong>
                          <div class="text" :title="item.description">
                            {{ item.description }}
                          </div>
                        </div>
                        <div class="description item">
                          <strong>使用的数据资源：</strong>
                            <el-tag size="large" type="success" @click=inputtagClick(item.dataResource)>{{item.dataResource.dataBaseInfo.name}}</el-tag>
                        </div>
                        </el-scrollbar>
                      </div>
                    </div>
                  </div>
                  </el-scrollbar>
                </div>
                <div class="item" v-if="stepInfo.modelResource.modelMetaData.modelOutputs.length>0">
                  <strong>输出：</strong><br>
                  <el-scrollbar>
                  <div class="card" >
                  <div v-for="item in stepInfo.modelResource.modelMetaData.modelOutputs">
                  <div v-if="item.dataResource"  class="card-item2">
                  <el-scrollbar height="200px">
                    <h5>{{ item.name }}</h5>
                    <div class="item">
                      <strong>输出描述：</strong>
                      <div class="text" :title="item.description">
                        {{ item.description }}
                      </div>
                    </div>
                    <div class="description item">
                      <strong>使用的数据资源：</strong>
                        <el-tag size="large" type="success" @click=outputtagClick(item.dataResource)>{{item.dataResource.dataBaseInfo.name}}</el-tag>
                    </div>
                    </el-scrollbar>
                  </div>
                  </div>
                </div>
                </el-scrollbar>
                </div>
                <div class="item" v-if="paramCheck()">
                <strong>参数：</strong><br>
                <el-scrollbar height="200px">
                  <div class="card">
                  <div v-for="item in stepInfo.modelResource.modelMetaData.parameters" >
                  <div v-if="item.dataResource" class="card-item2">
                   <el-scrollbar>
                    <h5>{{ item.name }}</h5>
                    <div class="item">
                      <strong>参数描述：</strong>
                      <div class="text" :title="item.description">
                        {{ item.description }}
                      </div>
                    </div>
                    <div class="description item">
                      <strong>使用的数据资源：</strong>
                        <el-tag size="large" type="success" @click=paramtagClick(item.dataResource)>{{item.dataResource.dataBaseInfo.name}}</el-tag>
                    </div>
                    </el-scrollbar>
                  </div>
                  </div>
                </div>
                </el-scrollbar>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="item">
        <strong>步骤描述：</strong>
        <div class="text">
          {{ stepInfo.description }}
        </div>
      </div>
      <div class="item" v-if="stepInfo.pictures.length > 0">
        <strong>图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：</strong>
        <div class="text">
          <img :src="'http://172.21.213.216:8888/upload/getImg/' + item"
            style="height: 100px; width: 100px; margin-right: 10px" v-for="(item, index) in stepInfo.pictures"
            :key="index" />
        </div>
      </div>
      <div class="tag-item" v-if="stepInfo.references.length > 0" >
      <strong >参考文献：</strong> 
        <el-tag
          v-for="tag in stepInfo.references"
          :key="tag"
        >
          {{tag.length>33?tag.substring(0,22)+'......'+tag.substring(tag.length-10,tag.length):tag}}
        </el-tag>
      </div>
      <div class="item" v-if="stepInfo.other != ''">
        <strong>其他补充：</strong>
        <div class="text">{{ stepInfo.other }}</div>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <el-button style="margin-top: 20px;margin-right: 10px;" type="primary" @click="uploadClick" :disabled="stepInfo.video.id==='-1'">视频上传</el-button>
        <div v-if="processVideoItem && processVideoItem.id!=''">已上传文件：<el-tag>{{processVideoItem.name}}</el-tag></div>
      </div>
      <slot name="button"></slot>
    </el-card>
  </div>
    <el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="title" width="30%">
      <input-or-output-show v-if="dialogVisible" :info="dataItem"></input-or-output-show>
    </el-dialog>
    <el-dialog v-if="uploadProcessVideo" v-model="uploadProcessVideo">
        <process-video-upload :videoItem="processVideoItem" :process="stepInfo" @returnVideo="returnProcessVideo"></process-video-upload>
    </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { MoreFilled } from "@element-plus/icons-vue";
import InputOrOutputShow from "./InputOrOutputShow.vue";
import ProcessVideoUpload from "./ProcessVideoUpload.vue";
import { notice } from "@/utils/notice";
import {
  getProcessLength
} from "@/api/request";
import router from "@/router";
export default defineComponent({
  props: {
    stepInfo: {
      type: Object,
    },
    stepInfoId: {
      type: Number,
    },
  },
  components: { InputOrOutputShow,ProcessVideoUpload },
  emits: ["returnProcessItemVideo"],
  setup(props,context) {
    const dialogVisible = ref(false);
    const uploadProcessVideo = ref(false)
    const title = ref("");
    const inputOutputValue = ref<any[]>([]);
    const dataItem = ref<any>();
    const stepInfo = computed(() => {
      return props.stepInfo as any
    })
    const stepInfoId = computed(() => {
      return props.stepInfoId as any
    })
    const paramCheck = () =>{
      for(let i = 0 ; i < stepInfo.value.modelResource.modelMetaData.parameters.length; ++i){
        if(stepInfo.value.modelResource.modelMetaData.parameters[i].dataResource)
          return true
      }
      return false
    }
    const uploadClick = async() =>{
      const data = await getProcessLength((router.currentRoute.value.params.apply as any).id);
      if (data != null && (data as any).code === 0) {
        if(stepInfoId.value>=data.data)
        {
          notice("warning", "警告", "请“保存实验方法内容”后再进行视频上传！");
        }
        else{
          uploadProcessVideo.value=true
        }
      }

    }
    const processVideoItem = ref(
      (props.stepInfo as any).video
    );
    const returnProcessVideo = (val: any[]) => {
      processVideoItem.value = val
      stepInfo.value.video = val
      context.emit("returnProcessItemVideo", stepInfo,stepInfoId)
    };
    const inputtagClick = (data: any[]) => {
      dataItem.value=data;
      title.value = "输入";
      dialogVisible.value = true;
    };
    const outputtagClick = (data: any[]) => {
      dataItem.value=data;
      title.value = "输出";
      dialogVisible.value = true;
    };
    const paramtagClick = (data: any[]) => {
      dataItem.value=data;
      title.value = "参数";
      dialogVisible.value = true;
    };
    const inputClick = (data: any[]) => {
      dataItem.value=data;
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
      paramCheck
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
      dataItem,
      inputtagClick,
      outputtagClick,
      paramtagClick,
      uploadProcessVideo,
      processVideoItem,
      returnProcessVideo,
      uploadClick,
      paramCheck
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  width: 920px;
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

      .card {
        display: flex;

        .card-item1 {
          flex-shrink: 0;
          width: 840px;
          margin: 10px;
          background: #fef0f0;
          border-radius: 6px;
          padding: 10px;
          .name {
            display: flex;

            .text {
              width: calc(100% - 70px);
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
              width: calc(100% - 70px);
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              cursor: pointer;
            }
          }
        }
        .card-item2 {
          flex-shrink: 0;
          width: 280px;
          margin: 10px;
          background: #d3e6ff;
          border-radius: 6px;
          padding: 10px;
          .name {
            display: flex;

            .text {
              width: calc(100% - 70px);
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
              width: calc(100% - 200px);
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

.item {

  margin-bottom: 10px;
  .text {
    width: calc(95% - 39px);
  }
}
.tag-item{
  width: calc(100% - 10px);
}

</style>