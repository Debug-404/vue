<template>
  <el-menu :router="true" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Menu />
        </el-icon>
        <span>信息管理</span>
      </template>
      <el-menu-item-group title="学生">
        <el-menu-item index="/Backstage/">基本信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="学科">
        <el-menu-item index="/Backstage/course">成绩汇总</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Setting />
        </el-icon>
        <span>账号管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Backstage/admin">修改密码</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5" @click="userQuit">退出登录</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import { Menu, Setting } from "@element-plus/icons-vue";
import { removeToKen } from "../utils/userCookie.js";
import { useRouter } from "vue-router";
import { useStore } from "../stores";

const router = useRouter();
const Store = useStore();
const userQuit = () => {
  router.push({
    path: "/",
  });
  Store.removeUser();
  removeToKen();
};
</script>
<style scoped></style>
