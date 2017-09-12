import { SET_CAPITULO, SET_LIVRO,
         SET_CAPITULOS, SET_TOGGLE_EXPRESSAO } from '../mutation-types'
import capituloService from '@/services/capitulo'
import { OPERATION_EXPRESSAO } from '@/enums'

const state = {
  livro: null,
  capitulo: null,
  capitulos: [],
  toggleExpressao: null
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
  },
  [SET_TOGGLE_EXPRESSAO]: (state, payload) => {
    state.toggleExpressao = payload
  }
}

const getters = {
  getLivro: state => state.livro,
  getCapitulo: state => state.capitulo,
  getCapitulos: state => state.capitulos,
  getLivroTestamento: (state, getters) => {
    let livro = getters.getLivro

    return livro ? livro.testamento : null
  },
  getIdiomasAllowed: (state, getters) => {
    let testamento = getters.getLivroTestamento

    if (testamento) {
      if (testamento.novo) {
        return [testamento.idioma]
      }

      return getters.getIdiomas.filter(i => i !== 'GREGO')
    }

    return []
  },
  toggleExpressao: state => state.toggleExpressao,
  hasPermissionToWriteExpressao: state => state.toggleExpressao === OPERATION_EXPRESSAO.WRITE
}

const actions = {
  setLivro: async ({ commit, dispatch }, payload) => {
    await dispatch('reset')
    commit(SET_LIVRO, payload)
    dispatch('getCapitulos')
  },
  setCapitulo: ({ commit }, payload) => commit(SET_CAPITULO, payload),
  getCapitulos: async ({ commit, getters }) => {
    const capitulos = (await capituloService.getCapitulos(getters.getLivro.id)).data

    commit(SET_CAPITULOS, capitulos)
  },
  reset: ({commit}) => {
    commit(SET_CAPITULO, null)
    commit(SET_CAPITULOS, null)
    commit(SET_LIVRO, null)
  }
}

export default {
  state, mutations, getters, actions
}
