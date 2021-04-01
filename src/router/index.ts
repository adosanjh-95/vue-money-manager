import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Month from "../views/Month.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/common-transactions",
    name: "Common Transactions",
    component: () =>
      /* webpackChunkName: "common-transactions" */ import(
        "../views/TransactionsCommon.vue"
      ),
  },
  {
    path: "/:id",
    name: "Month",
    component: Month,
    props: true,
    meta: { hide: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
