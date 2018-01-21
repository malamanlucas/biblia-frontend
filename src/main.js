// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import VeeValidate from 'vee-validate'

import 'jquery'

import 'bootstrap-sass/assets/javascripts/bootstrap'
import 'font-awesome-sass-loader'

import router from './router'
import store from './store'

import './core'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
// Axios.defaults.baseURL = 'http://45.55.185.184:9090'
Axios.defaults.baseURL = 'http://localhost:9090'
// Axios.defaults.baseURL = 'https://www.italki.com/api'

Vue.use(VeeValidate, {
  errorBagName: 'validation',
  inject: false
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
