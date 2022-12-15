import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { colorPalette } from './StyleConstants'

type AboutProps = {
    onClose: () => void
}

const About = ({ onClose }: AboutProps) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Chase points to build new habits</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: colorPalette['background'],
    height: '100%',
    alignItems: 'center',
  },
  closeButton: {

  }
})

export default About