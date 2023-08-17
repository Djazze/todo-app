// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from "@/views/Home.vue";
// import Register from '../views/Register.vue';
// import Login from '../views/Login.vue';

// const routes = [
//   { path: '/', name: "Home", component: Home },
//   { path: '/register', name: "Register", component: Register },
//   { path: '/login', name: "Login", component: Login }
//   // Add more routes as needed
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
  ],
});

export default router;