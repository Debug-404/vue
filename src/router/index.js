import { createRouter, createWebHistory } from 'vue-router'
import { getToKen } from "@/utils/userCookie";
import { hint } from "@/components/hint";

const routes = [
  {
    path: "/",
    name: '登录',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/Backstage",
    component: () => import("../views/Backstage/Backstage.vue"),
    children: [
      {
        path: '',
        name: "学生信息",
        component: () => import("../views/Backstage/Content.vue"),
        meta: {
          title: "学生信息"
        }

      },
      {
        path: "StudentScore/:id",
        name: "个人成绩",
        component: () => import("../views/Backstage/oneScore.vue"),
        meta: {
          title: "个人成绩"
        }
      },
      {
        path: "course",
        name: "课程信息",
        component: () => import("../views/Backstage/Course.vue"),
        meta: {
          title: "课程信息"
        }
      },
      {
        path: "courseScore/:id",
        name: "课程成绩",
        component: () => import("../views/Backstage/allScore.vue"),
        meta: {
          title: "课程成绩"
        }
      },
      {
        path: "admin",
        name: "修改密码",
        component: () => import("../views/changePassword/index.vue"),
        meta: {
          title: "修改密码"
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/404/404.vue"),
    meta: {
      title: "页面不存在"
    }
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