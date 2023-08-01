import axios from "axios"
import { ElLoading } from "element-plus"
import { getToKen } from "./userCookie.js"
import { hint } from "@/components/hint"

let loading = null

const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
})
// 添加请求拦截器
http.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  let token = getToKen()
  if (token) {
    config.headers.token = token
  }
  loading = ElLoading.service({
    text: "加载中",
  })
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  loading.close()
  return response["data"]
}, function(error) {
  // 对响应错误做点什么
  hint("Error", "请求超时请稍后重试", "error")
  loading.close()
  return Promise.reject(error)
})

export default http