import Axios from 'axios'

export default {
  searchExpressaoByTermo: param => Axios.post('/api/expressao/search', param),
  save: param => Axios.post('/api/expressao/save', param)
}
