import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useHabitsData } from './Hooks';
import { padding } from './StyleConstants';
import { Habit } from './Types';

type HabitListPropType = { children: React.ReactNode | React.ReactNode[] }
type HabitPropType = { 
    habit: Habit,
    onIncrement: () => void
}

const HabitItem = ({ habit, onIncrement }: HabitPropType) => {
    // TODO: Choose color based on the index and combine it with old style
    return (
        <View style={styles.habitItem}> 
            <Text style={{flexGrow: 1}}>{habit.name}</Text>
            <Text style={styles.habitLogCount}>{habit.logs.length}</Text>
            <TouchableOpacity style={styles.habitIncrementButton} onPress={onIncrement}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const HabitList = ({ children }: HabitListPropType) => {
    return (
        <View style={styles.habitList}>
            {children}
        </View>
    )
}

const HabitListView = () => {
    const [habits, incrementHabit] = useHabitsData()
    return (
        <View style={styles.habitListView}>
            <Text>Habits Builder</Text>
            <HabitList>
                {habits.map(habit => 
                    <HabitItem habit={habit} onIncrement={() => incrementHabit(habit.id)}/>
                )}
            </HabitList>
        </View>
    ) 
}
const styles = StyleSheet.create({
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        height: 40,
        alignItems: 'center'
    },
    habitList: {
        flex: 1,
        alignItems: 'center'
    },
    habitLogCount: {
        padding: padding
    },
    habitIncrementButton: {
        backgroundColor: '#fff',
        padding: padding
    },
    habitListView: {
        flex: 1,
        alignItems: 'center'
    }
})

export { HabitListView as default }