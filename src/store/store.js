import Vue from 'vue'
import Vuex from 'vuex'
import { requestList } from './modules/requestList'
import { staffList } from './modules/staffList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    requestList,
    staffList
  }
})
