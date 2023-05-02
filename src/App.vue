<template>
  <router-view></router-view>
</template>

<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
import { ElLoading } from "element-plus";

let loadingInstance = null;

const loading = ref(false);

onBeforeMount(() => {
  loadingInstance = ElLoading.service({
    text: "加载中",
  });
});

onMounted(() => {
  loadingInstance.close();
});

onBeforeUpdate(() => {
  loadingInstance = ElLoading.service({
    text: "加载中",
  });
});

onUpdated(() => {
  loadingInstance.close();
});

onBeforeUnmount(() => {
  loadingInstance = ElLoading.service({
    text: "加载中",
  });
});

onUnmounted(() => {
  loadingInstance.close();
});
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}
</style>
