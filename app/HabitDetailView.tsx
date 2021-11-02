import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { AppContext } from './Context';
import { fontSizes, padding } from './StyleConstants';
const HabitDetailView = () => {
    const routeData = useRoute()
    const navigate = useNavigation()

    const habitId = routeData.params?.habitId as Id
    const { getHabitById } = useContext(AppContext)
    const habit = getHabitById(habitId)

    const handleGoBack = () => { navigate.goBack() }

    return (
        <View>
            <View style={styles.topBar}>
                <Text style={styles.closeButton} onPress={handleGoBack}>x</Text>
                <Text style={styles.habitName}>Habit: {habit? habit.name: 'Unknown'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailScreen: {
        flex: 1
    },
    closeButton: {
        fontSize: fontSizes[1]
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    habitName: {
        fontSize: fontSizes[0],
        alignSelf: 'center'
    }
})

export { HabitDetailView as default }