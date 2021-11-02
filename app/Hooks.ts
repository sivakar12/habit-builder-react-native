import { useState } from "react"
import initialData from "./InitialData"
import { Habit, HabitLog } from "./Types"

const useHabitsData = (): [Habit[], (habitId: string) => void] => {
    const [habits, setHabits] = useState(initialData)
    const incrementHabit = (habitId: string) => {
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
    return [habits, incrementHabit]
}

export { useHabitsData }