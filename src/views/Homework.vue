<template>
  <div class="Outline">
    <el-scrollbar max-height="500px">
    <div class="collapseForm">
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapseItem" title="GeoDetector模型" name="1">
        <div>
          <Upload />
        </div>
      </el-collapse-item>
      <el-collapse-item title="GeoSOS模型" name="2">
        <div>
          <Upload />
        </div>
      </el-collapse-item>
      <el-collapse-item title="HASM模型" name="3">
        <div>
          <Upload />
        </div>
      </el-collapse-item>
      <el-collapse-item title="GWmodelS模型" name="4">
        <div>
          <Upload />
        </div>
      </el-collapse-item>
    </el-collapse>
    </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Upload from "@/components/homeworkUpload.vue"
export default defineComponent({
    components:{Upload},
    setup() {
        const activeNames = ref(['1'])
        return {
            activeNames
    }
    },
})
</script>

<style lang="scss" scoped>

.collapseForm{
    width: 700px;
    height: 400px;
    margin: 40px auto;
}

/deep/ .el-collapse-item__header {
    padding: 0px 5px;
    font-size: 13px;
    font-weight: 800;
    
}

  .Outline {
    background-size:80% 150%;
    background-repeat:no-repeat ;
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
    box-shadow:var(--el-box-shadow-dark);
}

</style>