import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/newsForCategory/:categoryId',
    name: 'NewsForCategory',
    params: true,
    component: () => import('../views/NewsForCategory.vue')
  },
  {
    path: '/newest',
    name: 'Newest',
    component: () => import('../views/Newest.vue')
  },
  {
    path: '/newsForTag/:tagId',
    name: 'NewsForTag',
    params: true,
    component: () => import('../views/NewsForTag.vue')
  },
  {
    path: '/mostViewed',
    name: 'MostViewed',
    component: () => import('../views/MostViewed.vue')
  },
  {
    path: '/singleNews',
    name: 'SingleNews',
    params: true,
    component: () => import('../views/SingleNews.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
