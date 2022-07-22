<template>
  <el-scrollbar height="400px">
  <h3>基础信息</h3>
  <el-form ref="ruleFormRef" :model="ModelBaseInfoForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="模型名称">
      <el-input v-model="ModelBaseInfoForm.name" placeholder="详细说明该模型的名称"/>
    </el-form-item>
    <el-form-item label="模型内容">
      <el-input v-model="ModelBaseInfoForm.content" type="textarea" placeholder="详细说明该模型的基本原理" />
    </el-form-item>
    <el-form-item label="模型描述">
      <el-input v-model="ModelBaseInfoForm.description" type="textarea" placeholder="详细说明该模型的用途"/>
    </el-form-item>
    <el-form-item label="模型类型">
      <el-input v-model="ModelBaseInfoForm.type" placeholder="exe/算法/公式/模块/工具"/>
    </el-form-item>
    <el-form-item label="模型存储位置">
      <el-input v-model="ModelBaseInfoForm.storage" placeholder="详细说明获取该模型的原始路径"/>
    </el-form-item>
    <el-form-item label="模型版本">
      <el-input v-model="ModelBaseInfoForm.version" placeholder="模型的版本信息"/>
    </el-form-item>
    <el-form-item label="编程语言">
      <el-input v-model="ModelBaseInfoForm.language" placeholder="例如：Fortran77, Fortran90, C, C++, Python, Java, IDL, Matlab等" />
    </el-form-item>
    <el-form-item label="其他">
      <el-input v-model="ModelBaseInfoForm.other" type="textarea" placeholder="补充内容" />
    </el-form-item>
  </el-form>
    <h3>元数据信息</h3>
  <el-form ref="ruleFormRef" :model="ModelMetaDataForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="模型假设">
      <el-input v-model="ModelMetaDataForm.hypothesis" placeholder="执行模型所需的假设"/>
    </el-form-item>
    <el-form-item label="算法/等式">
      <el-input v-model="ModelMetaDataForm.algorithm" />
    </el-form-item>
    <el-form-item label="输入信息" >
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.modelInputs"
        :key="index"
        closable
        @close="inputClose(index)"
        @click="inputClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag='addinput'" />
    </el-form-item>
    <el-form-item label="输出信息" >
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.modelOutputs"
        :key="index"
        closable
        @close="outputClose(index)"
        @click="outputClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag='addoutput'" />
    </el-form-item>
    <el-form-item label="参数信息" >
      <el-tag
        type="success"
        v-for="(item, index) in ModelMetaDataForm.parameters"
        :key="index"
        closable
        @close="paramClose(index)"
        @click="paramClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag='addparam'" />
    </el-form-item>
    <el-form-item label="迭代次数">
      <el-input v-model="ModelMetaDataForm.iterate" placeholder="说明该模型所需的软件" />
    </el-form-item>
    <el-form-item label="软件需求">
      <el-input v-model="ModelMetaDataForm.demand" placeholder="说明该模型所需的软件"/>
    </el-form-item>
    <el-form-item label="软件版本">
      <el-input v-model="ModelMetaDataForm.version" placeholder="需要说明该模型所需的软件版本"/>
    </el-form-item>
    <el-form-item label="软件必要性">
      <el-select v-model="ModelMetaDataForm.necessity" placeholder="是或否">
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
      </el-select>
    </el-form-item>
  </el-form>
    <h3>出处信息</h3>
  <el-form ref="ruleFormRef" :model="ModelSourceForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="参考文献">
        <el-tag
          v-for="tag in ModelSourceForm.references"
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
    <el-form-item label="出版机构">
      <el-input v-model="ModelSourceForm.publication" />
    </el-form-item>
    <el-form-item label="发展机构">
      <el-input v-model="ModelSourceForm.develop" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="modeloperateType==='add'" @click="submitForm">提交</el-button>
      <el-button type="primary" v-else @click="submitUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</el-scrollbar>
    <el-dialog v-model="add" width="400px" title="信息添加">
      <el-form :model="inputForm" label-width="100px">
        <el-form-item label="输入名称">
          <el-input v-model="inputForm.name" />
        </el-form-item>
        <el-form-item label="输入单位">
          <el-input v-model="inputForm.unit">
          </el-input>
        </el-form-item>
        <el-form-item label="输入描述">
          <el-input v-model="inputForm.description" />
        </el-form-item>
        <el-form-item label="输入默认值">
          <el-input v-model="inputForm.defaultValue" />
        </el-form-item>
        <el-form-item label="输入格式">
          <el-input v-model="inputForm.format" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="Flag==='addinput'">
          <el-button type="primary" @click="addInputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateinput'">
          <el-button type="success" @click="updateInputClick">修改</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='addoutput'">
          <el-button type="primary" @click="addOutputClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateoutput'">
          <el-button type="success" @click="updateOutputClick">修改</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='addparam'">
          <el-button type="primary" @click="addParamClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else-if="Flag==='updateparam'">
          <el-button type="success" @click="updateParamClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick} from "vue";
