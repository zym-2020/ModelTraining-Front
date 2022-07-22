<template>
  <div>
    <div style="border: solid 1px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />
      <Editor
        style="height: 320px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { IDomEditor } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default defineComponent({
  components: { Editor, Toolbar },
  setup() {
    const editorRef = shallowRef<IDomEditor>();
    const toolbarConfig = {};
    const editorConfig = {
      scroll: true,
      autoFocus: true,
    };
    const valueHtml = ref("");
    const handleCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      toolbarConfig,
      editorConfig,
      valueHtml,
      handleCreated,

    };
  },
});
</script>

<style lang="scss" scoped>
</style>