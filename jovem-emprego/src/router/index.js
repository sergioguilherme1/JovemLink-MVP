import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import StudentDashboard from "../pages/StudentDashboard.vue";
import CompanyDashboard from "../pages/CompanyDashboard.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/student", component: StudentDashboard },
  { path: "/company", component: CompanyDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
