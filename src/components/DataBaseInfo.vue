<template>
  <div class="data-base-info">
    <div class="form-item-left">
      <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
        <el-form-item label="名称">
          <el-input v-model="dataBaseInfo.name" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dataBaseInfo.description" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="dataBaseInfo.location" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="dataBaseInfo.format" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="dataBaseInfo.version" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="数据生产时间">
          <el-input v-model="dataBaseInfo.produceTime" @change="changeHandle" />
        </el-form-item>
      </el-form>
    </div>
    <div class="form-item-right">
      <el-form label-position="right" label-width="100px" :model="dataBaseInfo">
        <el-form-item label="数据更新时间">
          <el-input v-model="dataBaseInfo.updateTime" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="dataBaseInfo.unit" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="小数位">
          <el-input v-model="dataBaseInfo.precision" @change="changeHandle" />
        </el-form-item>
        <el-form-item label="时空尺度">
          <el-input
            v-model="dataBaseInfo.spaceTimeScale"
            @change="changeHandle"
          />
        </el-form-item>
        <el-form-item label="唯一标识符">
          <el-input v-model="dataBaseInfo.identifier" @change="changeHandle" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  props: {
    dataBaseInfoValue: {
      type: Object,
    },
  },
  emits: ["returnDataBase"],
  setup(props, context) {
    const dataBaseInfo = reactive({
      name: (props.dataBaseInfoValue as any).name,
      description: (props.dataBaseInfoValue as any).description,
      location: (props.dataBaseInfoValue as any).location,
      format: (props.dataBaseInfoValue as any).format,
      version: (props.dataBaseInfoValue as any).version,
      produceTime: (props.dataBaseInfoValue as any).produceTime,
      updateTime: (props.dataBaseInfoValue as any).updateTime,
      unit: (props.dataBaseInfoValue as any).unit,
      precision: (props.dataBaseInfoValue as any).precision,
      spaceTimeScale: (props.dataBaseInfoValue as any).spaceTimeScale,
      identifier: (props.dataBaseInfoValue as any).identifier,
    });

    const changeHandle = () => {
      context.emit("returnDataBase", dataBaseInfo);
    };

    return {
      dataBaseInfo,
      changeHandle,
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