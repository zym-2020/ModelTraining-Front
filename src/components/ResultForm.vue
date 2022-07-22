<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="resultForm" :rules="rules">
      <el-form-item label="结果名称" prop="name">
        <el-input v-model="resultForm.name" @change="changeHandle" placeholder="详细说明该数据的名称"/>
      </el-form-item>
      <el-form-item label="结果描述" prop="description">
        <el-input v-model="resultForm.description" @change="changeHandle" type="textarea"/>
      </el-form-item>
      <el-form-item label="结果位置" prop="location">
        <el-input v-model="resultForm.location" @change="changeHandle" placeholder="详细说明获取该数据的原始路径"/>
      </el-form-item>
      <el-form-item label="结果格式" prop="format">
        <el-input v-model="resultForm.format" @change="changeHandle" placeholder="例如：栅格数据、矢量数据"/>
      </el-form-item>
      <el-form-item label="结果版本" prop="version">
        <el-input v-model="resultForm.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="生产时间" prop="time">
        <el-input v-model="resultForm.time" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="resultForm.updateTime" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据单位" prop="nuit">
        <el-input v-model="resultForm.unit" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="小数位" prop="precision">
        <el-input v-model="resultForm.precision" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="唯一标识符" prop="identifier">
        <el-input v-model="resultForm.identifier" @change="changeHandle" />
      </el-form-item>
    <el-form-item label="时空尺度" >
      <el-tag
        type="success"
        v-for="(item, index) in resultForm.spacetimescales"
        :key="index"
        closable
        @close="STCClose(index)"
        @click="STCClick(index)"
        >{{ item.name }}</el-tag
      >
      <el-button type="success" :icon="Plus" @click="add = true;Flag=false" />
    </el-form-item>

    </el-form>
    <picture-upload
      :pictureList="resultForm.pictures"
      @returnPictureList="returnPictureList"
    ></picture-upload>
  </div>
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
import { defineComponent, onMounted, reactive, ref } from "vue";
import PictureUpload from "./PictureUpload.vue";
import type {  FormRules } from 'element-plus'
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  components: { PictureUpload },
  props: {
    resultFormValue: {
      type: Object,
    },
  },
  emits: ["returnResultFormValue"],
  setup(props, context) {
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
    const resultForm = reactive({
      name: (props.resultFormValue as any).name,
      description: (props.resultFormValue as any).description,
      location: (props.resultFormValue as any).location,
      format: (props.resultFormValue as any).format,
      version: (props.resultFormValue as any).version,
      time: (props.resultFormValue as any).time,
      updateTime: (props.resultFormValue as any).updateTime,
      unit: (props.resultFormValue as any).unit,
      precision: (props.resultFormValue as any).precision,
      spacetimescales:[] as any [],
      identifier: (props.resultFormValue as any).identifier,
      visualization: (props.resultFormValue as any).visualization,
      dataHandle: (props.resultFormValue as any).dataHandle,
      dataTransformation: (props.resultFormValue as any).dataTransformation,
      pictures: (props.resultFormValue as any).pictures,
    });
    const addSTCClick = () => {
      const temp = {
        name: inputForm.name,
        type: inputForm.type,
        scope: inputForm.scope,
        resolution: inputForm.resolution,
        other: inputForm.other
      };
      resultForm.spacetimescales.push(temp);
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
      resultForm.spacetimescales[STCIndex.value] = temp;
      inputForm.name = "";
      inputForm.type = "";
      inputForm.scope = "";
      inputForm.resolution = "";
      inputForm.other = "";
      add.value = false;
    };
    const STCClose = (index: number) => {
      resultForm.spacetimescales.splice(index, 1);
    };
    const STCClick = (index: number) => {
      inputForm.name = resultForm.spacetimescales[index].name;
      inputForm.type = resultForm.spacetimescales[index].type;
      inputForm.scope = resultForm.spacetimescales[index].scope;
      inputForm.resolution = resultForm.spacetimescales[index].resolution;
      inputForm.other = resultForm.spacetimescales[index].other;
      STCUpdateFlag.value = true;
      Flag.value = true;
      STCIndex.value = index;
      add.value = true;
    };
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入结果名称', trigger: 'change' }
      ],
      description: [
        { required: true, message: '请输入结构描述', trigger: 'change' }
      ],
      format: [
        { required: true, message: '请输入结构格式', trigger: 'change' }
      ],
      time: [
        { required: true, message: '请输入生产时间', trigger: 'change' }
      ]
      })
    const changeHandle = () => {
      context.emit("returnResultFormValue", resultForm);
    };

    const returnPictureList = (val: any[]) => {
      resultForm.pictures = [];
      val.forEach((item) => {
        resultForm.pictures.push(item.name);
      });
    };
    onMounted(() => {
        resultForm.spacetimescales=(props.resultFormValue as any).spacetimescales
    })

    return {
      resultForm,
      changeHandle,
      returnPictureList,
      rules,
      add,
      Flag,
      STCIndex,
      STCUpdateFlag,
      inputForm,
      addSTCClick,
      updateSTCClick,
      STCClose,
      STCClick,
      Plus
    };
  },
});
</script>

<style lang="scss" scoped>
</style>