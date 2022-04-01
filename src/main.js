import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
//axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://localhost:7258/api/' : 'https://localhost:7258/api/';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
