<template>
  <div class="main">
    <el-row>
      <el-col :span="12" v-for="(item, index) in data" :key="index"
        ><div :class="'module item' + index" @click="toNav(item.path)">
          {{ item.title }}
        </div></el-col
      >
    </el-row>
  </div>
</template>



<script lang="ts">
interface DataType {
  title: string;
  des: string;
  path: string;
}
import { defineComponent, ref } from "vue";
import router from '@/router'
export default defineComponent({
  setup() {
    const data = ref<DataType[]>([
      {
        title: "模型作业",
        des: "这是模型作业模块",
        path: "/homework",
      },
      {
        title: "模型应用竞赛",
        des: "这是模型应用竞赛模块",
        path: "/apply",
      },
      {
        title: "模型开发竞赛",
        des: "这是模型开发竞赛模块",
        path: "/develp",
      },
      {
        title: "证书发放",
        des: "这是证书发放模块",
        path: "/certificate",
      },
    ]);

    const toNav = (type: string) => {
      router.push({path: type})
    }

    return {
      data,
      toNav
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.main {
  height: calc(100vh - 260px);
  .el-row {
    height: 100%;
    .el-col {
      position: relative;
      .module {
        height: 65%;
        width: 65%;
        background: red;
        border-radius: 6px;
        position: absolute;
        animation: scale-in-center 0.5s linear;
        transition: all 0.5s;
        cursor: pointer;
      }

      .item0 {
        right: 15px;
        bottom: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          right: 20px;
          bottom: 20px;
        }
      }
      .item1 {
        left: 15px;
        bottom: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          left: 20px;
          bottom: 20px;
        }
      }
      .item2 {
        right: 15px;
        top: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          right: 20px;
          top: 20px;
        }
      }
      .item3 {
        left: 15px;
        top: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          left: 20px;
          top: 20px;
        }
      }
    }
  }
}
</style>

