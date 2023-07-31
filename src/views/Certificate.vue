<template>
  <el-alert
    title="抱歉，您未达成结业证书获取条件！"
    center
    type="warning"
    :closable="false"
    v-if="certificate.ctype === 'train' && train === ''"
  />
  <el-alert
    title="抱歉，您未达成应用竞赛证书获取条件！"
    center
    type="warning"
    :closable="false"
    v-if="certificate.ctype === 'apply' && apply === ''"
  />
  <el-alert
    title="抱歉，您未达成开发竞赛证书获取条件！"
    center
    type="warning"
    :closable="false"
    v-if="certificate.ctype === 'develop' && develop === ''"
  />
  <div class="skeleton" v-if="skeletonFlag">
    <el-skeleton :rows="5" animated />
  </div>
  <div class="certificate-form" v-else>
    <el-form :inline="true" :model="certificate">
      <h3>选择证书类型</h3>
      <el-divider />
      <el-row class="select-form">
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="certificate.ctype" placeholder="请选择">
              <el-option label="模型培训" value="train" />
              <el-option label="模型应用竞赛" value="apply" />
              <el-option label="模型开发竞赛" value="develop" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="danger" @click="onDownLoad" :disabled="btnDisabled"
              >下载</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";

export default defineComponent({
  setup() {
    const train = ref("");
    const apply = ref("");
    const develop = ref("");
    const skeletonFlag = ref(true);
    const certificate = reactive({
      ctype: "",
    });

    const btnDisabled = computed(() => {
      if (certificate.ctype === "train" && train.value != "") {
        return false;
      } else if (certificate.ctype === "apply" && apply.value != "") {
        return false;
      } else if (certificate.ctype === "develop" && develop.value != "") {
        return false;
      } else {
        return true;
      }
    });
    const onDownLoad = () => {
      if (certificate.ctype === "train") {
        window.location.href = `https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/certificate/getCertificate/${train.value}`;
      } else if (certificate.ctype === "apply") {
        window.location.href = `https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/certificate/getCertificate/${apply.value}`;
      } else if (certificate.ctype === "develop") {
        window.location.href = `https://geomodeling.njnu.edu.cn/modelTrainingCourse/submission/model/certificate/getCertificate/${develop.value}`;
      }
    };

    onMounted(async () => {
      skeletonFlag.value = false;
    });

    return {
      train,
      apply,
      develop,
      certificate,
      skeletonFlag,
      onDownLoad,
      btnDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-alert {
  position: absolute;
}
.skeleton {
  width: 400px;
  height: 200px;
  margin: 210px auto;
}
.el-footer {
  margin-bottom: 150px;
}
h3 {
  display: flex;
  justify-content: center;
  color: rgb(255, 100, 100);
  font-size: 24px;
}
.el-divider {
  border-color: rgb(255, 100, 100);
  width: 300px;
  margin-left: 50px;
}
.select-form {
  width: 400px;
  margin-left: 65px;
}
/deep/ .el-select,
/deep/ .el-input,
/deep/ .el-input__inner {
  color: rgb(255, 100, 100);
  border: 0px;
  border-radius: 0px;
  text-align: center;
}

.el-select-dropdown__item {
  background-color: transparent;
  color: rgb(255, 100, 100);
}
.el-select-dropdown__item:hover {
  color: rgb(255, 0, 170);
}
.certificate-form {
  background-image: url("../../public/img/icons/CertificateSelect.png");
  background-size: 25% 50%;
  background-repeat: no-repeat;
  background-position: left top;
  background-color: rgb(255, 230, 230);
  width: 400px;
  height: 200px;
  margin: 210px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
  border: 2px solid rgb(255, 100, 100);
  border-radius: 30px;
  box-shadow: var(--el-box-shadow-dark);
}
</style>