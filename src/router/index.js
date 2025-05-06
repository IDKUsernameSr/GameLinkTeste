// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views or pages
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router