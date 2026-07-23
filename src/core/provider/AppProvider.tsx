import React from 'react'
import {View} from 'react-native'
import { GStyles } from '../constance/styles'

export default function AppProvider({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <View style={GStyles.flex}>
      {children}
    </View>
  )
}