import React from 'react'
import { Text, type TextProps, TouchableOpacity, type TouchableOpacityProps } from 'react-native'


interface ButtonProps  extends TouchableOpacityProps{
  title:string
  titleStyle?: TextProps['style']
}
export default function Button({ title, titleStyle, ...extra }: ButtonProps) {
  return (
    <TouchableOpacity {...extra}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}