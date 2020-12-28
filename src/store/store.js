import Vue from 'vue'
import Vuex from 'vuex'
import { requestList } from './modules/requestList'
import { userprofile } from './modules/userprofile'

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
    userprofile
  }
})
