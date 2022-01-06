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
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colorPalette[0]
  },
  backButtonText: {
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  menuButtonText: {
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  headerBarText: {
    fontSize: 40,
    textAlignVertical: 'center'
  },
  menuButtonContainer: {
    // width: 100
  },
  backButtonContainer: {
    // width: 100
  }
})

export default HeaderBar