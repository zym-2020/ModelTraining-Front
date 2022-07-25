<template>
  <div class="Outline">
    <el-scrollbar max-height="500px">
      <div class="collapseForm">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template #title>
              <div>
                GeoDetector模型
                <el-icon color="#67C23A" v-if="state1 === 1"
                  ><SuccessFilled
                /></el-icon>
                <el-icon color="#909399" v-else><InfoFilled /></el-icon>
              </div>
            </template>
            <div>
              <el-skeleton :rows="3" animated v-if="skeletonFlag" />
              <Upload
                :index="'1'"
                :currentFileName="currentFileName1"
                :state="state1"
                @changeState="changeState"
                v-else
              />
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              <div>
                GeoSOS模型
                <el-icon color="#67C23A" v-if="state2 === 1"
                  ><SuccessFilled
                /></el-icon>
                <el-icon color="#909399" v-else><InfoFilled /></el-icon>
              </div>
            </template>
            <div>
              <el-skeleton :rows="3" animated v-if="skeletonFlag" />
              <Upload
                :index="'2'"
                :currentFileName="currentFileName2"
                :state="state2"
                @changeState="changeState"
                v-else
              />
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>
              <div>
                HASM模型
                <el-icon color="#67C23A" v-if="state3 === 1"
                  ><SuccessFilled
                /></el-icon>
                <el-icon color="#909399" v-else><InfoFilled /></el-icon>
              </div>
            </template>
            <div>
              <el-skeleton :rows="3" animated v-if="skeletonFlag" />
              <Upload
                :index="'3'"
                :currentFileName="currentFileName3"
                :state="state3"
                @changeState="changeState"
                v-else
              />
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template #title>
              <div>
                GWmodelS模型
                <el-icon color="#67C23A" v-if="state4 === 1"
                  ><SuccessFilled
                /></el-icon>
                <el-icon color="#909399" v-else><InfoFilled /></el-icon>
              </div>
            </template>
            <div>
              <el-skeleton :rows="3" animated v-if="skeletonFlag" />
              <Upload
                :index="'4'"
                :currentFileName="currentFileName4"
                :state="state4"
                @changeState="changeState"
                v-else
              />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Upload from "@/components/homeworkUpload.vue";
import { getHomework } from "@/api/request";
export default defineComponent({
  components: { Upload },
  setup() {
    const activeNames = ref(["1"]);
    const currentFileName1 = ref("");
    const currentFileName2 = ref("");
    const currentFileName3 = ref("");
    const currentFileName4 = ref("");
    const state1 = ref(0);
    const state2 = ref(0);
    const state3 = ref(0);
    const state4 = ref(0);
    const skeletonFlag = ref(true);

    const changeState = (index: string) => {
      if (index === "1") {
        state1.value = 1;
      } else if (index === "2") {
        state2.value = 1;
      } else if (index === "3") {
        state3.value = 1;
      } else if (index === "4") {
        state4.value = 1;
      }
    };

    onMounted(async () => {
      const data = await getHomework();
      if (data != null && (data as any).code === 0) {
        data.data.forEach((item: any) => {
          if (item.number === "1" && item.fileName != "") {
            currentFileName1.value = item.name;
            state1.value = item.state;
          } else if (item.number === "2" && item.fileName != "") {
            currentFileName2.value = item.name;
            state2.value = item.state;
          } else if (item.number === "3" && item.fileName != "") {
            currentFileName3.value = item.name;
            state3.value = item.state;
          } else if (item.number === "4" && item.fileName != "") {
            currentFileName4.value = item.name;
            state4.value = item.state;
          }
        });
      }
      skeletonFlag.value = false;
    });
    return {
      activeNames,
      currentFileName1,
      currentFileName2,
      currentFileName3,
      currentFileName4,
      skeletonFlag,
      state1,
      state2,
      state3,
      state4,
      changeState,
    };
  },
});
</script>

<style lang="scss" scoped>
.collapseForm {
  width: 700px;
  height: 400px;
  margin: 40px auto;
}

/deep/ .el-collapse-item__header {
  padding: 0px 5px;
  font-size: 15px;
  font-weight: 800;
}

.Outline {
  background-size: 80% 150%;
  background-repeat: no-repeat;
  background-position: right;
  /*     background-color: rgb(245, 245, 255); */
  width: 800px;
  height: 500px;
  margin: 60px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
  /*     border: 2px solid  rgb(0, 140, 255); */
  border-radius: 30px;
  box-shadow: var(--el-box-shadow-dark);
}
</style>