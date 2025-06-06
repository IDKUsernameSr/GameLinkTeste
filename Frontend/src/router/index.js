// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views or pages
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Login from '../views/Login.vue'
import Categoria from '../views/Categoria.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/login', component: Login },
  { path: '/categoria', component: Categoria },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router