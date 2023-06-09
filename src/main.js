import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";
import Company from "@/views/CompanyDetails.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Details",
    path: "/details/:id",
    component: Details,
  },
  {
    name: "Company",
    path: "/company/:id",
    component: Company,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
