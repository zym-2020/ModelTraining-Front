<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="metaData">
      <el-form-item label="模型假设">
        <el-input v-model="metaData.hypothesis" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="算法/等式">
        <el-input v-model="metaData.algorithm" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="输入">
        <el-input v-model="metaData.input" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="输出">
        <el-input v-model="metaData.output" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="参数">
        <el-input v-model="metaData.parameter" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="迭代次数">
        <el-input v-model="metaData.iterate" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="metaData.unit" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  props: {
    modelMetaDataValue: {
      type: Object,
    },
  },
  emits: ["returnModelMetaData"],
  setup(props, context) {
    const metaData = reactive({
      hypothesis: (props.modelMetaDataValue as any).hypothesis,
      algorithm: (props.modelMetaDataValue as any).algorithm,
      input: (props.modelMetaDataValue as any).input,
      output: (props.modelMetaDataValue as any).output,
      parameter: (props.modelMetaDataValue as any).parameter,
      iterate: (props.modelMetaDataValue as any).iterate,
      unit: (props.modelMetaDataValue as any).unit,
    });

    const changeHandle = () => {
      context.emit("returnModelMetaData", metaData);
    };

    return {
      metaData,
      changeHandle
    };
  },
});
</script>

<style lang="scss" scoped>
</style>