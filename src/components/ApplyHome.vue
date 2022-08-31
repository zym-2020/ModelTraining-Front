<template>
  <div class="apply-home">
    <div class="title">
      <h2>完成情况</h2><h5 style="color:rgb(150,150,150);margin-left: 10px;">最终仅会提交最新版用于竞赛评审</h5>
      <el-button v-if="form.type===''" style="margin-left:600px;margin-bottom: 10px;" type="primary"  size="small" @click="topicClick" plain>题目选择</el-button>
      <el-button v-else style="margin-left:600px;margin-bottom: 10px;" type="primary"  size="small" @click="topicClick" plain>题目修改</el-button>
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
  <el-dialog v-if="Flag" v-model="Flag" width="360px"  title="参与竞赛题目选择">
    <el-form label-position="right" label-width="110px" :model="form" :rules="rules">
      <el-form-item label="竞赛类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择竞赛类型">
          <el-option label="模型应用竞赛" value="模型应用竞赛" />
          <el-option label="模型开发竞赛" value="模型开发竞赛" />
        </el-select>
      </el-form-item>
      <el-form-item label="竞赛题目" prop="problem">
        <el-select v-model="form.problem" placeholder="请选择竞赛题目">
          <el-option label="问题1" value="问题1" />
          <el-option label="问题2" value="问题2" />
          <el-option v-if="form.type==='模型应用竞赛'" label="问题3" value="问题3" />
          <el-option v-if="form.type==='模型应用竞赛'" label="问题4" value="问题4" />
        </el-select>
      </el-form-item>
      <el-form-item label="研究项目名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入研究项目名称"/>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" plain @click="setTopicClick" >确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed,reactive } from "vue";
import { notice } from "@/utils/notice";
import summaryTab from "@/components/summaryTab.vue";
import router from "@/router";
import { addSummary, saveTopic, deleteSummary } from "@/api/request";
import { ElMessageBox, FormRules } from 'element-plus'
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
    },
    topicValue:{
      type:Object
    }
  },
  components:{summaryTab},
  emits: ['returnTopic'],
  setup(props,context) {
    const Flag = ref(false)
    const summaryTabs = ref<any[]>(props.summaryValue as any);
    const editableTabsValue = ref((props.summaryValue as any).length-1)
    const form = reactive({
      type: "",
      problem: "",
      title:""
    });
    const setTopicClick = async() =>{
      if (form.type === '') {
        notice("warning", "失败", "请选择竞赛类型")
        return
      }
      if (form.problem === '') {
        notice("warning", "失败", "请选择竞赛题目")
        return
      }
      if (form.title === '') {
        notice("warning", "失败", "请输入研究项目名称")
        return
      }
      const topic = {
        type: form.type,
        problem: form.problem,
        title:form.title,
      }
      const data = await saveTopic((router.currentRoute.value.params.apply as any).id, topic)
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功")
        Flag.value = false
        context.emit('returnTopic', topic)
      }
    }
    const rules = reactive<FormRules>({
      type: [
        { required: true, message: '请选择竞赛类型', trigger: 'change' }
      ],
      problem:[
        { required: true, message: '请选择竞赛题目', trigger: 'change' }
      ],
      title: [
        { required: true, message: '请输入研究项目题目', trigger: 'change' }
      ],
    })
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

    const topicClick = () =>{
      Flag.value = true
    }

  onMounted(()=>{
    if((props.topicValue as any))
    {
      form.type = (props.topicValue as any).type
      form.problem = (props.topicValue as any).problem
      form.title = (props.topicValue as any).title
    }else{
      Flag.value = true
    }
  })
  return{
    editableTabsValue,
    addTab,
    removeTab,
    summaryTabs,
    handleClose,
    topicClick,
    setTopicClick,
    Flag,
    form,
    rules
  }
  }
});
</script>

<style lang="scss" scoped>
.apply-home {
  padding-left: 20px;
  width: 1000px;
  min-height:450px;
}
.title{
  display: flex;
  align-items: flex-end
}
.btn {
  text-align: center;
}
</style>