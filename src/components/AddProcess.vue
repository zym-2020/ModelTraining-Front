<template>
  <div>
    <el-form :model="form" label-width="100px" :rules="rules">
      <el-form-item label="步骤名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="步骤类型" prop="stepType" v-if="processType === 'method'">
        <el-select v-model="form.stepType" placeholder="请选择步骤类型" filterable allow-create>
          <el-option label="数据预处理" value="数据预处理" />
          <el-option label="模拟分析" value="模拟分析" />
          <el-option label="数据后处理" value="数据后处理" />
          <el-option label="敏感性分析" value="敏感性分析" />
          <el-option label="可视化" value="可视化" />
          <el-option label="其他(请直接输入)" value=" " disabled/>
        </el-select>
      </el-form-item>
      <el-form-item label="步骤类型" prop="stepType" v-else>
        <el-select v-model="form.stepType" placeholder="请选择步骤类型" filterable allow-create >
          <el-option label="误差评估" value="误差评估" />
          <el-option label="误差分析" value="误差分析" />
          <el-option label="不确定性分析" value="不确定性分析" />
          <el-option label="收敛性分析" value="收敛性分析" />
          <el-option label="其他(请直接输入)" value=" " disabled />
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型" prop="operateType">
        <el-select v-model="form.operateType" placeholder="请选择操作类型" filterable allow-create>
          <el-option label="软件操作" value="软件操作" />
          <el-option label="等式计算" value="等式计算" />
          <el-option label="程序运行" value="程序运行" />
          <el-option label="其他(请直接输入)" value=" " disabled/>
        </el-select>
      </el-form-item>
      <h5>从已添加的“研究资源”中选择步骤中涉及的资源：</h5>
      <el-form-item label="模型资源">
        <el-tag
          type="warning"
          v-for="(item, index) in form.modelResources"
          :key="index"
          closable
          @close="ModelClose(index)"
          >{{ item.modelBaseInfo.name }}</el-tag>
        <el-button type="primary" :icon="Plus" @click="addModel = true" />
      </el-form-item>
        <el-form-item label="数据资源" >
        <el-tag
          type="warning"
          v-for="(item, index) in form.dataResources"
          :key="index"
          closable
          @close="DataClose(index)"
          >{{ item.dataBaseInfo.name }}</el-tag>
        <el-button type="primary" :icon="Plus" @click="addData= true" />
      </el-form-item>
      <el-form-item label="步骤描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
      <el-form-item label="添加图片">
        <picture-upload
          :pictureList="pictureList"
          @returnPictureList="handlePictures"
        ></picture-upload>
      </el-form-item>
    <el-form-item label="参考文献">
        <el-tag
          v-for="tag in form.references"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{tag.length>33?tag.substring(0,22)+'......'+tag.substring(tag.length-10,tag.length):tag}}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
          + 添加参考文献
        </el-button>
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
  <el-dialog v-model="addModel" width="400px" title="添加模型资源">
      <el-table
          ref="modelmultipleTableRef"
          :data="Modeltemp"
          style="width: 100%"
          @selection-change="modelSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column align='center' prop="modelBaseInfo.name" label="模型资源名称" show-overflow-tooltip/>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="modeltoggleSelection">清空选择</el-button>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addModelClick">选择</el-button>
      </span>
    </template>
  </el-dialog>
    <el-dialog v-model="addData" width="400px" title="添加数据资源">
      <el-table
          ref="datamultipleTableRef"
          :data="Datatemp"
          style="width: 100%"
          @selection-change="dataSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column align='center' prop="dataBaseInfo.name" label="数据资源名称" show-overflow-tooltip/>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="datatoggleSelection">清空选择</el-button>
        </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addDataClick">选择</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import PictureUpload from "./PictureUpload.vue";
import { Plus } from "@element-plus/icons-vue";
import type {  FormRules, ElTable, ElInput } from 'element-plus'

export default defineComponent({
  components: { PictureUpload },
  props: {
    processItem: {
      type: Object,
    },
    operateType: {
      type: String,
    },
    Modeltemp: {
      type: Object,
    },
    Datatemp: {
      type: Object,
    },
    processType: {
      type: String,
    },
  },
  emits: ["returnProcess", "updateProcess"],
  setup(props, context) {
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const addModel= ref(false);
    const modelSelections  = ref<any[]>()
    const addData= ref(false);
    const dataSelections  = ref<any[]>()
    const type = computed(() => {
      return props.operateType;
    });
    const processType = computed(() => {
      return props.processType;
    });
    const modelSelectionChange = (val: any) =>{
        modelSelections.value=val
    }
    const dataSelectionChange = (val: any) =>{
        dataSelections.value=val
    }
    const modelmultipleTableRef = ref<InstanceType<typeof ElTable>>()
    const datamultipleTableRef = ref<InstanceType<typeof ElTable>>()
    const modeltoggleSelection = () => {
      modelmultipleTableRef.value!.clearSelection()
    }

    const datatoggleSelection = () => {
      datamultipleTableRef.value!.clearSelection()
    }

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入步骤名称', trigger: 'change' }
      ],
      stepType: [
        { required: true, message: '请选择步骤类型', trigger: 'change' }
      ],
      operateType: [
        { required: true, message: '请选择操作类型', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入步骤描述', trigger: 'change' }
      ],
      })

    const pictureList = ref<any[]>((props.processItem as any).pictures);
    const form = reactive({
      name: (props.processItem as any).name,
      stepType: (props.processItem as any).stepType,
      operateType: (props.processItem as any).operateType,
      description: (props.processItem as any).description,
      references: [] as any[],
      other: (props.processItem as any).other,
      pictures: (props.processItem as any).pictures,
      modelResources:(props.processItem as any).modelResources,
      dataResources:(props.processItem as any).dataResources
    });
    const handleClose = (tag: string) => {
      form.references.splice(form.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        form.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    const addModelClick = () => {
      form.modelResources=modelSelections.value
      addModel.value = false;
    };
    const addDataClick = () => {
      form.dataResources=dataSelections.value
      addData.value = false;
    };

    const ModelClose = (index: number) => {
      form.modelResources.splice(index, 1);
    };
    const DataClose = (index: number) => {
      form.dataResources.splice(index, 1);
    };

/*     const ModelClick = (index: number) => {
      modelResources.modelInputs = form.modelResources[index].modelInputs;
      modelResources.modelOutputs = form.modelResources[index].modelOutputs;
      addModel.value = true;
      resourceIndex.value = index;
    }; */

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
    onMounted(()=>{
      if((props.processItem as any).references.length>0)
        form.references=(props.processItem as any).references
    })
    return {
      form,
      Plus,
      modelSelections,
      addModelClick,
      ModelClose,
      dataSelections,
      addDataClick,
      DataClose,
      addProcessClick,
      updateProcessClick,
      handlePictures,
      pictureList,
      type,
      rules,
      modeltoggleSelection,
      modelmultipleTableRef,
      datatoggleSelection,
      datamultipleTableRef,
      addModel,
      addData,
      modelSelectionChange,
      dataSelectionChange,
      processType,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm
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