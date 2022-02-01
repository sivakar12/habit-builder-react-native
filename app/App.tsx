import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, PatuaOne_400Regular } from '@expo-google-fonts/patua-one';
import { useFonts as useFonts2, PassionOne_400Regular } from '@expo-google-fonts/passion-one';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import HabitListView from './HabitListView';
import HabitDetailView from './HabitDetailView';
import HeaderBar from './HeaderBar';
import { useHabitsReducer, Action, AppContext } from './State';
import Menu from './Menu';
import { colorPalette } from './StyleConstants';
import { DeleteConfirmationDialog, NewHabitDialog, RenameHabitDialog } from './DialogBoxes';
import { Rect } from 'victory-native';
import SampleData from './SampleData';
import { Habit, Id } from './Types';


export default function App() {

  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  const [showArchives, setShowArchives] = useState(false)
  const [DialogBoxToShow, setDialogBoxToShow] = useState<React.FunctionComponent | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  const [habits, dispatch] = useHabitsReducer()

  const getHabitById = (id: Id) => habits.filter(habit => habit.id === id)[0]


  const mainMenuItems = [
    {
      text: 'New Habit',
      handler: () => {
        if (Platform.OS === 'web') {
          const habitName = prompt('Enter name of new habit')
          if (habitName) {
            dispatch({ type: 'ADD_HABIT', habitName })
          }
        } else if (Platform.OS === 'ios' || Platform.OS == 'android') {
          const handleSubmit = (habitName: string) => {
            if (habitName.length > 0) {
              dispatch({ type: 'ADD_HABIT', habitName })
            }
            setDialogBoxToShow(null)
          }
          const DialogBox = () =>
            <NewHabitDialog onSubmit={handleSubmit} onDismiss={() => setDialogBoxToShow(null)} />
          setDialogBoxToShow(DialogBox)
        }
        return Promise.resolve()
      }
    },
    {
      text: 'Export data',
      handler: () => {
        const timeString = new Date().toISOString();
        const fileUri = FileSystem.cacheDirectory + 'habitsbuilderdata-' + timeString + '.json';
        return FileSystem.writeAsStringAsync(
              fileUri, JSON.stringify(habits, null, 2))
          .then(Sharing.isAvailableAsync)
          .then(isAvailable => {
            if (isAvailable) {
              return Sharing.shareAsync(fileUri);
            }
          })
          .catch(error => { Alert.alert(error.message); })
      }
    },
    {
      text: 'Import data',
      handler: () => {
        return DocumentPicker.getDocumentAsync()
          .then(result => {
            if (result.type == 'success') {
              // read file and parse JSON
              FileSystem.readAsStringAsync(result.uri)
              .then(fileContents => {
                const readHabits = JSON.parse(fileContents);
                dispatch({ type: 'SET_HABITS', habits: readHabits })
                Alert.alert('Habit data imported form file');
              })
            } else if (result.type == 'cancel') {
              // Alert.alert('Import cancelled');
            }
          })
          .catch(error => { console.log(error.message); Alert.alert(error.message); })
      }
    },
    {
      text: 'Load sample data',
      handler: () => {
        dispatch({ type: 'SET_HABITS', habits: SampleData })
        return Promise.resolve()
      }
    },
    {
      text: (showArchives ? 'Hide' : 'Show') + ' archived habits',
      handler: () => {
        setShowArchives(showArchives => !showArchives)
        return Promise.resolve()
      }
    },
  ]

  const habitDetailMenuItems =  selectedHabit ? [
    {
      text: 'Delete Last Entry',
      handler: () => {
        dispatch({ type: 'DELETE_LAST_ENTRY', habitId: selectedHabit })
        return Promise.resolve()
      }
    },
    {
      text: 'Rename',
      handler: () => {

        const oldName = getHabitById(selectedHabit)['name'];
        const renameHandler = (newName: string) => {
          if (newName.length > 0) {
            dispatch({ type: 'RENAME_HABIT', habitId: selectedHabit, newName })
          }
          setDialogBoxToShow(null)
        }
        const DialogBox = () =>
            <RenameHabitDialog oldName={oldName} onSubmit={renameHandler} onDismiss={() => setDialogBoxToShow(null)} />
        setDialogBoxToShow(DialogBox)
        return Promise.resolve()
      }
    },
    {
      text: getHabitById(selectedHabit).archived ? 'Unarchive':  'Archive',
      handler: () => {
        dispatch({ type: 'TOGGLE_ARCHIVE', habitId: selectedHabit });
        return Promise.resolve()
      }
    },
    {
      text: 'Delete',
      handler: () => {
        const deleteHandler = () => {
          dispatch({ type: 'DELETE_HABIT', habitId: selectedHabit })
          setDialogBoxToShow(null)
          setSelectedHabit(null)
        }
        const DialogBox = () => <DeleteConfirmationDialog onSubmit={deleteHandler} onDismiss={() => setDialogBoxToShow(null)} />
        setDialogBoxToShow(DialogBox)
        return Promise.resolve()
      }
    }
  ]: [];

  let [fontsLoaded] = useFonts({PatuaOne_400Regular})
  let [fontsLoaded2] = useFonts2({PassionOne_400Regular})
  if (!(fontsLoaded && fontsLoaded2)) {
    return <AppLoading/>
  }
  return (
    <AppContext.Provider value={{state: habits, dispatch}}>
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
          <HabitListView onHabitSelect={setSelectedHabit} showArchives={showArchives}/> 
        }
        <Menu
          open={showMenu} 
          items={selectedHabit ? habitDetailMenuItems : mainMenuItems} 
          onClose={() => { setShowMenu(false) }}
        />
        {DialogBoxToShow}
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