<template>
  <div class="foot-main">
    <div class="image">
      <img src="/log/中国地理学会.png" alt="" height="82" />
      <img src="/log/logo (自然资源学会).png" alt="" height="82" />
      <img src="/log/logo (地理信息产业学会).png" alt="" height="82" />
      <img src="/log/ISDE.jpg" alt="" height="82" />
      <img src="/log/logo(教育部).png" alt="" height="82" />
      <img src="/log/DKY.png" alt="" height="82" />
    </div>
    <div style="margin-bottom: 5px">Copyright © 2011-2022 OpenGMS. All Rights Reserved.</div>
    <el-link type="primary" href="https://geomodeling.njnu.edu.cn/"
      >https://geomodeling.njnu.edu.cn/</el-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.foot-main {
  text-align: center;
  border-top: solid 1px #eeeeee;
  box-sizing: border-box;
  .image {
    margin-top: 20px;
    margin-bottom: 15px;
    img {
      margin: 0 20px;
    }
  }
}
</style>