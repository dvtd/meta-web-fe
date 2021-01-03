import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import RequestList from '../views/RequestList'
import RequestDetails from '@/views/RequestDetails'
import StaffManagement from '@/views/StaffManagement'
import SchoolList from '../views/SchoolList'
import Login from '../views/Login.vue'
import SummaryTimetable from '../views/SummaryTimetable'
import TimetableDetails from '../views/TimetableDetails'

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
        path: 'staffmanagement',
        name: 'StaffManagement',
        component: StaffManagement
      },
      {
        path: 'schoolList',
        name: 'SchoolList',
        component: SchoolList
      },
      {
        path: '/login',
        name: 'Login',
        component: Login},
        {
        path: 'summarytimetable',
        name: 'SummaryTimetable',
        component: SummaryTimetable
      },
      {
        path: 'timetabledetails',
        name: 'TimetableDetails',
        component: TimetableDetails
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
