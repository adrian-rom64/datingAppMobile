import { AsyncStorage } from 'react-native'
// import { API_URL, HOSTNAME } from 'react-native-dotenv'
import { Alert } from 'react-native'

const apiUrl = 'localhost'
const hostname = 'HOSTNAME'

const authHeader = async (path) => {
  if (path === '/sessions' || path === '/registrations') return {}
  const token = await AsyncStorage.getItem('userToken')
  if (token) {
    return { Authorization: JSON.parse(token).token }
  } else {
    return {}
  }
}

const request = async (path, payload, method, options = { skipHandlers: false }) => {
  const url = apiUrl + path
  const config = {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(await authHeader(path)),
    }
  }
  try {
    const res = await fetch(url, config)
    console.log(res.status)
    if (handlers[res.status] && !options.skipHandlers) {
      handlers[res.status]()
    }
    return { ...res, data: res.status !== 204 ? await res.json() : {} }
  }
  catch (err) {
    if (!options.skipHandlers) {
      handlers[0]()
    }
    return { status: 0, data: {}, ok: false, headers: {} }
  }
}

const alert = (text) => Alert.alert('Error', text, [{ text: 'Okay' }])

const handlers = {
  0: () => {
    console.log('No connection to server')
    alert('No connection to server')
  },
  401: (res) => {
    console.log('Unauthorized')
    alert('Unauthorized')
  },
  403: (res) => {
    console.log('Forbitten')
    alert('Forbitten')
  },
  500: (res) => {
    console.log('Server error')
    alert('Server error')
  }
}

export default () => ({
  get: (path, payload, options) => request(path, payload, 'GET', options),
  post: (path, payload, options) => request(path, payload, 'POST', options),
  patch: (path, payload, options) => request(path, payload, 'PATCH', options),
  put: (path, payload, options) => request(path, payload, 'PUT', options),
  delete: (path, payload, options) => request(path, payload, 'DELETE', options),
  authHeader: () => authHeader(),
  apiUrl,
  hostname
})
