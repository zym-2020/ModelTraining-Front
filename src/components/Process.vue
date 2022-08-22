<template>
  <div>
    <div class="example">
      <div class="example-text"><strong>示例：</strong></div>
      <el-timeline>
        <el-timeline-item center timestamp="步骤1" placement="top">
          <div><process-card :stepInfo="step1" ></process-card></div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <el-timeline>
      <el-timeline-item v-for="(item, index) in processList" :key="index" center :timestamp="'步骤' + (index + 1)"
        placement="top">
        <div class="card">
        <process-card :stepInfo="item" :stepInfoId="index" @returnProcessItemVideo="returnProcessItemVideo" >
          <template #button>
            <div class="button" style="position: absolute;z-index: 99;top: 40px;right: 50px;">
              <el-button type="primary" :icon="Edit" circle @click="editClick(index)" />
              <el-button type="danger" :icon="Delete" circle @click="deleteClick(index)" />
            </div>
          </template>
        </process-card>
        </div>
      </el-timeline-item>
      <el-timeline-item timestamp="添加步骤" placement="top">
        <div class="add" @click="addProcessClick">
          <el-icon size="20px">
            <Plus />
          </el-icon>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
  <el-dialog v-if="addFlag" v-model="addFlag" width="600px" title="添加步骤">
    <add-process @returnProcess="returnProcess" :processType="processType" :processItem="processItem" :operateType="operateType"
      :Modeltemp="Modeltemp" :Datatemp="Datatemp" @updateProcess="updateProcess"></add-process>
  </el-dialog>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ProcessCard from "./ProcessCard.vue";
import { step1 } from "@/utils/ExampleData";
import AddProcess from "@/components/AddProcess.vue";
import { Delete, Edit } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    initProcessList: {
      type: Object,
    },
    Modeltemp: {
      type: Object,
    },
    Datatemp: {
      type: Object,
    },
  },
  components: { ProcessCard, AddProcess },
  emits: ["returnProcessList"],
  setup(props, context) {
    const addFlag = ref(false);
    const updateFlag = ref(false);
    const processList = ref<any[]>(props.initProcessList as any[]);
    const processItem = ref<any>();
    const operateType = ref("add");
    const processType = ref("method");
    const updateIndex = ref(-1);
    const Modeltemp = ref<any[]>(props.Modeltemp as any[])
    const Datatemp = ref<any[]>(props.Datatemp as any[])
    const returnProcessItemVideo = (val: any,id:number) =>{
      processList.value[id] = val 
      context.emit("returnProcessList", processList.value);
    }
    const returnProcess = (val: any) => {
      processList.value.push(JSON.parse(JSON.stringify(val)));
      addFlag.value = false;
      context.emit("returnProcessList", processList.value);
    };

    const updateProcess = (val: any) => {
      processList.value[updateIndex.value] = val;
      addFlag.value = false;
      context.emit("returnProcessList", processList.value);
    };

    const editClick = (index: number) => {
      processItem.value = processList.value[index];
      operateType.value = "update";
      updateIndex.value = index;
      addFlag.value = true;
    };

    const addProcessClick = () => {
      processItem.value = {
        name: "",
        stepType: "",
        operateType: "",
        description: "",
        references: [],
        other: "",
        pictures: [],
        video:{
          id:"",
          name:''
        },
        modelResource:{
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
        },
        dataResources: [],
      };
      operateType.value = "add"
      addFlag.value = true;
    };

    const deleteClick = (index: number) => {
      processList.value.splice(index, 1);
      context.emit("returnProcessList", processList.value);
    };

    onMounted(() => {
    });

    return {
      step1,
      addFlag,
      returnProcess,
      processList,
      Delete,
      Edit,
      deleteClick,
      editClick,
      processItem,
      updateFlag,
      updateProcess,
      operateType,
      addProcessClick,
      Modeltemp,
      Datatemp,
      processType,
      returnProcessItemVideo
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;

  .button {
    position: absolute;
    z-index: 99;
    top: 20px;
    right: 20px;
  }
}
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


</style>