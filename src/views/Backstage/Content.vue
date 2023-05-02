<template>
  <el-row :gutter="20" justify="space-between">
    <el-col :span="3">
      <el-input
        v-model="inputData"
        placeholder="名字查找"
        :prefix-icon="Search"
        @input="selStudent"
      />
    </el-col>
    <el-col :span="3">
      <el-button :icon="CirclePlus" type="primary" @click="addStu"
        >添加学生
      </el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" border @cell-click="pushStudentScore">
    <el-table-column label="学号" prop="id" width="150" />
    <el-table-column label="姓名" prop="name" width="120" />
    <el-table-column label="性别" prop="sex" width="120" />
    <el-table-column label="年龄" prop="age" width="120" />
    <el-table-column label="家庭住址" prop="address" />
    <el-table-column fixed="right" label="操作" width="170">
      <template #default="scope">
        <el-button
          :icon="Edit"
          size="small"
          type="primary"
          @click="changeDialog(scope)"
        >
          编辑
        </el-button>
        <el-button
          :icon="Delete"
          size="small"
          type="danger"
          @click="delStudent(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--  对话框-->
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogType === 'add' ? '新增' : '编辑'"
      draggable
      width="500px"
      @close="Clear(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        :status-icon="true"
      >
        <el-form-item :label-width="60" label="学号" prop="id">
          <el-input v-model="form.id" :disabled="prohibit" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="60" label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="60" label="性别" prop="sex">
          <el-input v-model="form.sex" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="60" label="年龄" prop="age">
          <el-input v-model="form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="60" label="住址" prop="address">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            :icon="Close"
            round
            type="danger"
            @click="
              dialogFormVisible = false;
              form.value = {};
            "
            >取消</el-button
          >
          <el-button
            :icon="CircleCheck"
            round
            type="primary"
            @click="tableConfig"
            >{{ dialogType === "add" ? "确认添加" : "确认修改" }}</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import {
  addStudent,
  deleteStudent,
  getAllStudent,
  upDataStudent,
} from "../../utils";
import { useRouter } from "vue-router";
import {
  Edit,
  Delete,
  CirclePlus,
  Search,
  Close,
  CircleCheck,
} from "@element-plus/icons-vue";
import { hint } from "../../components/hint";

let inputData = ref(""); //输入框
let tableData = ref();
let dialogFormVisible = ref(false); //是否显示对话框
let form = ref(); //临时数据
let dialogType = ref("add");
let No;
let prohibit = ref(true);
let ruleFormRef = ref();
const router = useRouter();
//编辑
const changeDialog = (scope) => {
  dialogFormVisible.value = true;
  prohibit.value = true;
  dialogType.value = "edit";
  form.value = { ...scope.row };
  No = scope.$index;
};
//axios+钩子函数 加载数据
onBeforeMount(async () => {
  const data = await getAllStudent();
  tableData.value = data["data"];
});
//要添加信息的验证规则
const rules = {
  id: [
    { required: true, message: "学号不能为空", trigger: "blur" },
    { min: 4, max: 4, message: "学号为4位", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (
          tableData.value.find(function (val) {
            return val.id === value;
          })
        ) {
          callback(new Error("学号已存在"));
        } else {
          callback();
        }
      },
      trigger: "blur",
      required: true,
    },
  ],
  name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
  sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
  age: [
    { required: true, message: "性别不能为空", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (Number(value) < 0 || Number(value) > 100) {
          callback(new Error("您的年龄有点问题"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
//确认修改 and 添加信息
const tableConfig = () => {
  dialogFormVisible.value = false;
  if (dialogType.value === "add") {
    ruleFormRef.value.validate((val) => {
      if (val) {
        addStudent(form.value).then(() => {
          tableData.value.push(form.value);
        });
      } else hint("warning", "操作失败请重新确认", "warning");
    });
  } else {
    upDataStudent(form.value).then((data) => {
      if (data["code"]) tableData.value[No] = form.value;
    });
  }
};
//清除验证提示
const Clear = (ruleFormRef) => {
  if (!ruleFormRef) {
    return;
  }
  ruleFormRef.clearValidate();
};
//激活 添加信息对话框
const addStu = () => {
  dialogFormVisible.value = true;
  dialogType.value = "add";
  form.value = {};
  prohibit.value = false;
};
// 删除学生信息
const delStudent = ({ id }) => {
  if (confirm("是否删除")) {
    deleteStudent(id).then((data) => {
      if (data["code"]) {
        let index = tableData.value.findIndex((item) => item.id === id);
        tableData.value.splice(index, 1);
      } else hint("warning", "操作失败请稍后重试", "warning");
    });
  }
};
//跳转个人信息
const pushStudentScore = (row, column) => {
  if (column.label !== "操作") {
    router.push({
      name: "个人成绩",
      params: {
        id: row.id,
      },
    });
  }
};
//模糊搜索
const selStudent = async () => {
  if (inputData.value.length > 0) {
    tableData.value = tableData.value.filter((item) =>
      item.name.match(inputData.value)
    );
  } else {
    const data = await getAllStudent();
    tableData.value = data["data"];
  }
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
