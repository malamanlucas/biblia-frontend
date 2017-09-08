import { SET_CAPITULO, SET_LIVRO, SET_CAPITULOS } from '../mutation-types'
import capituloService from '@/services/capitulo'

const state = {
  livro: null,
  capitulo: null,
  capitulos: []
}

const mutations = {
  [SET_LIVRO]: (state, payload) => {
    state.livro = payload
  },
  [SET_CAPITULO]: (state, payload) => {
    state.capitulo = payload
  },
  [SET_CAPITULOS]: (state, payload) => {
    state.capitulos = payload
  }
}

const getters = {
  getLivro: state => state.livro,
  getCapitulo: state => state.capitulo,
  getCapitulos: state => state.capitulos
}

const actions = {
  setLivro: ({ commit, dispatch }, payload) => {
    commit(SET_LIVRO, payload)
    dispatch('getCapitulos')
  },
  setCapitulo: ({ commit }, payload) => commit(SET_CAPITULO, payload),
  getCapitulos: async ({ commit, getters }) => {
    const capitulos = (await capituloService.getCapitulos(getters.getLivro.id)).data

    commit(SET_CAPITULOS, capitulos)
  }
}

export default {
  state, mutations, getters, actions
}
