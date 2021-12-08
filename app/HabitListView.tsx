import { property } from 'lodash';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from './State';
import { padding, fontSizes } from './StyleConstants';
import { Habit } from './Types';

type HabitListPropType = { children: React.ReactNode | React.ReactNode[] }
type HabitPropType = { 
    habit: Habit,
    onIncrement: () => void
    onSelect: () => void
}

const HabitItem = ({ habit, onIncrement, onSelect }: HabitPropType) => {
    const handleOnPress = () => {
        onSelect()
    }
    return (
        <View style={styles.habitItem}> 
            <Text style={styles.habitNameText} onPress={handleOnPress}>{habit.name}</Text>
            <Text style={styles.habitLogCount}>{habit.logs.length}</Text>
            <TouchableOpacity onPress={onIncrement}>
                <Text style={styles.habitIncrementButton}>+</Text>
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

type  HabitListViewPropType = {
    onHabitSelect: (habitId: string) => void
}
const HabitListView = (props: HabitListViewPropType) => {
    const {habits, incrementHabit} = useContext(AppContext);
    return (
        <View style={styles.habitListView}>
            <HabitList>
                {habits.map(habit => {
                    const onIncrementHandler = () => incrementHabit(habit.id)
                    return (
                        <HabitItem 
                            key={habit.id}
                            habit={habit} 
                            onIncrement={onIncrementHandler}
                            onSelect={() => {props.onHabitSelect(habit.id)}}
                            />
                    )
                })}
            </HabitList>
        </View>
    ) 
}
const styles = StyleSheet.create({
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: padding,
        fontSize: fontSizes[1]
    },
    habitList: {
        flex: 1,
    },
    habitLogCount: {
        padding: padding,
        fontSize: fontSizes[1],
        paddingHorizontal: padding,
        fontWeight: 'bold'
    },
    habitIncrementButton: {
        backgroundColor: '#fff0',
        fontSize: fontSizes[1],
        paddingHorizontal: padding
    },
    habitNameText: {
        fontSize: fontSizes[1],
        flexGrow: 1
    },
    habitListView: {
        flex: 1
    },
    title: {
        fontSize: fontSizes[0],
        alignSelf: 'center'
    }
})

export { HabitListView as default }