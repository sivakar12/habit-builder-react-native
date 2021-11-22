import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

import HabitListView from './app/HabitListView';
import HabitDetailView from './app/HabitDetailView';
import HeaderBar from './app/HeaderBar';
import { AppContext, makeInitialContextData } from './app/State';

export default function App() {

  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  
  return (
    <AppContext.Provider value={makeInitialContextData()}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderBar 
          title="Habit Builder"
          showBack={selectedHabit !== null}
          handleBack={() => setSelectedHabit(null)}
          />
        { 
          (selectedHabit) ? 
          <HabitDetailView habitId={selectedHabit}/> : 
          <HabitListView onHabitSelect={setSelectedHabit}/> 
        }
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})