import { createWebHashHistory, createRouter } from "vue-router";
import Converter from "@/components/Converter";
import Summary from "@/components/Summary";
import All from "@/components/AllSummary"
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
  {
    path: "/summary/:id",
    name: "Summary/add",
    component: Summary,
  },
  {
    path: "/all",
    name: "AllSummary",
    component: All,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;