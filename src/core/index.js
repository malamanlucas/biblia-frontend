import Vue from 'vue'
import Loading from './components/Loading'
import Modal from './components/Modal'
import BootstrapResponsive from './components/BootstrapResponsive'

import 'jquery'
import 'font-awesome-sass-loader'
import 'bootstrap'
import './stylesheets/meta.scss'

Vue.component('loading', Loading)
Vue.component('modal', Modal)
Vue.component('bootstrap-responsive', BootstrapResponsive)
