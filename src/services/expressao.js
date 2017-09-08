import Axios from 'axios'

export default {
  searchExpressaoByTermo: param => Axios.post('/api/expressao/search', param)
}
