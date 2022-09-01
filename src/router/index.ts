import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/tagged',
  //   name: 'Tagged',
  //   component: () => import(/* webpackChunkName: "tagged" */ '../views/Tagged.vue')
  // },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: "addwallet" */ '../views/Activity.vue')
  },
  {
    path: '/passwords',
    name: 'Passwords',
    component: () => import(/* webpackChunkName: "addwallet" */ '../views/Passwords.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "addwallet" */ '../views/Settings.vue')
  },
  {
    path: '/swap',
    name: 'Swap',
    component: () => import(/* webpackChunkName: "addwallet" */ '../views/Swap.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    // component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
