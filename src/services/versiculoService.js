import Axios from 'axios'

export default {
  search: capitulo => Axios.get('/api/versiculos/', {
    params: {
      livroId: capitulo.key.livroId,
      capituloId: capitulo.key.id
    }
  }),
  find: versiculoKey => Axios.post('/api/versiculos/find', versiculoKey)
}
