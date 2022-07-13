<template>
  <div class="apply-main">
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="body">
          <div class="left">
            <div class="title">模型应用竞赛</div>
            <el-menu default-active="1" @select="selectHandle">
              <el-menu-item index="1">
                <el-icon><Menu /></el-icon>
                <span>提交文档</span>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><document /></el-icon>
                  <span>文档</span>
                </template>
                <el-menu-item index="2-1">实验描述</el-menu-item>
                <el-menu-item index="2-2">实验方法</el-menu-item>
                <el-menu-item index="2-3">实验结果</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="3">
                <el-icon><setting /></el-icon>
                <span>团队详情</span>
              </el-menu-item>
            </el-menu>
          </div>
          <team v-if="active == 'team'" />
          <apply-home v-if="active == 'commit'" />
          <description v-if="active == 'description'" :descriptionValue="descriptionValue"/>
          <method v-if="active === 'method'" :methodValue="methodValue"/>
          <result v-if="active === 'result'" :resultValue="resultValue"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Team from "@/components/Team.vue";
import ApplyHome from "@/components/ApplyHome.vue";
import Description from "@/components/Description.vue";
import Method from "@/components/Method.vue";
import Result from "@/components/Result.vue";
import router from '@/router'
export default defineComponent({
  components: { Team, ApplyHome, Description, Method, Result },
  setup() {
    const active = ref("commit");
    const descriptionValue = ref<any>()
    const methodValue = ref<any>()
    const resultValue = ref<any>()

    const selectHandle = (index: string) => {
      console.log(index);
      if (index === "3") {
        active.value = "team";
      } else if (index === "1") {
        active.value = "commit";
      } else if (index === "2-1") {
        active.value = "description";
      } else if (index === "2-2") {
        active.value = "method";
      } else if (index === "2-3") {
        active.value = "result";
      }
    };

    onMounted(() => {
      console.log(router.currentRoute.value.params.apply)
      descriptionValue.value = (router.currentRoute.value.params.apply as any).description
      methodValue.value = (router.currentRoute.value.params.apply as any).method
      resultValue.value = (router.currentRoute.value.params.apply as any).result
    })

    return {
      active,
      selectHandle,
      descriptionValue,
      methodValue,
      resultValue
    };
  },
});
</script>

<style lang="scss" scoped>
.apply-main {
  margin-top: 20px;
  .body {
    display: flex;
    .left {
      border-radius: 6px;
      width: 200px;
      height: 420px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.35);
      .title {
        height: 40px;
        text-align: center;
        background: #eaeaea;
        line-height: 40px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
    }
    .team,
    .description,
    .method,
    .result,
    .apply-home {
      width: calc(100% - 220px);
    }
  }
}
</style>