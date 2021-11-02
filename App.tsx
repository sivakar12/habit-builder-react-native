import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitListView from './app/HabitListView';
import HabitDetailView from './app/HabitDetailView';

export default function App() {
  const Stack = createNativeStackNavigator()
  Stack.Navigator.defaultProps = {
    screenOptions: {
      headerShown: false
    }
  }
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Navigator>
          <Stack.Screen 
            name="HabitList"
            component={HabitListView}
          />
          <Stack.Screen
            name="HabitDetail"
            component={HabitDetailView}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})