import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import initialData from './InitialData'
import { Habit, HabitLog, Id } from './Types'

interface HabitBuilderContext {
    habits: Habit[],
    incrementHabit: (habitId: Id) => void,
    getHabitById: (habitId: Id) => Habit | null
    addHabit: (habitName: string) => void
}

const AppContext = React.createContext<HabitBuilderContext>({
    habits: [],
    incrementHabit: (habitId: Id) => {},
    getHabitById: (habitId: Id) => null,
    addHabit: (habitName: string) => {}
});

const makeInitialContextData = () => {
    const [habits, setHabits] = useState<Habit[]>(initialData)
    // TODO: Only to work on production. Disable the random generation on prod too
    // useEffect(() => {
    //     AsyncStorage.getItem('habitdatalogs').then(dataString => {
    //         if (dataString) {
    //             const dataParsed = JSON.parse(dataString) as Habit[]
    //             setHabits(dataParsed)
    //         }
    //     })
    // }, [])
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

    return {
        habits,
        incrementHabit,
        getHabitById,
        addHabit
    }
}

export { AppContext, makeInitialContextData }