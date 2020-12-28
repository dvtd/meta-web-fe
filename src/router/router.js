import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import RequestList from '../views/RequestList'
import RequestDetails from '@/views/RequestDetails'
import UserProfile from '@/views/UserProfile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'requestlist',
        name: 'RequestList',
        component: RequestList
      },
      {
        path: 'requestdetail',
        name: 'RequestDetails',
        component: RequestDetails
      },
      {
        path: 'userprofile',
        name: 'UserProfile',
        component: UserProfile
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
