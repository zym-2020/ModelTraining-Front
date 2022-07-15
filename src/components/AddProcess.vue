<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="步骤名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="步骤类型">
        <el-select v-model="form.stepType" placeholder="请选择步骤类型">
          <el-option label="数据预处理" value="数据预处理" />
          <el-option label="模拟分析" value="模拟分析" />
          <el-option label="数据后处理" value="数据后处理" />
          <el-option label="敏感性分析" value="敏感性分析" />
          <el-option label="可视化" value="可视化" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="form.operateType" placeholder="请选择操作类型">
          <el-option label="软件操作" value="软件操作" />
          <el-option label="等式计算" value="等式计算" />
          <el-option label="程序运行" value="程序运行" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加资源">
        <el-tag
          type="warning"
          v-for="(item, index) in form.processResources"
          :key="index"
          closable
          @close="resourceClose(index)"
          @click="rousourceClick(index)"
          >{{ item.name }}</el-tag
        >
        <el-button type="primary" :icon="Plus" @click="addResource = true" />
      </el-form-item>
      <el-form-item label="步骤描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          resize="none"
        />
      </el-form-item>
      <el-form-item label="添加图片">
        <picture-upload
          :pictureList="pictureList"
          @returnPictureList="handlePictures"
        ></picture-upload>
      </el-form-item>
      <el-form-item label="参考文献">
        <el-input v-model="form.reference" />
      </el-form-item>
      <el-form-item label="其他补充">
        <el-input v-model="form.other" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button
        type="primary"
        plain
        @click="addProcessClick"
        v-if="type === 'add'"
        >确定</el-button
      >
      <el-button type="primary" plain @click="updateProcessClick" v-else
        >修改</el-button
      >
    </div>
  </div>
  <el-dialog v-model="addResource" width="400px" title="添加资源">
    <el-form :model="resource" label-width="100px">
      <el-form-item label="资源名称">
        <el-input v-model="resource.name" />
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select
          v-model="resource.type"
          placeholder="请选择资源类型"
          @change="resourceTypeChange"
        >
          <el-option label="数据资源" value="data" />
          <el-option label="模型资源" value="model" />
        </el-select>
      </el-form-item>
      <el-form-item label="模型输入" v-if="resource.type === 'model'">
        <el-tag
          type="success"
          v-for="(item, index) in resource.modelInputs"
          :key="index"
          closable
          @close="inputClose(index)"
          @click="inputClick(index)"
          >{{ item.name }}</el-tag
        >
        <el-button type="success" :icon="Plus" @click="addInput = true" />
      </el-form-item>
      <el-form-item label="模型输出" v-if="resource.type === 'model'">
        <el-tag
          type="danger"
          v-for="(item, index) in resource.modelOutputs"
          :key="index"
          closable
          @close="outputClose(index)"
          @click="outputClick(index)"
          >{{ item.name }}</el-tag
        >
        <el-button type="success" :icon="Plus" @click="addOutput = true" />
      </el-form-item>
      <el-form-item label="数据描述" v-if="resource.type === 'data'">
        <el-input v-model="resource.dataInfo" />
      </el-form-item>
      <el-form-item label="模型描述" v-if="resource.type === 'model'">
        <el-input v-model="resource.modelInfo" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="!resourceUpdateFlag">
        <el-button type="primary" @click="addResourceClick">确定</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button type="success" @click="updateResourceClick">修改</el-button>
      </span>
    </template>
    <el-dialog v-model="addInput" width="400px" title="模型输入">
      <el-form :model="inputForm" label-width="100px">
        <el-form-item label="输入名称">
          <el-input v-model="inputForm.name" />
        </el-form-item>
        <el-form-item label="输入类型">
          <el-select v-model="inputForm.dataType" placeholder="请选择数据类型">
            <el-option label="参数" value="parameter" />
            <el-option label="数据" value="data" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入描述">
          <el-input v-model="inputForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!inputUpdateFlag">
          <el-button type="primary" @click="addInputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else>
          <el-button type="success" @click="updateInputClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="addOutput" width="400px" title="模型输入">
      <el-form :model="outputForm" label-width="100px">
        <el-form-item label="输出名称">
          <el-input v-model="outputForm.name" />
        </el-form-item>
        <el-form-item label="输出格式">
          <el-input v-model="outputForm.format" />
        </el-form-item>
        <el-form-item label="输入描述">
          <el-input v-model="outputForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!outputUpdateFlag">
          <el-button type="primary" @click="addOutputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else>
          <el-button type="success" @click="updateOutputClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import PictureUpload from "./PictureUpload.vue";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  components: { PictureUpload },
  props: {
    processItem: {
      type: Object,
    },
    operateType: {
      type: String,
    },
  },
  emits: ["returnProcess", "updateProcess"],
  setup(props, context) {
    const addResource = ref(false);
    const addInput = ref(false);
    const addOutput = ref(false);
    const resourceUpdateFlag = ref(false);
    const resourceIndex = ref(-1);
    const inputUpdateFlag = ref(false);
    const inputIndex = ref(-1);
    const outputUpdateFlag = ref(false);
    const outputIndex = ref(-1);
    const type = computed(() => {
      return props.operateType;
    });
    const pictureList = ref<any[]>((props.processItem as any).pictures);
    const form = reactive({
      name: (props.processItem as any).name,
      stepType: (props.processItem as any).stepType,
      operateType: (props.processItem as any).operateType,
      description: (props.processItem as any).description,
      reference: (props.processItem as any).reference,
      other: (props.processItem as any).other,
      pictures: (props.processItem as any).pictures,
      processResources: (props.processItem as any).processResources,
    });

    const resource = reactive({
      name: "",
      type: "",
      dataInfo: "",
      modelInfo: "",
      modelInputs: [] as any[],
      modelOutputs: [] as any[],
    });

    const inputForm = reactive({
      name: "",
      dataType: "",
      description: "",
    });

    const outputForm = reactive({
      name: "",
      format: "",
      description: "",
    });

    const addInputClick = () => {
      const temp = {
        name: inputForm.name,
        dataType: inputForm.dataType,
        description: inputForm.description,
      };
      resource.modelInputs.push(temp);
      inputForm.name = "";
      inputForm.dataType = "";
      inputForm.description = "";
      addInput.value = false;
    };
    const updateInputClick = () => {
      const temp = {
        name: inputForm.name,
        dataType: inputForm.dataType,
        description: inputForm.description,
      };
      resource.modelInputs[inputIndex.value] = temp;
    };

    const addOutputClick = () => {
      const temp = {
        name: outputForm.name,
        format: outputForm.format,
        description: outputForm.description,
      };
      resource.modelOutputs.push(temp);
      outputForm.name = "";
      outputForm.format = "";
      outputForm.description = "";
      addOutput.value = false;
    };
    const updateOutputClick = () => {
      const temp = {
        name: outputForm.name,
        format: outputForm.format,
        description: outputForm.description,
      };
      resource.modelOutputs[outputIndex.value] = temp;
    };

    const inputClose = (index: number) => {
      resource.modelInputs.splice(index, 1);
    };
    const inputClick = (index: number) => {
      inputForm.name = resource.modelInputs[index].name;
      inputForm.dataType = resource.modelInputs[index].dataType;
      inputForm.description = resource.modelInputs[index].description;
      inputUpdateFlag.value = true;
      inputIndex.value = index;
      addInput.value = true;
    };

    const outputClose = (index: number) => {
      resource.modelOutputs.splice(index, 1);
    };
    const outputClick = (index: number) => {
      outputForm.name = resource.modelOutputs[index].name;
      outputForm.format = resource.modelOutputs[index].format;
      outputForm.description = resource.modelOutputs[index].description;
      outputUpdateFlag.value = true;
      outputIndex.value = index;
      addOutput.value = true;
    };

    const addResourceClick = () => {
      form.processResources.push(JSON.parse(JSON.stringify(resource)));
      addResource.value = false;
    };
    const updateResourceClick = () => {
      form.processResources[resourceIndex.value] = JSON.parse(
        JSON.stringify(resource)
      );
      addResource.value = false;
    };

    const resourceClose = (index: number) => {
      form.processResources.splice(index, 1);
    };

    const rousourceClick = (index: number) => {
      resource.name = form.processResources[index].name;
      resource.type = form.processResources[index].type;
      resource.dataInfo = form.processResources[index].dataInfo;
      resource.modelInfo = form.processResources[index].modelInfo;
      resource.modelInputs = form.processResources[index].modelInputs;
      resource.modelOutputs = form.processResources[index].modelOutputs;
      addResource.value = true;
      resourceUpdateFlag.value = true;
      resourceIndex.value = index;
    };

    const addProcessClick = () => {
      context.emit("returnProcess", form);
    };
    const updateProcessClick = () => {
      context.emit("updateProcess", form);
    };

    const handlePictures = (val: any[]) => {
      form.pictures = [];
      val.forEach((item) => {
        form.pictures.push(item.name);
      });
    };

    const resourceTypeChange = (val: string) => {
      if (val === "data") {
        (resource.modelInfo = ""),
          (resource.modelInputs = []),
          (resource.modelOutputs = []);
      } else {
        resource.dataInfo = "";
      }
    };

    return {
      form,
      Plus,
      resource,
      addResource,
      addInput,
      addOutput,
      inputForm,
      outputForm,
      addInputClick,
      addOutputClick,
      inputClose,
      outputClose,
      addResourceClick,
      resourceClose,
      rousourceClick,
      addProcessClick,
      updateProcessClick,
      handlePictures,
      pictureList,
      resourceUpdateFlag,
      updateResourceClick,
      inputClick,
      inputUpdateFlag,
      updateInputClick,
      outputClick,
      outputUpdateFlag,
      updateOutputClick,
      resourceTypeChange,
      type,
    };
  },
});
</script>

<style lang="scss">
.el-tag {
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}
.btn {
  text-align: center;
}
</style>