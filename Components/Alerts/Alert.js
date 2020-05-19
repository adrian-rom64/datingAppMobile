import { actions } from './store'
import { store } from '../../App'

const alert = (payload) => {
  store.dispatch({ type: actions.FIRE, payload })
}

export default alert
