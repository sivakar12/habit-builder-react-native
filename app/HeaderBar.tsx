import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type HeaderBarProps = {
  title: string
  showBack: boolean,
  handleBack: () => void
}

const HeaderBar = ({ title, showBack, handleBack }: HeaderBarProps) => {
  return (
    <View style={styles.headerBar}>
      <View style={styles.backButtonContainer}>
        { showBack && <Text onPress={handleBack} style={styles.backButtonText}>&lt;-</Text> }
      </View>
      <Text style={styles.headerBarText}>{title}</Text>
      <View style={styles.menuButtonContainer}>
        <Text style={styles.menuButtonText}>...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '100%'
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
    fontSize: 40
  },
  menuButtonContainer: {
    width: 100
  },
  backButtonContainer: {
    width: 100
  }
})

export default HeaderBar