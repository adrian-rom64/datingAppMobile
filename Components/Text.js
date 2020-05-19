import React from 'react'
import { Text } from 'react-native'

const TextWithFont = (props) => {
  return <Text style={{ fontFamily: 'brown-bold', ...props.style }}>{props.children}</Text>
}

export default TextWithFont