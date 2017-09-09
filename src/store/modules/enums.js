
import { SET_IDIOMAS } from '../mutation-types'
import enumsService from '@/services/enums'

const state = {
  idiomas: null
}

const mutations = {
  [SET_IDIOMAS]: (state, payload) => {
    state.idiomas = payload
  }
}

const getters = {
  getIdiomas: state => state.idiomas
}

const actions = {
  loadEnums: async ({ commit }, payload) => {
    commit(SET_IDIOMAS, (await enumsService.getAllIdiomas()).data)
  }
}

export default {
  state, mutations, getters, actions
}
