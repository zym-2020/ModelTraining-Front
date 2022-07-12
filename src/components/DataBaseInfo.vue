<template>
  <div class="data-base-info">
    <div class="form-item-left">
      <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
        <el-form-item label="名称">
          <el-input v-model="dataBaseInfo.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dataBaseInfo.description" />
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="dataBaseInfo.location" />
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="dataBaseInfo.format" />
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="dataBaseInfo.version" />
        </el-form-item>
        <el-form-item label="数据生产时间">
          <el-input v-model="dataBaseInfo.produceTime" />
        </el-form-item>
      </el-form>
    </div>
    <div class="form-item-right">
      <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
        <el-form-item label="数据更新时间">
          <el-input v-model="dataBaseInfo.updateTime" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="dataBaseInfo.unit" />
        </el-form-item>
        <el-form-item label="小数位">
          <el-input v-model="dataBaseInfo.precision" />
        </el-form-item>
        <el-form-item label="时空尺度">
          <el-input v-model="dataBaseInfo.spaceTimeScale" />
        </el-form-item>
        <el-form-item label="唯一标识符">
          <el-input v-model="dataBaseInfo.identifier" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const dataBaseInfo = reactive({
      name: "",
      description: "",
      location: "",
      format: "",
      version: "",
      produceTime: "",
      updateTime: "",
      unit: "",
      precision: "",
      spaceTimeScale: "",
      identifier: "",
    });

    return {
      dataBaseInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.data-base-info {
  display: flex;
  .form-item-left {
    flex: 1;
    padding-right: 15px;
  }
  .form-item-right {
    flex: 1;
    padding-left: 15px;
  }
}
</style>