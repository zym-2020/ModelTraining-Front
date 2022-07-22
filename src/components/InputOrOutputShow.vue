<template>
  <div>
    <el-collapse v-if="info.length > 0">
      <el-collapse-item
        v-for="(item, index) in info"
        :key="index"
        :title="item.name"
        :name="index"
      >
        <div>
          <div class="item">
            <div><strong>名称：</strong></div>
            <div class="text">{{ item.name }}</div>
          </div>
          <div class="item">
            <div><strong>描述：</strong></div>
            <div class="text">{{ item.description }}</div>
          </div>
          <div class="item">
            <div><strong>格式：</strong></div>
            <div class="text">{{ item.format }}</div>
          </div>
          <div class="item">
            <div><strong>单位：</strong></div>
            <div class="text">{{ item.unit }}</div>
          </div>
          <div class="item">
            <div><strong>默认值：</strong></div>
            <div class="text">{{ item.defaultValue }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div v-else>
      <el-empty description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const info  = ref<any[]>(props.info as any[]);
    return {
      info,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  margin-bottom: 10px;
  .text {
    width: calc(100% - 39px);
  }
}
</style>