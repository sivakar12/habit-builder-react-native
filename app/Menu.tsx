import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { colorPalette } from './StyleConstants'

type MenuItem = {
  text: string,
  handler: () => Promise<any>
}

type MenuProps = {
  items: MenuItem[],
  onClose: () => void
}

const Menu = ({ items, onClose }: MenuProps) => {
  return (
    <SafeAreaView>
      <View style={styles.menuList}>
        {items.map(item => (
          <TouchableOpacity 
            key={item.text} 
            style={styles.menuItemView}
            onPress={() => {item.handler().then(onClose).catch(onClose); } } 
            >
            <Text style={styles.menuItemText}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.menuItemView}
          onPress={onClose} 
          >
          <Text style={styles.menuItemText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  menuModal: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    backgroundColor: colorPalette[0],
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    justifyContent: 'center',
  },
  menuItemView: {
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  menuItemText: {
    fontSize: 20,
    fontFamily: 'PatuaOne_400Regular',
    textAlign: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'red'
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
  }
})

export default Menu