import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/tagged',
  //   name: 'Tagged',
  //   component: () => import(/* webpackChunkName: "tagged" */ '../views/Tagged.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: () => import(/* webpackChunkName: "tagged" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
