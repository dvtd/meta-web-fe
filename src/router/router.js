import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import RequestList from '../views/RequestList'
import SchoolList from '../views/SchoolList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      // {
      //   path: 'requestlist',
      //   name: 'RequestList',
      //   component: RequestList
      // }
    ]
  },
  {
    path: '/requestlist',
    name: 'RequestList',
    component: RequestList
  },
  {
    path: '/schoolList',
    name: 'SchoolList',
    component: SchoolList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
