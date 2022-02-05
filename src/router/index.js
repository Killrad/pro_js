import { createWebHistory, createRouter } from "vue-router";
import Converter from "@/components/Converter";
import Summary from "@/components/Summary";

const routes = [
  {
    path: "/",
    name: "Converter",
    component: Converter,
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;