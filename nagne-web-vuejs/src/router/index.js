import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import LogoutPage from "@/pages/Login/LogoutPage.vue";
import WritePage from "@/pages/write/WritePage.vue";
import PlanWritePage from "@/pages/write/PlanWrite/PlanWritePage.vue";
import ArticleWritePage1 from "@/pages/write/ArticleWrite/ArticleWritePage1.vue";
import ArticleWritePage2 from "@/pages/write/ArticleWrite/ArticleWritePage2.vue";
import ArticleWritePage3 from "@/pages/write/ArticleWrite/ArticleWritePage3.vue";
import ArticleWritePage4 from "@/pages/write/ArticleWrite/ArticleWritePage4.vue";
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
      path: "/articles/write",
      name: "articleWrite",
      children : [
        {path: "1", name: 'articleWrite1', component: ArticleWritePage1},
        {path: "2", name: 'articleWrite2', component: ArticleWritePage2},
        {path: "3", name: 'articleWrite3', component: ArticleWritePage3},
        {path: "4", name: 'articleWrite4', component: ArticleWritePage4},
      ]
    },
    {
      path: "/plans/write",
      name: "planWrite",
      component: PlanWritePage,
    },
  ],
});

export default router;
