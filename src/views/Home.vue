<template>
  <div class="main">
    <el-row>
      <el-col :span="12" v-for="(item, index) in data" :key="index">
        <div :class="'module item' + index" @click="toNav(item.path)">
          <p class="itemTitle">{{ item.title }}</p>
        </div>
      </el-col>
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
import router from "@/router";
import { notice } from "@/utils/notice";
export default defineComponent({
  setup() {
    const data = ref<DataType[]>([
      {
        title: "模型作业",
        des: "这是模型作业模块",
        path: "/modelTrainingCourse/submission/homework",
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
      if (type === "/modelTrainingCourse/submission/homework") {
        router.push({ path: type });
      } else {
        notice("warning", "警告", "该页面暂未开放！");
      }
    };

    return {
      data,
      toNav,
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
.itemTitle {
  margin-left: 150px;
  margin-top: 90px;
  font-size: 30px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 5px 5px 5px #000000;
  position: relative;
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
        border-radius: 6px;
        position: absolute;
        animation: scale-in-center 0.5s linear;
        transition: all 0.5s;
        cursor: pointer;
      }
      .item0 {
        background: rgb(145, 135, 225);
        background-image: url("../../public/img/icons/work.png");
        background-size: 40% 60%;
        background-repeat: no-repeat;
        background-position: right bottom;
        right: 15px;
        bottom: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          right: 20px;
          bottom: 20px;
        }
      }
      .item1 {
        background: rgb(214, 135, 225);
        background-image: url("../../public/img/icons/apply.png");
        background-size: 40% 60%;
        background-repeat: no-repeat;
        background-position: right bottom;
        left: 15px;
        bottom: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          left: 20px;
          bottom: 20px;
        }
      }
      .item2 {
        background: rgb(225, 135, 135);
        background-image: url("../../public/img/icons/develop.png");
        background-size: 40% 60%;
        background-repeat: no-repeat;
        background-position: right bottom;
        right: 15px;
        top: 15px;
        &:hover {
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.7);
          right: 20px;
          top: 20px;
        }
      }
      .item3 {
        background: rgb(225, 171, 135);
        background-image: url("../../public/img/icons/certificate.png");
        background-size: 30% 60%;
        background-repeat: no-repeat;
        background-position: right bottom;
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

