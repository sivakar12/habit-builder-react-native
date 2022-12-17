import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import styled from 'styled-components/native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

import { AppContext } from './State';
import { colorPalette, fontSizes, padding } from './StyleConstants';
import Charts from './Charts'


const LogListStyled = styled.FlatList`
    backgroundColor: ${props => props.theme.colorPalette.background}

`
const LogListItemStyled = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    padding: ${props => props.theme.padding}px
`

const LogListItemTextStyled = styled.Text`
    fontSize: ${props => props.theme.fontSizes[1]};
    fontFamily: 'PatuaOne_400Regular';
    paddingHorizontal: ${props => props.theme.padding}px;
    color: ${props => props.theme.colorPalette.primary};
`
type LogListProps = {
    timestampsSortedDown: number[]
}

const LogListItem = ({ millisecond }: { millisecond: number}) => {
    const absoluteTime = dayjs(millisecond).format('lll')
    const relativeTime = dayjs(millisecond).fromNow()
    return (
        <LogListItemStyled>
            <LogListItemTextStyled>
                {absoluteTime}
            </LogListItemTextStyled>
            <LogListItemTextStyled>
                {relativeTime}
            </LogListItemTextStyled>
        </LogListItemStyled>
    )
}

const LogList = ({ timestampsSortedDown }: LogListProps) => {
    return (
        <LogListStyled
            data={timestampsSortedDown}
            renderItem={({item}) => <LogListItem millisecond={item}/>}
            keyExtractor={ms => ms.toString()}
        />
    )
}

type HabitDetailViewPropTypes = {
    habitId: string
}
const HabitDetailView = ({ habitId }: HabitDetailViewPropTypes) => {
    
    const { state: habits, dispatch } = useContext(AppContext)
    const habit = habits.filter(habit => habit.id === habitId)[0]
    if (!habit) {
        return <View><Text>404</Text></View>
    }
    const timestampsSortedDown: number[] =
        habit.logs.map(l => (new Date(l.time)).getTime()).sort((a, b) => b - a)

    return (
        <View style={styles.detailScreen}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.bigNumber}>
                {habit.logs.length}
            </Text>
            <Charts timestampsSortedDown={timestampsSortedDown}/>
            <LogList timestampsSortedDown={timestampsSortedDown}/>
        </View>
    )
}

const styles = StyleSheet.create({
    detailScreen: {
        flex: 1,
        alignItems: 'stretch'
    },
    bigNumber: {
        fontFamily: 'PatuaOne_400Regular',
        fontSize: 100,
        textAlign: 'center',
        backgroundColor: colorPalette['primary'],
        color: colorPalette['background'],
    },
    habitName: {
        textAlign: 'center',
        fontFamily: 'PatuaOne_400Regular',
        fontSize: fontSizes[0],
        backgroundColor: colorPalette['primary'],
        color: colorPalette['background'],
    },
    logList: {
    },
    logListItem: {
        
    },
    logListItemText: {
        
    }
})

export { HabitDetailView as default }