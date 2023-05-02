import { createRouter, createWebHistory } from 'vue-router'
import { getToKen } from "../utils/userCookie.js";
import { hint } from '../components/hint.js';

const routes = [
  {
    path: "/",
    name: '登录',
    component: () => import('../views/login/login.vue')
  },
  {
    path: "/Backstage",
    component: () => import("../views/Backstage/Backstage.vue"),
    children: [
      {
        path: '',
        name: "学生信息",
        component: () => import("../views/Backstage/Content.vue")
      },
      {
        path: "StudentScore/:id",
        name: "个人成绩",
        component: () => import("../views/Backstage/oneScore.vue")
      },
      {
        path: "course",
        name: "课程信息",
        component: () => import("../views/Backstage/Course.vue")
      },
      {
        path: "courseScore/:id",
        name: "课程成绩",
        component: () => import("../views/Backstage/allScore.vue")
      },
      {
        path: "admin",
        name: "修改密码",
        component: () => import("../views/changePassword/index.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/404/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.name;
  if (!getToKen() && to.path !== "/") {
    hint("Error", "请先登录", "error")
    next({ path: "/" })
  } else if (getToKen() && to.path === "/") {
    next({ path: "/Backstage/" })
  } else {
    next()
  }
})

export default router;