<template>
  <div>
    <el-descriptions :column="3" border class="margin-top" size="Default">
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><User /></el-icon>
            学号
          </div>
        </template>
        {{ stu.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><UserFilled /></el-icon>
            姓名
          </div>
        </template>
        {{ stu.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon><School /></el-icon>
            学院
          </div>
        </template>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div>
    <el-table
      :border="true"
      :data="studentData"
      height="250"
      stripe
      style="width: 100%"
    >
      <el-table-column label="课程名字" prop="courseName" width="180" />
      <el-table-column label="课程编号" prop="scoreId" width="180" />
      <el-table-column label="课程成绩" prop="courseScore" width="180" />
      <el-table-column label="学分" prop="Num" />
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getOneStudentScore } from "../../utils";
import { User, UserFilled, School } from "@element-plus/icons-vue";

let stu = reactive({
  id: "",
  name: "",
});
const route = useRoute();
let studentData = ref();
onMounted(async () => {
  const data = await getOneStudentScore(route.params.id);
  stu.id = data["data"]["info"][0][0];
  stu.name = data["data"]["info"][0][1];
  console.log(data["data"]);
  studentData.value = data["data"]["grade"].map((val) => {
    return {
      courseName: val[0],
      scoreId: val[1],
      courseScore: val[2],
      Num: val[3],
    };
  });
});
</script>

<style scoped></style>
