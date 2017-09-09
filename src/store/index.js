import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import biblia from './modules/biblia'
import enums from './modules/enums'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    biblia,
    enums
  },
  strict: debug,
  plugins: [createPersistedState()]
})
