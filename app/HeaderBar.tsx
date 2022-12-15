import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
      <TouchableOpacity onPress={handleBack} style={styles.backButtonContainer}>
        { showBack && <Text style={styles.backButtonText}>&lt;</Text> }
      </TouchableOpacity>
      <Text style={styles.headerBarText}>{title}</Text>
      <TouchableOpacity onPress={handleMenu} style={styles.menuButtonContainer}>
        <Text style={styles.menuButtonText}>⋮</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colorPalette['background'],
    paddingHorizontal: 10
  },
  backButtonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'PassionOne_400Regular',
    color: colorPalette['accent']
  },
  menuButtonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'PassionOne_400Regular',
    color: colorPalette['accent']
  },
  headerBarText: {
    fontSize: 40,
    fontFamily: 'PassionOne_400Regular',
    color: colorPalette['accent']
  },
  menuButtonContainer: {
    width: 50,
  },
  backButtonContainer: {
    width: 50,

  }
})

export default HeaderBar