<template>
  <div class="team" style="width: 1000px">
    <div class="title">
      <h2>成员列表</h2>
    </div>
    <el-divider />
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="teamId" label="团队编号" width="300" />
      <el-table-column prop="name" label="姓名" />
    </el-table>
    <div class="title1">
      <h2 style="color:lightcoral;margin-right:5px">*</h2>
      <h2>研究人员</h2>
      <h5 style="color:gray">（请添加项目参与人员）</h5>
    </div>
    <el-divider />
    <el-table :data="researcherTable" style="width: 100%" border>
      <el-table-column align='center' prop="name" label="名称" width="90" />
      <el-table-column align='center' prop="surname" label="姓氏" width="90" />
      <el-table-column align='center' prop="appellation" label="称谓" width="70" />
      <el-table-column align='center' prop="email" label="邮箱" width="200" />
      <el-table-column align='center' prop="institution" label="隶属机构" width="150" />
      <el-table-column align='center' prop="address" label="地址" />
      <el-table-column align='center' fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="updateResearcherClick(scope.$index)">
            查看
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteResearcherClick(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="addResearcherClick">添加研究人员</el-button>
  </div>
  <el-dialog v-if="add" v-model="add" width="400px" title="信息添加">
    <el-form :model="inputForm" label-width="100px" :rules="rules">
      <el-form-item label="输入名称" prop="name">
        <el-input v-model="inputForm.name" />
      </el-form-item>
      <el-form-item label="输入姓氏" prop="surname">
        <el-input v-model="inputForm.surname">
        </el-input>
      </el-form-item>
      <el-form-item label="输入邮箱" prop="email">
        <el-input v-model="inputForm.email" />
      </el-form-item>
      <el-form-item label="隶属机构" prop="institution">
        <el-input v-model="inputForm.institution" />
      </el-form-item>
      <el-form-item label="输入地址" prop="address">
        <el-input v-model="inputForm.address" />
      </el-form-item>
      <el-form-item label="输入称谓" prop="appellation">
        <el-select v-model="inputForm.appellation" placeholder="请选择" filterable allow-create>
          <el-option label="先生" value="先生" />
          <el-option label="女士" value="女士" />
          <el-option label="小姐" value="小姐" />
          <el-option label="博士" value="博士" />
          <el-option label="教授" value="教授" />
          <el-option label="副教授" value="副教授" />
          <el-option label="其他(请直接输入)" value=" " disabled />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="operateType === 'add'">
        <el-button type="primary" @click="addClick">确定</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button type="success" @click="updateClick">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed } from "vue";
