import Axios from 'axios'

export default {
  getAllIdiomas: () => Axios.get('/api/enums/idiomas')
}
