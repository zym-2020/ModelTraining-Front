<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 580px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <el-button @click="save" type="primary">保存</el-button>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { useRoute } from 'vue-router'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },

  setup() {
    const route = useRoute()
    const eId = route.query.eId
    console.log(eId)
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    let readyWord = ''
    if(eId == "1-1"|| eId == "1-2"){
      readyWord = '<h2>形式：文本、图片、视频</h2>'
    }
    else if(eId == "1-3"){
      readyWord = '<h2>形式：文本、流程图</h2><h2>建议内容:</h2><ul><li>研究对象</li><li>地点</li><li>时间</li><li>人物</li><li>方法</li></ul>'
    }
    else if(eId == "2-1"){
      readyWord = '<h2>建议格式:OpenGMS standard</h2>\
                  <h2>(1)模型资源</h2><h3>基础信息:</h3><ul><li>模型概念</li><li>模型存储位置</li><li>版本</li><li>单位</li><li>模型范围</li></ul>\
                  <h3>元数据信息:</h3><ul><li>模型假设</li><li>算法/等式</li><li>输入、输出、参数、迭代次数必要的状态</li><li>单位</li></ul>\
                  <h3>出处信息:</h3><ul><li>参考文献</li><li>出版组织机构</li><li>发展机构</li></ul>\
                  <h2>(2)数据资源</h2><h3>基础信息:</h3><ul><li>名称</li><li>描述</li><li>位置</li><li>格式</li><li>版本</li><li>生产时间</li><li>更新时间</li><li>单位</li><li>小数位</li><li>时空尺度</li><li>唯一标识符</li></ul>\
                  <h3>活动信息:</h3><ul><li>数据处理步骤</li><li>数据转化步骤</li></ul>\
                  <h3>出处信息/代理机构:</h3><ul><li>参考文献</li><li>出版组织机构</li></ul>\
                  <h2>(3)计算资源</h2><ul><li>操作系统</li><li>版本</li><li>软件信息</li><li>资源库</li><li>硬件设备</li></ul>'
    }
    else if(eId == "2-2"){
      readyWord = '<h2>步骤信息建议格式:</h2>\
                  <h1>顺序</h1><h1>名称</h1><h1>步骤描述</h1><h1>步骤类型[数据预处理/模拟分析/数据后处理/敏感性分析/可视化…]</h1><h1>操作类型[软件操作/等式计算/程序运行]</h1>\
                  <h1>输入</h1><ul><li>名称</li><li>描述</li><li>类型[数据/参数]</li></ul>\
                  <h1>输出</h1><li>名称</li><li>描述</li><li>输出数据信息[位置，格式，生产时间，小数位，时空尺度]</li></ul>\
                  <h1>需要使用/配置资源<ul><li>数据信息</li><li>模型配置信息/软件、程序配置信息</li></ul></h1><h1>参考文献</h1><h1>其他补充</h1>'
    }
    else if(eId == "3-1"){
      readyWord = '<h2>建议内容:</h2><ul><li>名称</li><li>描述</li><li>位置</li><li>格式</li><li>版本</li><li>单位</li><li>生产时间</li><li>更新时间</li><li>小数位</li>\
                  <li>时空尺度</li><li>唯一标识符</li><li>数据可视化步骤(步骤信息格式参考2-2建议)</li><li>数据处理步骤</li><li>数据转化步骤</li><ul>'
    }
    else if(eId == "3-2"){
      readyWord = '<h2>建议格式:</h2>\
                  <h1>顺序</h1><h1>名称</h1><h1>步骤描述</h1><h1>步骤类型[误差评估/误差分析/不确定性分析/收敛性分析/…]</h1><h1>操作类型[软件操作/等式计算/程序运行]</h1>\
                  <h1>输入</h1><ul><li>名称</li><li>描述</li><li>类型[数据/参数]</li></ul>\
                  <h1>输出</h1><li>名称</li><li>描述</li><li>输出数据信息[位置，格式，生产时间，小数位，时空尺度]</li></ul>\
                  <h1>需要使用/配置资源<ul><li>数据信息</li><li>模型信息(评估模型，评估的等式)</li><li>模型配置信息/软件、程序配置信息</li></ul></h1><h1>参考文献</h1><h1>其他补充</h1>'
    }
    else{
      readyWord = ''
    }
    // 内容 HTML
    const valueHtml = ref(readyWord)

    // 模拟 ajax 异步获取内容
/*     onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    }) */

    const toolbarConfig = {
        excludeKeys: ['fullScreen','redo'],
    }
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const save=()=>{
      console.log(valueHtml.value)
    }
    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      save
    };
  }
}
</script>    
<style scoped>
    .el-button{
        margin-top: 20px;
        float: right;
        width: 100px;
    }
</style>