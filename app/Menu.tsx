import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'

type MenuItem = {
  text: string,
  handler: () => void
}

type MenuProps = {
  open: boolean,
  items: MenuItem[],
  onClose: () => void
}

const Menu = ({ open, items, onClose }: MenuProps) => {
  return (
    <Modal style={styles.menuModal} visible={open}>
      <View style={styles.menuList}>
        <View style={styles.closeButton}>
          <Text onPress={onClose} style={styles.closeButtonText}>x</Text>
        </View>
        {items.map(item => (
          <View style={styles.menuItemView}>
            <Text onPress={() => {item.handler(); onClose(); } } style={styles.menuItemText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  menuModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    alignItems: 'center'
  },
  menuItemView: {
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  menuItemText: {
    fontSize: 20,
    textAlign: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 20
  },
  closeButtonText: {
    fontSize: 20
  }
})

export default Menu