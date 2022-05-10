import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sjf-non-priority",
    name: "sjfNonPriority",
    // route level code-splitting
    // this generates a separate chunk (sjf.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "sjf" */ "../views/sjfNonPriority.vue"),
  },
  {
    path: "/sjf-priority",
    name: "sjfPriority",
    // route level code-splitting
    // this generates a separate chunk (sjf.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "sjf" */ "../views/sjfPriority.vue"),
  },
  {
    path: "/do-uu-tien",
    name: "Priority",
    component: () =>
      import(
        /* webpackChunkName: "Priority" */ "../views/PriorityAlgorithm.vue"
      ),
  },
  {
    path: "/round-robin",
    name: "RoundRobin",
    component: () =>
      import(
        /* webpackChunkName: "RoundRobin" */ "../views/RoundRobin.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
