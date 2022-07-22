<template>
  <el-scrollbar height="400px">
  <h3>基础信息</h3>
  <el-form ref="ruleFormRef" :model="DataBaseInfoForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="数据名称">
      <el-input v-model="DataBaseInfoForm.name" placeholder="详细说明该数据的名称"/>
    </el-form-item>
    <el-form-item label="存储位置">
      <el-input v-model="DataBaseInfoForm.location" placeholder="详细说明获取该数据的原始路径"/>
    </el-form-item>
    <el-form-item label="数据描述">
      <el-input v-model="DataBaseInfoForm.description" type="textarea" placeholder="详细说明该数据的内容和用途等"/>
    </el-form-item>
    <el-form-item label="数据格式">
      <el-input v-model="DataBaseInfoForm.format"  placeholder="例如：栅格数据、矢量数据" />
    </el-form-item>
    <el-form-item label="数据版本">
      <el-input v-model="DataBaseInfoForm.version" />
    </el-form-item>
    <el-form-item label="生产时间">
      <el-input v-model="DataBaseInfoForm.produceTime" />
    </el-form-item>
    <el-form-item label="更新时间">
      <el-input v-model="DataBaseInfoForm.updateTime" />
    </el-form-item>
    <el-form-item label="数据单位">
      <el-input v-model="DataBaseInfoForm.unit" />
    </el-form-item>
    <el-form-item label="小数位">
      <el-input v-model="DataBaseInfoForm.precision" />
    </el-form-item>
    <el-form-item label="时空尺度" >
      <el-tag
        type="success"
        v-for="(item, index) in DataBaseInfoForm.spacetimescales"
        :key="index"
        closable
        @close="STCClose(index)"
        @click="STCClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag=false" />
    </el-form-item>
        <el-form-item label="唯一标识符" >
      <el-input v-model="DataBaseInfoForm.identifier" placeholder="例如：DOI"/>
    </el-form-item>
  </el-form>
    <h3>活动信息</h3>
  <el-form ref="ruleFormRef" :model="DataActiveForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="数据处理步骤">
      <el-input v-model="DataActiveForm.handle" type="textarea" placeholder="说明该数据之前进行了哪些数据处理步骤"/>
    </el-form-item>
    <el-form-item label="数据转化步骤">
      <el-input v-model="DataActiveForm.conversion" type="textarea" placeholder="说明该数据之前进行了哪些数据转化步骤" />
    </el-form-item>
  </el-form>
    <h3>出处信息/代理属性</h3>
  <el-form ref="ruleFormRef" :model="DataSourceForm" status-icon label-width="120px" class="demo-ruleForm">
    <el-form-item label="参考文献">
        <el-tag
          v-for="tag in DataSourceForm.references"
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
    <el-form-item label="许可">
      <el-input v-model="DataSourceForm.license" />
    </el-form-item>
    <el-form-item label="出版机构">
      <el-input v-model="DataSourceForm.publish" />
    </el-form-item>
    <el-form-item label="发展机构">
      <el-input v-model="DataSourceForm.develop" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="dataoperateType==='add'" @click="submitForm">提交</el-button>
      <el-button type="primary" v-else @click="submitUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</el-scrollbar>
    <el-dialog v-model="add" width="400px" title="添加时空尺度">
      <el-form :model="inputForm" label-width="100px">
        <el-form-item label="输入名称">
          <el-input v-model="inputForm.name" />
        </el-form-item>
        <el-form-item label="输入类型">
          <el-input v-model="inputForm.type">
          </el-input>
        </el-form-item>
        <el-form-item label="输入范围">
          <el-input v-model="inputForm.scope" />
        </el-form-item>
        <el-form-item label="输入分辨率">
          <el-input v-model="inputForm.resolution" />
        </el-form-item>
        <el-form-item label="其他补充">
          <el-input v-model="inputForm.other" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!Flag">
          <el-button type="primary" @click="addSTCClick">确定</el-button>
        </span>
        <span class="dialog-footer" v-else>
          <el-button type="success" @click="updateSTCClick">修改</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, onMounted } from "vue";
