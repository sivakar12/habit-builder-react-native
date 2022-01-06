import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, PatuaOne_400Regular } from '@expo-google-fonts/patua-one';
import { useFonts as useFonts2, PassionOne_400Regular } from '@expo-google-fonts/passion-one';

import HabitListView from './app/HabitListView';
import HabitDetailView from './app/HabitDetailView';
import HeaderBar from './app/HeaderBar';
import { AppContext, makeInitialContextData } from './app/State';
import Menu from './app/Menu';
import { colorPalette } from './app/StyleConstants';

export default function App() {

  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  const contextData = makeInitialContextData()

  const menuItems = [
    {
      text: 'New Habit',
      handler: () => {
        if (Platform.OS === 'web') {
          const habitName = prompt('Enter name of new habit')
          if (habitName) {
            contextData.addHabit(habitName)
          }
        } else {
          Alert.prompt('Name', 'Enter name of habit', (habitName) => {
            if (habitName) {
              contextData.addHabit(habitName)
            }
          })
        }
      }
    },
    {
      text: 'Export data',
      handler: () => {}
    },
    {
      text: 'Load sample data',
      handler: () => {
        contextData.loadSampleData()
      }
    },
    {
      text: 'Show archived habits',
      handler: () => {}
    },
  ]

  let [fontsLoaded] = useFonts({PatuaOne_400Regular})
  let [fontsLoaded2] = useFonts2({PassionOne_400Regular})
  if (!(fontsLoaded && fontsLoaded2)) {
    return <AppLoading/>
  }
  return (
    <AppContext.Provider value={contextData}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderBar 
          title="Habit Builder"
          showBack={selectedHabit !== null}
          handleBack={() => setSelectedHabit(null)}
          handleMenu={() => setShowMenu(showMenu => !showMenu)}
          />
        { 
          (selectedHabit) ? 
          <HabitDetailView habitId={selectedHabit}/> : 
          <HabitListView onHabitSelect={setSelectedHabit}/> 
        }
        <Menu open={showMenu} items={menuItems} onClose={() => { setShowMenu(false) }}/>
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colorPalette[0]
  }
})