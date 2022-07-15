<template>
  <div>
    <div class="example">
      <div class="example-text"><strong>示例：</strong></div>
      <el-timeline>
        <el-timeline-item center timestamp="步骤1" placement="top">
          <process-card :stepInfo="step1"></process-card>
        </el-timeline-item>
      </el-timeline>
    </div>

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
  <el-dialog v-model="addFlag" width="600px" title="添加步骤">
    <add-process
      @returnProcess="returnProcess"
      :processItem="processItem"
      :operateType="operateType"
      @updateProcess="updateProcess"
    ></add-process>
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
  },
  components: { ProcessCard, AddProcess },
  emits: ["returnProcessList"],
  setup(props, context) {
    const addFlag = ref(false);
    const updateFlag = ref(false);
    const processList = ref<any[]>(props.initProcessList as any[]);
    const processItem = ref<any>();
    const operateType = ref("add");
    const updateIndex = ref(-1);

    const returnProcess = (val: any) => {
      console.log(val);
      processList.value.push(JSON.parse(JSON.stringify(val)));
      addFlag.value = false;
      context.emit("returnProcessList", processList.value);
    };

    const updateProcess = (val: any) => {
      processList.value[updateIndex.value] = JSON.parse(JSON.stringify(val));
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
        reference: "",
        other: "",
        pictures: [],
        processResources: [],
      };
      operateType.value = "add"
      addFlag.value = true;
    };

    const deleteClick = (index: number) => {
      processList.value.splice(index, 1);
      context.emit("returnProcessList", processList.value);
    };

    onMounted(() => {
      console.log(props.initProcessList);
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
    };
  },
});
</script>

<style lang="scss" scoped>
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