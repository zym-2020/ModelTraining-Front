<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="resultForm">
      <el-form-item label="结果名称">
        <el-input v-model="resultForm.name" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="结果描述">
        <el-input v-model="resultForm.description" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="结果位置">
        <el-input v-model="resultForm.location" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="结果格式">
        <el-input v-model="resultForm.format" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="结果版本">
        <el-input v-model="resultForm.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="生产时间">
        <el-input v-model="resultForm.time" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="resultForm.updateTime" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="resultForm.unit" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="小数位">
        <el-input v-model="resultForm.precision" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="时空尺度">
        <el-input v-model="resultForm.spaceTimeScale" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="唯一标识符">
        <el-input v-model="resultForm.identifier" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据可视化">
        <el-input v-model="resultForm.visualization" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据处理">
        <el-input v-model="resultForm.dataHandle" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="数据转换">
        <el-input
          v-model="resultForm.dataTransformation"
          @change="changeHandle"
        />
      </el-form-item>
    </el-form>
    <picture-upload
      :pictureList="resultForm.pictures"
      @returnPictureList="returnPictureList"
    ></picture-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import PictureUpload from "./PictureUpload.vue";
export default defineComponent({
  components: { PictureUpload },
  props: {
    resultFormValue: {
      type: Object,
    },
  },
  emits: ["returnResultFormValue"],
  setup(props, context) {
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
      spaceTimeScale: (props.resultFormValue as any).spaceTimeScale,
      identifier: (props.resultFormValue as any).identifier,
      visualization: (props.resultFormValue as any).visualization,
      dataHandle: (props.resultFormValue as any).dataHandle,
      dataTransformation: (props.resultFormValue as any).dataTransformation,
      pictures: (props.resultFormValue as any).pictures,
    });

    const changeHandle = () => {
      context.emit("returnResultFormValue", resultForm);
    };

    const returnPictureList = (val: any[]) => {
      resultForm.pictures = [];
      val.forEach((item) => {
        resultForm.pictures.push(item.name);
      });
    };

    return {
      resultForm,
      changeHandle,
      returnPictureList
    };
  },
});
</script>

<style lang="scss" scoped>
</style>