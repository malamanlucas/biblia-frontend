import Axios from 'axios'

export default {
  getCapitulos: livroId => Axios.get('/api/capitulos/', {
    params: {
      livroId: livroId
    }
  })
}
