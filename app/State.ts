import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import sampleData from './SampleData'
import { Habit, HabitLog, Id } from './Types'

interface HabitBuilderContext {
    habits: Habit[],
    incrementHabit: (habitId: Id) => void,
    getHabitById: (habitId: Id) => Habit | null,
    addHabit: (habitName: string) => void,
    deleteHabit: (habitId: Id) => void,
    renameHabit: (habitId: Id, newName: string) => void,
    toggleArchiveForHabit: (habitId: Id) => void,
    loadSampleData: () => void
}

const AppContext = React.createContext<HabitBuilderContext>({
    habits: [],
    incrementHabit: (habitId: Id) => {},
    getHabitById: (habitId: Id) => null,
    addHabit: (habitName: string) => {},
    deleteHabit: (habitId: Id) => {},
    renameHabit: (habitId: Id, newName: string) => {},
    toggleArchiveForHabit: (habitId: Id) => {},
    loadSampleData: () => {}
});

const makeInitialContextData = () => {
    const [habits, setHabits] = useState<Habit[]>([])
    
    useEffect(() => {
        AsyncStorage.getItem('habitdatalogs').then(dataString => {
            if (dataString) {
                const dataParsed = JSON.parse(dataString) as Habit[]
                setHabits(dataParsed)
            }
        })
    }, [])
    useEffect(() => {
        AsyncStorage.setItem('habitdatalogs', JSON.stringify(habits))
            .catch(() => { alert('failure to save')})
    }, [habits])

    const incrementHabit = (habitId: Id) => {
        const newHabits = habits.map(habit => {
            if (habit.id === habitId) {
                const log: HabitLog = {
                    time: dayjs().toISOString()
                }
                return {...habit, logs: [...habit.logs, log]}
            } else {
                return habit
            }
        })
        setHabits(newHabits)
    }

    const getHabitById = (habitId: Id) => {
        return habits.filter(h => h.id === habitId)[0]
    }

    const addHabit = (habitName: string) => {
        const habit: Habit = {
            id: habits.length.toString(),
            name: habitName,
            createdTime: dayjs().toISOString(),
            archived: false,
            logs: []
        }
        setHabits([...habits, habit])
    }

    const deleteHabit = (habitId: Id) => {
        const newHabits = habits.filter(h => h.id !== habitId);
        setHabits(newHabits)
    }

    const renameHabit = (habitId: Id, newName: string) => {
        const newHabits = habits.map(habit => {
            if (habit.id === habitId) {
                return {...habit, name: newName}
            } else {
                return habit
            }
        })
        setHabits(newHabits)
    }

    const toggleArchiveForHabit = (habitId: Id) => {
        const newHabits = habits.map(habit => {
            if (habit.id === habitId) {
                return {...habit, archived: !habit.archived}
            } else {
                return habit
            }
        })
        setHabits(newHabits);
    }


    const loadSampleData = () => {
        setHabits(sampleData)
    }

    return {
        loadSampleData,
        habits,
        incrementHabit,
        getHabitById,
        addHabit,
        setHabits,
        deleteHabit,
        renameHabit,
        toggleArchiveForHabit
    }
}

export { AppContext, makeInitialContextData }