import { useRoute } from '@react-navigation/core'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { AppContext } from './Context';
const HabitDetailView = () => {
    const routeData = useRoute();
    const habitId = routeData.params?.habitId as Id
    const { getHabitById } = useContext(AppContext)
    const habit = getHabitById(habitId)
    return (
        <View>
            <Text>Habit: {habit? habit.name: 'Unknown'}</Text>
        </View>
    )
}

export { HabitDetailView as default }