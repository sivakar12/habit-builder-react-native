import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import styled from 'styled-components/native';

import { AppContext } from './State';
import { Habit } from './Types';

type HabitListPropType = { 
    children: React.ReactNode | React.ReactNode[],
}

type HabitPropType = { 
    habit: Habit,
    onIncrement: () => void,
    onSelect: () => void,
    index: number
}

const PlusButtonText = styled.Text`
    fontSize: ${props => props.theme.fontSizes[1]};
    color: ${props => props.index % 2 == 0 ? props.theme.colorPalette.backgroundDarker : props.theme.colorPalette.background};
    fontFamily: 'PatuaOne_400Regular';
    paddingBottom: 4px;
`

const PlusButton = styled.View`
    backgroundColor: ${props => props.theme.colorPalette.accent};
    alignItems: center;
    textAlign: center;
    aspectRatio: 1;
    borderRadius: 100;
`

const HabitName = styled.Text`
    fontSize: ${props => props.theme.fontSizes[1]};
    fontFamily: 'PatuaOne_400Regular';
    color: ${props => props.theme.colorPalette.primary};
`

const HabitLogCount = styled.Text`
padding: ${props => props.theme.padding}px;
fontSize: ${props => props.theme.fontSizes[1]};
fontFamily: 'PatuaOne_400Regular';
color: ${props => props.theme.colorPalette.primary};
`;

const HabitItemLine = styled.View`
flexDirection: row;
justifyContent: space-between;
alignItems: center;
padding: ${props => props.theme.padding}px;
fontSize: ${props => props.theme.fontSizes[1]};
backgroundColor: ${props => props.index % 2 == 0 ? props.theme.colorPalette.backgroundDarker : props.theme.colorPalette.background};

`

const HabitItem = ({ habit, onIncrement, onSelect, index }: HabitPropType) => {
    const habitNameDisplay = habit.archived ? `${habit.name} (archived)` : habit.name

    return (
        <HabitItemLine index={index}> 
            <TouchableOpacity style={{flexGrow: 1}} onPress={onSelect}>
                <HabitName>{habitNameDisplay}</HabitName>
            </TouchableOpacity>
            <HabitLogCount>{habit.logs.length}</HabitLogCount>
            <TouchableOpacity onPress={onIncrement}>
                <PlusButton>
                    <PlusButtonText index={index}>+</PlusButtonText>
                </PlusButton>
            </TouchableOpacity>
        </HabitItemLine>
    )
}

const HabitList = ({ children }: HabitListPropType) => {
    return (
        <View style={{ flex: 1}}>
            {children}
        </View>
    )
}

type  HabitListViewPropType = {
    onHabitSelect: (habitId: string) => void,
    showArchives: boolean
}
const HabitListView = (props: HabitListViewPropType) => {
    const {state: habits, dispatch} = useContext(AppContext);
    const habitsToDisplay = props.showArchives ? 
        habits : habits.filter(habit => !habit.archived)
    return (
        <ScrollView style={{ flex: 1}}>
            <HabitList>
                {habitsToDisplay.map((habit, index) => {
                    const onIncrementHandler = () => {
                        dispatch({type: 'INCREMENT_HABIT', habitId: habit.id})
                        if (Platform.OS === 'android' || Platform.OS === 'ios') {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        }
                    }
                    return (
                        <HabitItem 
                            key={habit.id}
                            habit={habit} 
                            onIncrement={onIncrementHandler}
                            onSelect={() => {props.onHabitSelect(habit.id)}}
                            index={index}
                            />
                    )
                })}
            </HabitList>
        </ScrollView>
    ) 
}

export { HabitListView as default }