import { getTeamInfo } from "@/api/request";
import type { FormRules } from 'element-plus';
import { notice } from "@/utils/notice";
import { addResearcher } from "@/api/request";
import { updateResearcher } from "@/api/request";
import { deleteResearcher } from "@/api/request";
import router from "@/router";
export default defineComponent({
  props: {
    researcherValue: {
      type: Object,
    },
  },
  setup(props) {
    const tableData = ref<any[]>([]);
    const researcherTable = ref<any[]>((props.researcherValue as any).persons);
    const add = ref(false);
    const Index = ref(-1)
    const operateType = ref("")
    const uuid = require('uuid')
    const inputForm = reactive({
      name: "",
      surname: "",
      institution: "",
      address: "",
      appellation: "",
      email: "",
    });

    const addClick = async () => {
      if (!inputForm.name) {
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if (!inputForm.surname) {
        notice("warning", "失败", "“姓氏”不能为空")
        return
      }
      if (!inputForm.email) {
        notice("warning", "失败", "“邮箱”不能为空")
        return
      }
      if (!inputForm.institution) {
        notice("warning", "失败", "“隶属机构”不能为空")
        return
      }
      if (!inputForm.address) {
        notice("warning", "失败", "“地址”不能为空")
        return
      }
      if (!inputForm.appellation) {
        notice("warning", "失败", "“称谓”不能为空")
        return
      }

      const person = {
        name: inputForm.name,
        surname: inputForm.surname,
        institution: inputForm.institution,
        address: inputForm.address,
        appellation: inputForm.appellation,
        email: inputForm.email,
        personId: uuid.v4()
      };
      const data = await addResearcher(
        (router.currentRoute.value.params.apply as any).id,
        person
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "保存成功！");
      }
      researcherTable.value.push(person);
      inputForm.name = "";
      inputForm.surname = "";
      inputForm.institution = "";
      inputForm.address = "";
      inputForm.appellation = "";
      inputForm.email = "";
      add.value = false;
    };

    const updateClick = async () => {
      if (!inputForm.name) {
        notice("warning", "失败", "“名称”不能为空")
        return
      }
      if (!inputForm.surname) {
        notice("warning", "失败", "“姓氏”不能为空")
        return
      }
      if (!inputForm.email) {
        notice("warning", "失败", "“邮箱”不能为空")
        return
      }
      if (!inputForm.institution) {
        notice("warning", "失败", "“隶属机构”不能为空")
        return
      }
      if (!inputForm.address) {
        notice("warning", "失败", "“地址”不能为空")
        return
      }
      if (!inputForm.appellation) {
        notice("warning", "失败", "“称谓”不能为空")
        return
      }
      const person = {
        name: inputForm.name,
        surname: inputForm.surname,
        institution: inputForm.institution,
        address: inputForm.address,
        appellation: inputForm.appellation,
        email: inputForm.email,
        personId: researcherTable.value[Index.value].personId
      };
      const data = await updateResearcher(
        (router.currentRoute.value.params.apply as any).id,
        person
      );
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "修改成功！");
      }
      researcherTable.value[Index.value] = person;
      inputForm.name = "";
      inputForm.surname = "";
      inputForm.institution = "";
      inputForm.address = "";
      inputForm.appellation = "";
      inputForm.email = "";
      add.value = false;
    };

    const addResearcherClick = () => {
      inputForm.name = "";
      inputForm.surname = "";
      inputForm.institution = "";
      inputForm.address = "";
      inputForm.appellation = "";
      inputForm.email = "";
      operateType.value = "add"
      add.value = true;
    };

    const updateResearcherClick = (scope: number) => {
      inputForm.name = researcherTable.value[scope].name;
      inputForm.surname = researcherTable.value[scope].surname;
      inputForm.institution = researcherTable.value[scope].institution;
      inputForm.address = researcherTable.value[scope].address;
      inputForm.appellation = researcherTable.value[scope].appellation;
      inputForm.email = researcherTable.value[scope].email;
      operateType.value = "update";
      add.value = true;
      Index.value = scope
    }

    const deleteResearcherClick = async (scope: number) => {
      const data = await deleteResearcher(
        (router.currentRoute.value.params.apply as any).id,
        researcherTable.value[scope]
      );
      if (data != null && (data as any).code === 0) {
        researcherTable.value.splice(scope, 1)
        notice("success", "成功", "删除成功！");
      }
    }
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入名字', trigger: 'change' }
      ],
      surname: [
        { required: true, message: '请输入姓氏', trigger: 'change' }
      ],
      email: [
        { required: true, message: '请输入邮箱'},
        { type: 'email', message: '邮箱格式不正确' }
      ],
      institution: [
        { required: true, message: '请输入隶属机构', trigger: 'change' }
      ],
      address: [
        { required: true, message: '请输入地址', trigger: 'change' }
      ],
      appellation: [
        { required: true, message: '请选择称谓', trigger: 'change' }
      ],

    })
    onMounted(async () => {
      const data = await getTeamInfo();
      if (data != null && (data as any).code === 0) {
        tableData.value = data.data;
      }
    });

    return {
      rules,
      uuid,
      inputForm,
      tableData,
      researcherTable,
      add,
      Index,
      operateType,
      addClick,
      updateClick,
      addResearcherClick,
      updateResearcherClick,
      deleteResearcherClick
    };
  },
});
</script>

<style lang="scss" scoped>
.team {
  padding-left: 20px;
}

.title1 {
  margin-top: 50px;
  display: flex;
  align-items: flex-end
}
</style>