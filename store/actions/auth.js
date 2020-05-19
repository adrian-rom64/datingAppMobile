import {AsyncStorage} from 'react-native'
import Api from '../../Api'

export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

export const login = (email, password) => {
  return async (dispatch) => {
    const payload = { user: { email, password } }
    const res = await Api().post('/sessions', payload, { skipHandlers: true })
    if (res.ok) {
      const token = res.headers.map.authorization
      dispatch({ type: LOGIN, token })
      saveToStorage(token)
    } else {
      throw new Error('Couldn\'t log in')
    }
  }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const payload = {
      user: {
        email,
        password
      }
    }
    const res = await Api().post('/registrations', payload, { skipHandlers: true })

    if (res.ok) {
      const token = res.headers.map.authorization
      dispatch({ type: SIGNUP, token })
      saveToStorage(token)
    } else if (res.data.data.errors[0].detail === 'has already been taken') {
      throw new Error('same-email')
    } else {
      throw new Error('unknown-error')
    }
  }
}


const saveToStorage = (token) => {
  AsyncStorage.setItem('userToken', JSON.stringify({ token }))
}
