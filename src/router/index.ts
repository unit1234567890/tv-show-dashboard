import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  { path: '/show/:id', name: 'show-details', component: () => import('@/pages/ShowDetails.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
