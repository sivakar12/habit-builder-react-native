import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

import { AppContext } from './Context';
import { fontSizes, padding } from './StyleConstants';
import { HabitLog } from './Types';
import Charts from './Charts'

type LogListProps = {
    logs: HabitLog[]
}

const LogListItem = ({ log }: { log: HabitLog}) => {
    const absoluteTime = dayjs(log.time).format('lll')
    const relativeTime = dayjs(log.time).fromNow()
    return (
        <View style={styles.logListItem}>
            <Text style={styles.logListItemText}>
                {absoluteTime}
            </Text>
            <Text style={styles.logListItemText}>
                {relativeTime}
            </Text>
        </View>
    )
}

const LogList = ({ logs }: LogListProps) => {
    return (
        <FlatList
            data={logs}
            renderItem={({item}) => <LogListItem log={item}/>}
            keyExtractor={log => dayjs(log.time).millisecond().toString()}
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
            <Charts logs={habit.logs}/>
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
        justifyContent: 'space-between',
        padding: padding,
    },
    logListItemText: {
        fontSize: fontSizes[1],
        paddingHorizontal: padding
    }
})

export { HabitDetailView as default }