import type { FormInstance, ElInput } from 'element-plus'
import { notice } from "@/utils/notice";
import router from "@/router";
import { saveModelResources } from "@/api/request";
import { updateModelResources } from "@/api/request";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    modelItem: {
      type: Object,
    },
    modeloperateType: {
      type: String,
    },
  },
  emits: ["returnModel","updateModel"],
  setup(props,context) {
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const add = ref(false);
    const inputUpdateFlag = ref(false);
    const inputIndex = ref(-1);
    const outputUpdateFlag = ref(false);
    const outputIndex = ref(-1);
    const paramUpdateFlag = ref(false);
    const paramIndex = ref(-1);
    const Flag = ref("");
    const modelResource = reactive({
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
    })
    const uuid = require('uuid')
    const ModelBaseInfoForm = reactive({
      name: "",
      content: "",
      description: "",
      type: "",
      storage: "",
      version: "",
      language: "",
      other: ""
    });
    const ModelMetaDataForm = reactive({
      modelInputs:[] as any[],
      modelOutputs:[] as any[],
      parameters: [] as any[],
      hypothesis: "",
      algorithm: "",
      iterate: "",
      version: "",
      necessity: "",
      demand: ""
    });
    const ModelSourceForm = reactive({
      references: [] as any[],
      publication: "",
      develop: ""
    });
    const handleClose = (tag: string) => {
      ModelSourceForm.references.splice(ModelSourceForm.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        ModelSourceForm.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    const inputForm = reactive({
      name: "",
      unit: "",
      description: "",
      defaultValue:"",
      format:"",
    });
    const addInputClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelInputs.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateInputClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelInputs[inputIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const addOutputClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelOutputs.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateOutputClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.modelOutputs[outputIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const addParamClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.parameters.push(temp);
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    const updateParamClick = () => {
      const temp = {
        name: inputForm.name,
        unit: inputForm.unit,
        description: inputForm.description,
        defaultValue: inputForm.defaultValue,
        format: inputForm.format
      };
      ModelMetaDataForm.parameters[paramIndex.value] = temp;
      inputForm.name = "";
      inputForm.unit = "";
      inputForm.description = "";
      inputForm.defaultValue = "";
      inputForm.format = "";
      add.value = false;
    };
    
    const inputClose = (index: number) => {
      ModelMetaDataForm.modelInputs.splice(index, 1);
    };
    const inputClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.modelInputs[index].name;
      inputForm.unit = ModelMetaDataForm.modelInputs[index].unit;
      inputForm.description = ModelMetaDataForm.modelInputs[index].description;
      inputForm.defaultValue = ModelMetaDataForm.modelInputs[index].defaultValue;
      inputForm.format = ModelMetaDataForm.modelInputs[index].format;
      inputUpdateFlag.value = true;
      Flag.value = "updateinput";
      inputIndex.value = index;
      add.value = true;
    };
    const outputClose = (index: number) => {
      ModelMetaDataForm.modelOutputs.splice(index, 1);
    };
    const outputClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.modelOutputs[index].name;
      inputForm.unit = ModelMetaDataForm.modelOutputs[index].unit;
      inputForm.description = ModelMetaDataForm.modelOutputs[index].description;
      inputForm.defaultValue = ModelMetaDataForm.modelOutputs[index].defaultValue;
      inputForm.format = ModelMetaDataForm.modelOutputs[index].format;
      Flag.value = "updateoutput";
      outputIndex.value = index;
      add.value = true;
    };
    const paramClose = (index: number) => {
      ModelMetaDataForm.parameters.splice(index, 1);
    };
    const paramClick = (index: number) => {
      inputForm.name = ModelMetaDataForm.parameters[index].name;
      inputForm.unit = ModelMetaDataForm.parameters[index].unit;
      inputForm.description = ModelMetaDataForm.parameters[index].description;
      inputForm.defaultValue = ModelMetaDataForm.parameters[index].defaultValue;
      inputForm.format = ModelMetaDataForm.parameters[index].format;
      Flag.value = "updateparam";
      paramIndex.value = index;
      add.value = true;
    };
    const submitForm = async () => {
      modelResource.modelBaseInfo.name = ModelBaseInfoForm.name
      modelResource.modelBaseInfo.content = ModelBaseInfoForm.content
      modelResource.modelBaseInfo.description = ModelBaseInfoForm.description
      modelResource.modelBaseInfo.type = ModelBaseInfoForm.type
      modelResource.modelBaseInfo.storage = ModelBaseInfoForm.storage
      modelResource.modelBaseInfo.version = ModelBaseInfoForm.version
      modelResource.modelBaseInfo.language = ModelBaseInfoForm.language
      modelResource.modelBaseInfo.other = ModelBaseInfoForm.other

      modelResource.modelMetaData.hypothesis = ModelMetaDataForm.hypothesis
      modelResource.modelMetaData.algorithm = ModelMetaDataForm.algorithm
      modelResource.modelMetaData.parameters = ModelMetaDataForm.parameters
      modelResource.modelMetaData.iterate = ModelMetaDataForm.iterate
      modelResource.modelMetaData.version = ModelMetaDataForm.version
      modelResource.modelMetaData.version = ModelMetaDataForm.version
      modelResource.modelMetaData.necessity = ModelMetaDataForm.necessity
      modelResource.modelMetaData.modelInputs = ModelMetaDataForm.modelInputs
      modelResource.modelMetaData.modelOutputs = ModelMetaDataForm.modelOutputs
      modelResource.modelMetaData.demand = ModelMetaDataForm.demand

      modelResource.modelSource.references = ModelSourceForm.references
      modelResource.modelSource.publication = ModelSourceForm.publication
      modelResource.modelSource.develop = ModelSourceForm.develop
      
      modelResource.modelId = uuid.v4()
      const data = await saveModelResources(
        (router.currentRoute.value.params.apply as any).id,
        modelResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
        context.emit("returnModel", modelResource);
      }
    }
    const submitUpdate = async () => {
      modelResource.modelBaseInfo.name = ModelBaseInfoForm.name
      modelResource.modelBaseInfo.content = ModelBaseInfoForm.content
      modelResource.modelBaseInfo.description = ModelBaseInfoForm.description
      modelResource.modelBaseInfo.type = ModelBaseInfoForm.type
      modelResource.modelBaseInfo.storage = ModelBaseInfoForm.storage
      modelResource.modelBaseInfo.version = ModelBaseInfoForm.version
      modelResource.modelBaseInfo.language = ModelBaseInfoForm.language
      modelResource.modelBaseInfo.other = ModelBaseInfoForm.other

      modelResource.modelMetaData.hypothesis = ModelMetaDataForm.hypothesis
      modelResource.modelMetaData.algorithm = ModelMetaDataForm.algorithm
      modelResource.modelMetaData.parameters = ModelMetaDataForm.parameters
      modelResource.modelMetaData.iterate = ModelMetaDataForm.iterate
      modelResource.modelMetaData.version = ModelMetaDataForm.version
      modelResource.modelMetaData.version = ModelMetaDataForm.version
      modelResource.modelMetaData.necessity = ModelMetaDataForm.necessity
      modelResource.modelMetaData.modelInputs = ModelMetaDataForm.modelInputs
      modelResource.modelMetaData.modelOutputs = ModelMetaDataForm.modelOutputs
      modelResource.modelMetaData.demand = ModelMetaDataForm.demand
      
      modelResource.modelSource.references = ModelSourceForm.references
      modelResource.modelSource.publication = ModelSourceForm.publication
      modelResource.modelSource.develop = ModelSourceForm.develop
      modelResource.modelId = (props.modelItem as any).modelId
      console.log(modelResource)
      const data = await updateModelResources(
        (router.currentRoute.value.params.apply as any).id,
        modelResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
        context.emit("updateModel", modelResource);
      }
    }
    onMounted(() => {
      if((props.modelItem as any) !='{}')
      {
        ModelBaseInfoForm.name = (props.modelItem as any).modelBaseInfo.name,
        ModelBaseInfoForm.content = (props.modelItem as any).modelBaseInfo.content,
        ModelBaseInfoForm.description = (props.modelItem as any).modelBaseInfo.description,
        ModelBaseInfoForm.type = (props.modelItem as any).modelBaseInfo.type,
        ModelBaseInfoForm.storage = (props.modelItem as any).modelBaseInfo.storage,
        ModelBaseInfoForm.version = (props.modelItem as any).modelBaseInfo.version,
        ModelBaseInfoForm.language = (props.modelItem as any).modelBaseInfo.language,
        ModelBaseInfoForm.other = (props.modelItem as any).modelBaseInfo.other,

        ModelMetaDataForm.hypothesis = (props.modelItem as any).modelMetaData.hypothesis,
        ModelMetaDataForm.algorithm = (props.modelItem as any).modelMetaData.algorithm,
        ModelMetaDataForm.iterate = (props.modelItem as any).modelMetaData.iterate,
        ModelMetaDataForm.version = (props.modelItem as any).modelMetaData.version,
        ModelMetaDataForm.necessity = (props.modelItem as any).modelMetaData.necessity,
        ModelMetaDataForm.demand = (props.modelItem as any).modelMetaData.demand,
        ModelMetaDataForm.modelInputs = (props.modelItem as any).modelMetaData.modelInputs,
        ModelMetaDataForm.modelOutputs = (props.modelItem as any).modelMetaData.modelOutputs,
        ModelMetaDataForm.parameters = (props.modelItem as any).modelMetaData.parameters,

        ModelSourceForm.references = (props.modelItem as any).modelSource.references,
        ModelSourceForm.publication = (props.modelItem as any).modelSource.publication,
        ModelSourceForm.develop = (props.modelItem as any).modelSource.develop
    }
    })
    
    return {
      Plus,
      inputClose,
      inputClick,
      outputClose,
      outputClick,
      paramClose,
      paramClick,
      ModelBaseInfoForm,
      ModelMetaDataForm,
      ModelSourceForm,
      submitForm,
      submitUpdate,
      modelResource,
      uuid,
      inputForm,
      add,
      inputUpdateFlag,
      inputIndex,
      outputUpdateFlag,
      outputIndex,
      paramUpdateFlag,
      paramIndex,
      addInputClick,
      updateInputClick,
      addOutputClick,
      updateOutputClick,
      addParamClick,
      updateParamClick,
      Flag,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm
    }

  }

});
</script>
