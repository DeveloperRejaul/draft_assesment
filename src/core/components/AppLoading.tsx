import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { GStyles } from '../constance/styles'

export default function AppLoading() {
  return (
    <View style ={GStyles.centerFull}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}