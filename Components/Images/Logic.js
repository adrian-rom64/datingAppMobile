// import * as Permissions from 'expo-permissions'
import MD5 from 'react-native-md5'
import Api from '../../Api'
import { Alert } from 'react-native'

export const alert = (message, title = 'Error', button = 'Okay') => {
  Alert.alert(title, message, [{ text: button }])
}

export const parseServerResponse = (data) => {
  return {
    id: data.id,
    url: data.attributes.file_url,
    main: data.attributes.main,
    loading: false,
    hasImage: true
  }
}

export const verifyPermissions = async () => {
  // const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  // if (result.status === 'granted') return true
  // if (result.status !== 'granted') {
  //   alert('You need to grant camera roll permission', 'Insufficient permissions!')
  //   return false
  // }
  return true
}

export const uploadImage = async (uri) => {
  const match = /\.(\w+)$/.exec(uri.split('/').pop())
  const type = match ? `image/${match[1]}` : `image`

  // %TODO return when extension is invalid

  const extension = type.split('/')[1]
  const md5 = MD5.str_md5(Date.now().toString())
  const userId = Math.random() // %TODO get real id

  const name = `${userId}-${md5}.${extension}`
  const file = { uri, name, type }

  const form = new FormData()
  form.append('image[file]', file, 'image.png')

  try {
    const res = await fetch(`${Api().apiUrl}/images`, {
      method: 'POST',
      body: form,
      headers: { 
        'Content-Type': 'multipart/form-data',
        ...(await Api().authHeader())
      }
    })
    if (res.status === 201) {
      console.log('Image uploaded')
      return await res.json()
    } else {
      console.log('Error while uploading image')
    }
  }
  catch (err) {
    return null
  }
}

const appendEmptyImages = (images) => {
  const IMAGES_COUNT = 6

  const emptyImage = {
    id: null,
    url: null,
    main: false,
    loading: false,
    hasImage: false
  }

  if (images.length > 6) {
    images = images.slice(0,6)
  }

  for (let i = images.length; i < IMAGES_COUNT; i += 1) {
    images.push(emptyImage)
  }

  return images
}

export const getImages = async () => {
  const res = await Api().get('/images')
  if (!res.ok) {
    alert('Couldn\'t download images')
    return []
  }
  const images = res.data.data.map(item => parseServerResponse(item))

  return appendEmptyImages(images)
}

export const appendImage = (response, setCollection, index) => {
  setCollection(collection => {
    const newCollection = collection.map(item => ({ ...item }))
    const newItem = parseServerResponse(response.data)
    newCollection[index] = newItem
    return newCollection
  })
}

export const updateAttributeByIndex = (key, value, selectedIndex, setCollection) => {
  setCollection(collection => {
    const selectedItem = { ...collection[selectedIndex] }
    selectedItem[key] = value
    return collection.map((item, index) => {
      if (index === selectedIndex) return selectedItem
      return item
    })
  })
}

export const deleteImage = async (id) => {
  const res = await Api().delete(`/images/${id}`)
  if (res.status === 422) return true // %TODO Remove later
  return res.ok
}

export const setAsMain = async (id) => {
  const res = await Api().put(`/images/${id}/set_as_main`)
  return res.ok
}

export const unMarkMainImage = (setCollection) => {
  setCollection(collection => {
    return collection.map(item => ({ ...item, main: false }))
  })
}
