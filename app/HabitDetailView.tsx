import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { AppContext } from './Context';
import { fontSizes, padding } from './StyleConstants';
import { HabitLog } from './Types';

type LogListProps = {
    logs: HabitLog[]
}

const LogListItem = ({ log }: { log: HabitLog}) => {
    return (
        <View style={styles.logListItem}>
            <Text style={styles.logListItemText}>
                {log.time.toISOString()}
            </Text>
        </View>
    )
}

const LogList = ({ logs }: LogListProps) => {
    return (
        <FlatList
            data={logs}
            renderItem={({item}) => <LogListItem log={item}/>}
            keyExtractor={log => log.time.getMilliseconds().toString()}
        />
    )
}
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
            <LogList logs={habit.logs}/>
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
    },
    logList: {

    },
    logListItem: {
        flexDirection: 'row',
        padding: padding,
    },
    logListItemText: {
        fontSize: fontSizes[1]
    }
})

export { HabitDetailView as default }