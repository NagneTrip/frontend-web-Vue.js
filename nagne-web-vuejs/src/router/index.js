import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import SignupPage from "@/pages/Login/SignupPage.vue";
import LogoutPage from "@/pages/Login/LogoutPage.vue";
import WritePage from "@/pages/write/WritePage.vue";
import PlanWritePage from "@/pages/write/PlanWrite/PlanWritePage.vue";
import ArticleWritePage from "@/pages/write/ArticleWrite/ArticleWritePage.vue";
import ArticleModifyPage from "@/pages/write/ArticleWrite/ArticleModifyPage.vue";
import MapMainPage from "@/pages/map/MapMainPage.vue";
import FindByMapPage from "@/pages/map/FindByMapPage.vue"; 
import FindByTagPage from "@/pages/map/FindByTagPage.vue"; 
import MapSavedPage from "@/pages/map/MapSavedPage.vue"; 
import MyTripPlanPage from "@/pages/map/MyTripPlanPage.vue"; 
import UserInfoPage from "@/pages/User/UserInfoPage.vue";
import UserFollowing from "@/components/User/UserFollowing.vue";
import UserFollowers from "@/components/User/UserFollowers.vue";
import BookMarkPage from "@/pages/BookMark/BookMarkPage.vue";
import ArticleDetailPage from "@/pages/ArticleDetail/ArticleDetailPage.vue";

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
          children: [
            {
              path: ":id",
              name: "articleModify",
              component: ArticleModifyPage,
            },
          ],
        },
        {
          path: 'detail/:id',
          name: 'articleDetail',
          component: ArticleDetailPage
        }
      ],
    },
    {
      path : "/map",
      name : 'mapMain',
      component: MapMainPage,
    },
    {
      path : "/map",
      children : [
        {
          path : "find",
          name: 'mapFind',
          component: FindByMapPage
        },
        {
          path : 'tag',
          name: 'mapTag',
          component: FindByTagPage
        },
        {
          path : 'save',
          name: 'mapSave',
          component: MapSavedPage
        },
        {
          path : 'plan',
          name: 'mapPlan',
          component: MyTripPlanPage
        },
      ]
    },
    {
      path: "/plans/write",
      name: "planWrite",
      component: PlanWritePage,
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserInfoPage,
    },
    {
      path: "/bookmark",
      name: 'bookmark',
      component: BookMarkPage,
    }
  ],
});

export default router;
