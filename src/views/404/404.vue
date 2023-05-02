<template>
  <el-result icon="warning" sub-title="你找的页面走丢了~" title="404">
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </template>
  </el-result>
</template>