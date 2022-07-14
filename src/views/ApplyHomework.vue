<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="mb-2">        
            <el-icon><Operation /></el-icon>
            <h5>模型应用竞赛</h5>
        </div>
        <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
        >
            <el-sub-menu index="1">
            <template #title>
                <el-icon><Search /></el-icon>
                <span>实验描述</span>
            </template>
                <el-menu-item @click="changeId($event)" index="1-1">1.1研究背景</el-menu-item>
                <el-menu-item @click="changeId($event)" index="1-2">1.2研究目的</el-menu-item>
                <el-menu-item @click="changeId($event)" index="1-3">1.3研究方案/实验设计</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
            <template #title>
                <el-icon><Filter /></el-icon>
                <span>实验方法</span>
            </template>
                <el-menu-item @click="changeId($event)" index="2-1">2.1研究资源</el-menu-item>
                <el-menu-item @click="changeId($event)" index="2-2">2.2实验过程</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
            <template #title>
            <el-icon><Finished /></el-icon>
                <span>实验结果</span>
            </template>
                <el-menu-item @click="changeId($event)" index="3-1">3.1结果输出</el-menu-item>
                <el-menu-item @click="changeId($event)" index="3-2">3.2结果验证</el-menu-item>
                <el-menu-item @click="changeId($event)" index="3-3">3.3其他</el-menu-item>
            </el-sub-menu>
        </el-menu>
      </el-aside>
            <el-main>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component class="view" :is="Component" :key="route.fullPath"/>
                    </keep-alive>
                </router-view>
            </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
export default defineComponent({
    setup() {
        const router = useRouter()
        const route = useRoute()
        const changeId = (e:any) => {
            router.push({
            name: 'WangEditor2',
            query: {eId:e.index}
        })
        }
         onMounted(() => {
            router.push({
            name: 'WangEditor2',
            query: {eId:'1-1'}
        })
        })
        return{
            changeId,
            route
        }
    },
})
</script>

<style lang="scss" scoped>
    .mb-2{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: rgb(125, 125, 125);

    }
</style>