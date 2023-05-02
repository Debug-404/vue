import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      user: localStorage.getItem("user"),
    }
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {

  },
  //可以操作异步 和 同步提交state
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem("user", user)
    },
    removeUser() {
      this.user = ''
      localStorage.clear();
    }
  }
})
