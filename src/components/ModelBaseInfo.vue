<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
      <el-form-item label="模型概念">
        <el-input v-model="dataBaseInfo.conception" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="模型存储位置">
        <el-input v-model="dataBaseInfo.storage" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="dataBaseInfo.version" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="dataBaseInfo.unit" @change="changeHandle" />
      </el-form-item>
      <el-form-item label="模型范围">
        <el-input v-model="dataBaseInfo.range" @change="changeHandle" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    modelBaseInfoValue: {
      type: Object,
    },
  },
  emits: ["returnModelBaseInfo"],
  setup(props, context) {
    const dataBaseInfo = reactive({
      conception: (props.modelBaseInfoValue as any).conception,
      storage: (props.modelBaseInfoValue as any).storage,
      version: (props.modelBaseInfoValue as any).version,
      unit: (props.modelBaseInfoValue as any).unit,
      range: (props.modelBaseInfoValue as any).range,
    });

    const changeHandle = () => {
      context.emit("returnModelBaseInfo", dataBaseInfo);
    };

    return {
      dataBaseInfo,
      changeHandle
    };
  },
});
</script>

<style lang="scss" scoped>
</style>