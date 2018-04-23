import Axios from 'axios'

export default {
  search: param => Axios.post('/api/dicionarios/', param)
}
