import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitListView from './app/HabitListView';
import HabitDetailView from './app/HabitDetailView';
import { AppContext, makeInitialContextData } from './app/Context';

export default function App() {

  const Stack = createNativeStackNavigator()
  Stack.Navigator.defaultProps = {
    screenOptions: {
      headerShown: true
    }
  }
  
  return (
    <AppContext.Provider value={makeInitialContextData()}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator>
            <Stack.Screen 
              name="HabitList"
              component={HabitListView}
              options={{ title: 'Habits' }}
            />
            <Stack.Screen
              name="HabitDetail"
              component={HabitDetailView}
              options={{ title: 'Progress' }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})