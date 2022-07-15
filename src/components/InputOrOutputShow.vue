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
          <div class="item" v-if="item.type === 'input'">
            <div><strong>类型：</strong></div>
            <div>
              <el-tag>{{ item.dataType }}</el-tag>
            </div>
          </div>
          <div class="item" v-else>
            <div><strong>格式：</strong></div>
            <div class="text">{{ item.format }}</div>
          </div>
          <div class="item">
            <div><strong>描述：</strong></div>
            <div class="text">{{ item.description }}</div>
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
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const info = computed(() => {
      return props.info;
    });

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