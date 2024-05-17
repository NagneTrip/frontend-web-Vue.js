import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import SignupPage from "@/pages/Login/SignupPage.vue";
import LogoutPage from "@/pages/Login/LogoutPage.vue";
import WritePage from "@/pages/write/WritePage.vue";
import PlanWritePage from "@/pages/write/PlanWrite/PlanWritePage.vue";
import ArticleWritePage from "@/pages/write/ArticleWrite/ArticleWritePage.vue";
import ArticleModifyPage from "@/pages/write/ArticleWrite/ArticleModifyPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutPage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
    },
    {
      path: "/write",
      name: "write",
      component: WritePage,
    },
    {
      path: "/articles",
      children: [
        {
          path: "write",
          name: "articleWrite",
          component: ArticleWritePage,
        },
        {
          path: "modify",
          name: "articleModify",
          component: ArticleModifyPage,
        },
      ],
    },
    {
      path: "/plans/write",
      name: "planWrite",
      component: PlanWritePage,
    },
  ],
});

export default router;
