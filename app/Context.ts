import React, { useState } from 'react'
import initialData from './InitialData'
import { Habit, HabitLog, Id } from './Types'

interface HabitBuilderContext {
    habits: Habit[],
    incrementHabit: (habitId: Id) => void,
    getHabitById: (habitId: Id) => Habit | null
}

const AppContext = React.createContext<HabitBuilderContext>({
    habits: [],
    incrementHabit: (habitId: Id) => {},
    getHabitById: (habitId: Id) => null
});

const makeInitialContextData = () => {
    const [habits, setHabits] = useState<Habit[]>(initialData)

    const incrementHabit = (habitId: Id) => {
        const newHabits = habits.map(habit => {
            if (habit.id === habitId) {
                const log: HabitLog = {
                    time: new Date()
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

    return {
        habits,
        incrementHabit,
        getHabitById
    }
}

export { AppContext, makeInitialContextData }