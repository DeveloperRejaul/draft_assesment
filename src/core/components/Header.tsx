import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GStyles } from '../constance/styles';
import { typography } from '../constance/typography';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
}

export default function Header({ title, rightComponent, leftComponent }: HeaderProps) {
  return (
    <View style={styles.container}>
      {leftComponent}
      <Text style={typography.title_xs_bold}>{title}</Text>
      {rightComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    paddingTop: 40,
    paddingBottom: 20,
    ...GStyles.rowBetween
  }
})