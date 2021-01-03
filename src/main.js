import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
