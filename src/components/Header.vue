<template>
  <el-menu
    :ellipsis="false"
    class="el-menu-demo"
    menu-trigger="click"
    mode="horizontal"
  >
    <el-menu-item index="0" @click="router.push('/')"
      >学生信息管理系统</el-menu-item
    >
    <div class="flex-grow" />
    <el-menu-item index="1" @click="alert(' 欢迎使用学生信息管理系统')">
      <el-icon>
        <User />
      </el-icon>
      {{ name }}
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "@/stores";
import { User } from "@element-plus/icons-vue";

const router = useRouter();
const Store = useStore();
let name = `管理员${Store.user}`;
</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}

.is-active {
  border: transparent !important;
}
</style>
