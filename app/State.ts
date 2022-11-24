import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, { useEffect, useReducer } from 'react'
import { Habit, Id } from './Types'


type State = Habit[];

type Action = 
    | { type: 'INCREMENT_HABIT', habitId: Id }
    | { type: 'ADD_HABIT', habitName: string }
    | { type: 'DELETE_HABIT', habitId: Id }
    | { type: 'RENAME_HABIT', habitId: Id, newName: string }
    | { type: 'TOGGLE_ARCHIVE', habitId: Id }
    | { type: 'DELETE_LAST_ENTRY', habitId: Id }
    | { type: 'SET_HABITS', habits: Habit[] }

const habitsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'INCREMENT_HABIT':
            return state.map(habit => {
                if (habit.id === action.habitId) {
                    return {
                        ...habit,
                        logs: [
                            ...habit.logs,
                            {
                                time: dayjs().toISOString()
                            }
                        ]
                    }
                } else {
                    return habit;
                }
            });
        case 'ADD_HABIT':
            const findNextId = (state: State): Id => {
                const ids = state.map(habit => parseInt(habit.id));
                const maxId = Math.max(...ids);
                return (maxId + 1).toString();
            }
            return [
                ...state,
                {
                    id: findNextId(state),
                    name: action.habitName,
                    createdTime: dayjs().toISOString(),
                    archived: false,
                    logs: []
                }
            ];
        case 'DELETE_HABIT':
            return state.filter(habit => habit.id !== action.habitId);
        case 'RENAME_HABIT':
            return state.map(habit => {
                if (habit.id === action.habitId) {
                    return {
                        ...habit,
                        name: action.newName
                    }
                } else {
                    return habit;
                }
            });
        case 'TOGGLE_ARCHIVE':
            return state.map(habit => {
                if (habit.id === action.habitId) {
                    return {
                        ...habit,
                        archived: !habit.archived
                    }
                } else {
                    return habit;
                }
            });
        case 'DELETE_LAST_ENTRY':
            return state.map(habit => {
                if (habit.id === action.habitId) {
                    return {
                        ...habit,
                        logs: habit.logs.slice(0, habit.logs.length - 1)
                    }
                } else {
                    return habit;
                }
            });
        case 'SET_HABITS':
            return action.habits;
        default:
            return state;
    }
}

const useHabitsReducer: () => [State, React.Dispatch<Action>] = () => {
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(habitsReducer, []);
    useEffect(() => {
        AsyncStorage.getItem('habitdatalogs').then(dataString => {
            if (dataString) {
                const dataParsed = JSON.parse(dataString) as Habit[]
                dispatch({ type: 'SET_HABITS', habits: dataParsed })
            }
        })
    }, [])
    useEffect(() => {
        AsyncStorage.setItem('habitdatalogs', JSON.stringify(state))
            .catch(() => { alert('failure to save')})
    }, [state])

    return [state, dispatch]
}

const AppContext = 
    React.createContext<{ state: State, dispatch: React.Dispatch<Action>}>(
        { state: [], dispatch: () => {}});
export { Action, useHabitsReducer, AppContext }