import type { FormInstance, ElInput } from 'element-plus'
import { notice } from "@/utils/notice";
import router from "@/router";
import { saveDataResources } from "@/api/request";
import { updateDataResources } from "@/api/request";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    dataItem: {
      type: Object,
    },
    dataoperateType: {
      type: String,
    },
  },
  emits: ["returnData","updateData"],
  setup(props,context) {
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const add = ref(false);
    const Flag = ref(false);
    const STCIndex = ref(-1);
    const STCUpdateFlag = ref(false);
    const inputForm = reactive({
      name: "",
      type: "",
      scope: "",
      resolution:"",
      other:"",
    });
    const dataResource = reactive({
      dataId:'',
      dataBaseInfo: {
        name: '',
        location: '',
        description: '',
        format: '',
        version: '',
        produceTime: '',
        updateTime: '',
        unit: '',
        precision: '',
        spacetimescales: [] as any[],
        identifier: ''
      },
      dataActive: {
        handle:'',
        conversion:'',
      },
      dataSource: {
        publish:'',
        references:[] as any[],
        license:'',
        develop:''
      }
    })
    const handleClose = (tag: string) => {
      DataSourceForm.references.splice(DataSourceForm.references.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        DataSourceForm.references.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }
    const addSTCClick = () => {
      const temp = {
        name: inputForm.name,
        type: inputForm.type,
        scope: inputForm.scope,
        resolution: inputForm.resolution,
        other: inputForm.other
      };
      DataBaseInfoForm.spacetimescales.push(temp);
      inputForm.name = "";
      inputForm.type = "";
      inputForm.scope = "";
      inputForm.resolution = "";
      inputForm.other = "";
      add.value = false;
    };
    const updateSTCClick = () => {
      const temp = {
        name: inputForm.name,
        type: inputForm.type,
        scope: inputForm.scope,
        resolution: inputForm.resolution,
        other: inputForm.other
      };
      DataBaseInfoForm.spacetimescales[STCIndex.value] = temp;
      inputForm.name = "";
      inputForm.type = "";
      inputForm.scope = "";
      inputForm.resolution = "";
      inputForm.other = "";
      add.value = false;
    };
    const STCClose = (index: number) => {
      DataBaseInfoForm.spacetimescales.splice(index, 1);
    };
    const STCClick = (index: number) => {
      inputForm.name = DataBaseInfoForm.spacetimescales[index].name;
      inputForm.type = DataBaseInfoForm.spacetimescales[index].type;
      inputForm.scope = DataBaseInfoForm.spacetimescales[index].scope;
      inputForm.resolution = DataBaseInfoForm.spacetimescales[index].resolution;
      inputForm.other = DataBaseInfoForm.spacetimescales[index].other;
      STCUpdateFlag.value = true;
      Flag.value = true;
      STCIndex.value = index;
      add.value = true;
    };
    const uuid = require('uuid')
    const DataBaseInfoForm = reactive({
      name:'',
      location:'',
      description: '',
      format:'',
      version:'',
      produceTime: '',
      updateTime:'',
      unit:'',
      precision:'',
      spacetimescales: [] as any[],
      identifier: '',
    });
    const DataActiveForm = reactive({
      handle: '',
      conversion: '',
    });
    const DataSourceForm = reactive({
      publish:'',
      references:[] as any [],
      license:'',
      develop: '',
    });
    const submitForm = async () => {
      dataResource.dataBaseInfo.name = DataBaseInfoForm.name
      dataResource.dataBaseInfo.location = DataBaseInfoForm.location
      dataResource.dataBaseInfo.description = DataBaseInfoForm.description
      dataResource.dataBaseInfo.format = DataBaseInfoForm.format
      dataResource.dataBaseInfo.version = DataBaseInfoForm.version
      dataResource.dataBaseInfo.produceTime = DataBaseInfoForm.produceTime
      dataResource.dataBaseInfo.updateTime = DataBaseInfoForm.updateTime
      dataResource.dataBaseInfo.unit = DataBaseInfoForm.unit
      dataResource.dataBaseInfo.precision = DataBaseInfoForm.precision
      dataResource.dataBaseInfo.spacetimescales = DataBaseInfoForm.spacetimescales
      dataResource.dataBaseInfo.identifier = DataBaseInfoForm.identifier

      dataResource.dataActive.handle = DataActiveForm.handle
      dataResource.dataActive.conversion = DataActiveForm.conversion

      dataResource.dataSource.publish = DataSourceForm.publish
      dataResource.dataSource.references = DataSourceForm.references
      dataResource.dataSource.license = DataSourceForm.license
      dataResource.dataSource.develop = DataSourceForm.develop
      
      dataResource.dataId = uuid.v4()
      const data = await saveDataResources(
        (router.currentRoute.value.params.apply as any).id,
        dataResource
      );
      if (data != null && (data as any).code === 0) {
        context.emit("returnData", dataResource);
        notice("success", "成功", "保存成功！");
      }
    }
    const submitUpdate = async () => {
      dataResource.dataBaseInfo.name = DataBaseInfoForm.name
      dataResource.dataBaseInfo.location = DataBaseInfoForm.location
      dataResource.dataBaseInfo.description = DataBaseInfoForm.description
      dataResource.dataBaseInfo.format = DataBaseInfoForm.format
      dataResource.dataBaseInfo.version = DataBaseInfoForm.version
      dataResource.dataBaseInfo.produceTime = DataBaseInfoForm.produceTime
      dataResource.dataBaseInfo.updateTime = DataBaseInfoForm.updateTime
      dataResource.dataBaseInfo.unit = DataBaseInfoForm.unit
      dataResource.dataBaseInfo.precision = DataBaseInfoForm.precision
      dataResource.dataBaseInfo.spacetimescales = DataBaseInfoForm.spacetimescales
      dataResource.dataBaseInfo.identifier = DataBaseInfoForm.identifier

      dataResource.dataActive.handle = DataActiveForm.handle
      dataResource.dataActive.conversion = DataActiveForm.conversion

      dataResource.dataSource.publish = DataSourceForm.publish
      dataResource.dataSource.references = DataSourceForm.references
      dataResource.dataSource.license = DataSourceForm.license
      dataResource.dataSource.develop = DataSourceForm.develop
      dataResource.dataId = (props.dataItem as any).dataId
      const data = await updateDataResources(
        (router.currentRoute.value.params.apply as any).id,
        dataResource
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
        context.emit("updateData", dataResource);
      }
    }

    onMounted(() => {
      if((props.dataItem as any) !='{}')
      {
      DataBaseInfoForm.name=(props.dataItem as any).dataBaseInfo.name,
      DataBaseInfoForm.location= (props.dataItem as any).dataBaseInfo.location,
      DataBaseInfoForm.description= (props.dataItem as any).dataBaseInfo.description,
      DataBaseInfoForm.format= (props.dataItem as any).dataBaseInfo.format,
      DataBaseInfoForm.version=(props.dataItem as any).dataBaseInfo.version,
      DataBaseInfoForm.produceTime= (props.dataItem as any).dataBaseInfo.produceTime,
      DataBaseInfoForm.updateTime=(props.dataItem as any).dataBaseInfo.updateTime,
      DataBaseInfoForm.unit= (props.dataItem as any).dataBaseInfo.unit,
      DataBaseInfoForm.precision= (props.dataItem as any).dataBaseInfo.precision,
      DataBaseInfoForm.spacetimescales=(props.dataItem as any).dataBaseInfo.spacetimescales,
      DataActiveForm.handle= (props.dataItem as any).dataActive.handle,
      DataActiveForm.conversion= (props.dataItem as any).dataActive.conversion,
      DataSourceForm.publish= (props.dataItem as any).dataSource.publish,
      DataSourceForm.references=(props.dataItem as any).dataSource.references,
      DataSourceForm.develop= (props.dataItem as any).dataSource.develop,
      DataSourceForm.license= (props.dataItem as any).dataSource.license
    }
    })
    
    return {
      DataBaseInfoForm,
      DataActiveForm,
      DataSourceForm,
      submitForm,
      submitUpdate,
      dataResource,
      uuid,
      add,
      Flag,
      STCIndex,
      STCUpdateFlag,
      inputForm,
      addSTCClick,
      updateSTCClick,
      STCClose,
      STCClick,
      Plus,
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,

    }

  }

});
</script>
