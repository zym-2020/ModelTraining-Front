<template>
  <div class="apply-home">
    <div class="title">
      <h2>完成情况</h2><h5 style="color:rgb(150,150,150);margin-left: 10px;">最终仅会提交最新版用于竞赛评审</h5>
      </div>
    <el-divider style="margin-top:0px" />
    <div v-if="summaryTabs.length>0">
      <el-tabs 
        v-model="editableTabsValue"
        type="card"
        class="demo-tabs"
        closable
        @tab-remove="handleClose"
      >
        <el-tab-pane
          v-for="(item, index)  in summaryTabs"
          :key=summaryTabs[index]
          :label="'第'+(index + 1)+'版'"
          :name="index"
        >
          <summaryTab :summaryItem="item">
          </summaryTab>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { notice } from "@/utils/notice";
import summaryTab from "@/components/summaryTab.vue";
import router from "@/router";
import { addSummary } from "@/api/request";
import { deleteSummary } from "@/api/request";
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  props:{
    researcherValue: {
      type: Object,
    },
    descriptionValue:{
      type: Object,
    },
    methodValue:{
      type: Object,
    },
    resultValue:{
      type: Object,
    },
    summaryValue:{
      type:Object
    }
  },
  components:{summaryTab},
  setup(props) {
    //const summaryTabs = ref<any[]>((router.currentRoute.value.params.apply as any).summary);
    const summaryTabs = ref<any[]>(props.summaryValue as any);
    const editableTabsValue = ref((props.summaryValue as any).length-1)
    const addTab = async () => {
      const summaryItem = {
        description:(props.descriptionValue as any),
        method:(props.methodValue as any),
        result:(props.resultValue as any),
        researcher:(props.researcherValue as any),
      }
      if(summaryItem.description.background.text==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.purpose.text==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.scheme.purpose==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.scheme.target==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.scheme.method==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.scheme.space.name==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.description.scheme.time.name==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.method.resource.modelResources.length==0){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.method.resource.dataResources.length==0){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.method.resource.parameters.length==0){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.method.processes.length==0){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.result.resultValidation.name==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultValidation.description==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultValidation.stepType==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultValidation.dataResources=={}){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultValidation.resultOutput=={}){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultVisualization.name==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultVisualization.description==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultVisualization.stepType==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultVisualization.dataResources=={}){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.resultVisualization.resultOutput=={}){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.conclusion.text==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
            if(summaryItem.result.conclusion.paper==''){
        notice("warning", "失败", "存在未填必须项")
        return
      }
      if(summaryItem.researcher.persons.length==0){
        notice("warning", "失败", "团队详情中的研究人员不能为空")
        return
      }
      const data = await addSummary(
        (router.currentRoute.value.params.apply as any).id,
        summaryItem
      );
      if (data != null && (data as any).code === 0) {
        summaryTabs.value.push(summaryItem)
        editableTabsValue.value = summaryTabs.value.length-1
        notice("success", "成功", "生成成功！");
      }
    }
    const handleClose = (targetName: number) => {
      ElMessageBox.confirm('是否要删除此版本文档?',{ confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning',})
        .then(() => {
          removeTab(targetName)
        })
        .catch(() => {
          // catch error
        })
    }
    const removeTab = async (targetName: number) => {
      const data = await deleteSummary(
        (router.currentRoute.value.params.apply as any).id,
        summaryTabs.value[targetName]
      );
      if (data != null && (data as any).code === 0) {
        summaryTabs.value.splice(targetName,1)
        if(targetName<editableTabsValue.value)
          editableTabsValue.value--
        else if (targetName===editableTabsValue.value)
          editableTabsValue.value = summaryTabs.value.length-1
        notice("success", "成功", "删除成功！");
      }
    }
  onMounted(()=>{
    
  })
  return{
    editableTabsValue,
    addTab,
    removeTab,
    summaryTabs,
    handleClose
  }
  }
});
</script>

<style lang="scss" scoped>
.apply-home {
  padding-left: 20px;
  width: 1000px;
}
.title{
  display: flex;
   align-items:flex-end;
   width: 1400px;
}
</style>