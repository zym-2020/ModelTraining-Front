<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="source">
      <el-form-item label="参考文献">
        <el-input v-model="source.references" />
      </el-form-item>
      <el-form-item label="出版组织机构">
        <el-input v-model="source.publication" />
      </el-form-item>
      <el-form-item label="发展机构">
        <el-input v-model="source.develop" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const source = reactive({
      references: "",
      publication: "",
      develop: "",
    });

    return {
      source,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>