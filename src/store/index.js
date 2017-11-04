import Vue from 'vue'
import Vuex from 'vuex'
import bibliaModule from './modules/bibliaModule'
import enumsModule from './modules/enumsModule'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // bibliaModule,
    // enumsModule
  },
  strict: debug,
  plugins: [createPersistedState()]
})
