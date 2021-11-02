import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import initialData from './InitialData';
import { padding } from './StyleConstants';
import { Habit } from './Types';

type HabitListPropType = { habits: Habit[] }
type HabitPropType = { habit: Habit }

const HabitItem = ({ habit }: HabitPropType) => {
    // TODO: Choose color based on the index and combine it with old style
    return (
        <View style={styles.habitItem}> 
            <Text style={{flexGrow: 1}}>{habit.name}</Text>
            <Text style={styles.habitLogCount}>{habit.logs.length}</Text>
            <TouchableOpacity style={styles.habitIncrementButton} onPress={() => {}}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const HabitList = ({ habits }: HabitListPropType) => {
    return (
        <View style={styles.habitList}>
            {habits.map(habit => 
                <HabitItem habit={habit}/>
            )}
        </View>
    )
}

const HabitListView = () => {
    const [habits, setHabits] = useState(initialData)
    return (
        <View style={styles.habitListView}>
            <Text>Habits Builder</Text>
            <HabitList habits={habits}/>
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