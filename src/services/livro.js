import Axios from 'axios'

export default {
  getLivroByTestamento(tipoTestamento) {
    return Axios.get('/api/livros/', {
      params: {
        testamento: 'NOVO'
      }
    })
  }
}
