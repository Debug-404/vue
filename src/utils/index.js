import http from "./http.js"

export function login(user, password) {
  /**
   * @向服务端发送post登录请求 user，password作为参数
   */
  return http.post("/login", { user, password })
}

export function getAllStudent() {
  /**
   * @向服务端请求学生信息用于Vue渲染组件
   */
  return http.post("/getAllStudentInfo")
}

export function deleteStudent(user) {
  /**
   * @向服务端发送被删除的学生的信息
   */
  return http.post("/delStudent", { user })
}

export function upDataStudent(Object) {
  /**
   * @向服务端发送要修改的学生的信息
   */
  return http.post("/upDataStudent", { data: Object })
}

export function addStudent(Object) {
  /**
   * @向服务端发送要添加的学生的信息
   */
  return http.post("/addStu", { data: Object })
}

export function changePassword(user, password) {
  /**
   * @修改管理员密码
   */
  return http.post("/changePassword", { user, password })
}

export function selPassword() {
  /**
   * @校验当前密码是否一致
   */
}

export function getAllCourse() {
  /**
   * @获取每个课程的人数
   */
  return http.post("/getAllCourse")
}

export function getAllStudentScore(user) {
  /**
   * @查询单个课程全部学生成绩
   */
  return http.post("/getAllStudentScore", { user })
}

export function getOneStudentScore(user) {
  /**
   * @获取单个学生全部课程成绩
   */
  return http.post("/getOneStudentScore", { user })
}