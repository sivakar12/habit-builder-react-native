import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import { fontSizes, padding } from './StyleConstants'
import { HabitLog } from './Types'

enum PeriodType {
    Day = "Day",
    Week = "Week",
    Month = "Month",
    Year = "Year"
}

type PeriodChooserPropType = {
    periodType: PeriodType,
    onChange: (peroidType: PeriodType) => void
}
const PeriodChooser = ({ periodType: selectedPeriodType, onChange}: PeriodChooserPropType) => {
    return (
        <View style={styles.chooser}>
            {Object.values(PeriodType).map(periodType => {
                const selected = selectedPeriodType == periodType
                const style = selected ? 
                    StyleSheet.compose(styles.chooserValueText, {fontWeight: "bold"}) :
                    styles.chooserValueText
                const onPressHandler = () => { onChange(periodType) }
                return (
                    <Text style={style} key={periodType} onPress={onPressHandler}>
                        {periodType}
                    </Text>
                )
            })}
        </View>
    )
}

type PeriodChangerPropType = {
    periodType: PeriodType
    onChange: (startTime: String, endTime: String) => void
}

const PeriodChanger = (props: PeriodChangerPropType) => {
    // Doing this for day only for now
    const [startTime, setStartTime] = useState(dayjs().startOf('date'))
    const [endTime, setEndTime] = useState(dayjs().endOf('date'))
    const timeDisplay = startTime.format('MMMM D, YYYY')
    // const timeDisplay = startTime.toISOString() + ' - ' + endTime.toISOString()
    const handlePrevious = () => {
        setStartTime(startTime.subtract(1, 'day'))
        setEndTime(endTime.subtract(1, 'day'))
    }
    const handleNext = () => {
        setStartTime(startTime.add(1, 'day'))
        setEndTime(endTime.add(1, 'day'))
    }
    return (
        <View style={styles.periodChangerRow}>
            <Text style={styles.periodChangerArrow} onPress={handlePrevious}>&lt;</Text>
            <Text style={styles.periodChangerDisplay}>{timeDisplay}</Text>
            <Text style={styles.periodChangerArrow} onPress={handleNext}>&gt;</Text>
        </View>
    )
}

type ChartsPropType = {
    logs: HabitLog[]
}
const Charts = ({logs}: ChartsPropType) => {
    const [periodType, setPeriodType] = useState(PeriodType.Day)
    return (
        <View>
            <PeriodChooser 
                periodType={periodType}
                onChange={setPeriodType}
            />
            <PeriodChanger
                periodType={periodType}
                onChange={(s, e) => {}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chooser: {
        flexDirection: 'row'
    },
    chooserValueText: {
        fontSize: fontSizes[1],
        padding: padding
    },
    periodChangerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    periodChangerArrow: {
        fontSize: fontSizes[1]
    },
    periodChangerDisplay: {
        fontSize: fontSizes[1],
    }
})

export { Charts as default }