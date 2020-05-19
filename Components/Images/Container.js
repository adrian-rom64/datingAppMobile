import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import ImagePicker from './ImagePicker'
// import * as Picker from 'expo-image-picker';
import * as Logic from './Logic'

const UserImages = () => {
  const [images, setImages] = useState([{}, {}, {}, {}, {}, {}])
  const [_, setPermission] = useState(false)

  useEffect(() => {
    (async () => {
      setPermission(await Logic.verifyPermissions())
      setImages(await Logic.getImages())
    })()
  }, [])

  const uploadImageHandler = async (index) => {
    const image = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (image.cancelled) return

    Logic.updateAttributeByIndex('loading', true, index, setImages)
    const result = await Logic.uploadImage(image.uri)
    Logic.updateAttributeByIndex('loading', false, index, setImages)

    if (!result) return Logic.alert('Couldn\'t upload image')

    Logic.appendImage(result, setImages, index)
  }

  const deleteHandler = async (id, index) => {
    const tempUrl = images[index].url
    Logic.updateAttributeByIndex('url', null, index, setImages)
    Logic.updateAttributeByIndex('loading', true, index, setImages)
    if (images[index].main) {
      Logic.updateAttributeByIndex('main', false, index, setImages)
    }
    const result = await Logic.deleteImage(id)
    Logic.updateAttributeByIndex('loading', false, index, setImages)
    if (!result) {
      Logic.alert('Image couldn\'t be deleted')
      Logic.updateAttributeByIndex('url', tempUrl, index, setImages)
    }
  }

  const setAsMainHandler = async (id, index) => {
    const result = Logic.setAsMain(id)
    if (result) {
      Logic.unMarkMainImage(setImages)
      Logic.updateAttributeByIndex('main', true, index, setImages)
    }
  }

  const mapImages = (arr, startPosition) => {
    return arr.map((image, index) => (
      <ImagePicker
        key={`image-${index}`}
        position={index + startPosition}
        {...image}
        uploadHandler={() => uploadImageHandler(index + startPosition)}
        deleteHandler={() => deleteHandler(image.id, index + startPosition)}
        setAsMainHandler={() => setAsMainHandler(image.id, index + startPosition)}
      />
    ))
  }

  const topRow = mapImages(images.slice(0,3), 0)
  const bottomRow = mapImages(images.slice(3,6), 3)

  return (
    <View>
      <View style={styles.container}>
        {topRow}
      </View>
      <View style={styles.container}>
        {bottomRow}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserImages
