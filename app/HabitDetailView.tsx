import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { AppContext } from './Context';
import { fontSizes, padding } from './StyleConstants';
import HabitListView from './HabitListView';
const HabitDetailView = () => {
    const routeData = useRoute()

    const habitId = routeData.params?.habitId as Id
    const { getHabitById } = useContext(AppContext)
    const habit = getHabitById(habitId)

    if (!habit) {
        return <View><Text>404</Text></View>
    }

    return (
        <View style={styles.detailScreen}>
            <Text style={styles.bigNumber}>
                {habit.logs.length}
            </Text>
            <Text style={styles.habitName}>{habit.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    detailScreen: {
        flex: 1,
        alignItems: 'center'
    },
    bigNumber: {
        fontSize: 100
    },
    habitName: {
        fontSize: fontSizes[0],
        alignSelf: 'center'
    }
})

export { HabitDetailView as default }