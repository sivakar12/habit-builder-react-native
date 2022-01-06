import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colorPalette } from './StyleConstants'

type HeaderBarProps = {
  title: string
  showBack: boolean,
  handleBack: () => void,
  handleMenu: () => void
}

const HeaderBar = ({ title, showBack, handleBack, handleMenu }: HeaderBarProps) => {
  return (
    <View style={styles.headerBar}>
      <View style={styles.backButtonContainer}>
        { showBack && <Text onPress={handleBack} style={styles.backButtonText}>&lt;</Text> }
      </View>
      <Text style={styles.headerBarText}>{title}</Text>
      <View style={styles.menuButtonContainer}>
        <Text onPress={handleMenu} style={styles.menuButtonText}>⋮</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colorPalette[0],
    paddingHorizontal: 10
  },
  backButtonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'PassionOne_400Regular',
    color: 'white'
  },
  menuButtonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'PassionOne_400Regular',
    color: 'white'
  },
  headerBarText: {
    fontSize: 40,
    fontFamily: 'PassionOne_400Regular',
    color: 'white'
  },
  menuButtonContainer: {
    // width: 100
  },
  backButtonContainer: {
    // width: 100
  }
})

export default HeaderBar