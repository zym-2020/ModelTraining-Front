<template>
  <div >
    <div v-if="info" >
    <div class="process-item">
        <strong>类型：</strong>
        <div class="text" :title="info.dataBaseInfo.type">
          {{ info.dataBaseInfo.type }}
        </div>
      </div>
      <div class="process-item">
        <strong>描述：</strong>
        <div class="text" :title="info.dataBaseInfo.description">
          {{ info.dataBaseInfo.description }}
        </div>
      </div>
      <div class="process-item">
        <strong>数据版本：</strong>
        <div class="text" :title="info.dataBaseInfo.version">
          {{ info.dataBaseInfo.version }}
        </div>
      </div>
      <div class="process-item">
        <strong>生产时间：</strong>
        <div class="text" :title="info.dataBaseInfo.produceTime">
          {{ info.dataBaseInfo.produceTime }}
        </div>
      </div>
    </div>
    <!-- <el-collapse v-if="info.length > 0">
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
          <div class="item" v-if="item.dataResource">
            <div><strong>对应数据资源：</strong></div>
            <div class="text">{{ item.dataResource.dataBaseInfo.name }}</div>
          </div>
          <div class="item" v-if="item.dataResource">
            <div><strong>资源描述：</strong></div>
            <div class="text">{{ item.dataResource.dataBaseInfo.description }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse> -->
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
    const info  = ref<any>(props.info as any);
    return {
      info,
    };
  },
});
</script>

<style lang="scss" scoped>

  .process-item {
    margin-bottom: 10px;
    display: flex;

    .text {
      width: calc(100% - 70px);
    }
  }
.item {
  display: flex;
  margin-bottom: 10px;
  .text {
    width: calc(95% - 39px);
  }
}
</style>