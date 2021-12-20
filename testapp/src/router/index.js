import Vue from "vue";
import VueRouter from "vue-router";
import VueHead from 'vue-head'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Project from "../views/Project.vue";
import ProjectDetail from '../views/ProjectDetail.vue'

Vue.use(VueHead)
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
  },
  { 
    path: '/project/:id', 
    component: ProjectDetail,
    name: 'ProjectDetail'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
