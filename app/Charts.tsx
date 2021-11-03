import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import { fontSizes, padding } from './StyleConstants'
import { HabitLog } from './Types'

enum PeriodType {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year"
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

const PeriodChanger = ({periodType, onChange}: PeriodChangerPropType) => {
    // alert('rerendering')
    // I am passing peroidType directly into dayjs startOf, endOf, add and subtract
    // functions because the string values under the enum matches what is required
    // by dayjs

    const [startTime, setStartTime] = useState(dayjs().startOf(periodType))
    const [endTime, setEndTime] = useState(dayjs().endOf(periodType))

    useEffect(() => {
        setStartTime(endTime.startOf(periodType))
        setEndTime(endTime.endOf(periodType))
    }, [periodType])

    // const timeDisplay = startTime.format('MMMM D, YYYY')
    let timeDisplay: string
    switch (periodType) {
        case PeriodType.Day:
            timeDisplay = startTime.format('MMMM D, YYYY')
            break;
        case PeriodType.Week:
            timeDisplay = startTime.format('MMMM D, YYYY') + ' : ' + endTime.format('MMMM D, YYYY')
            break;
        case PeriodType.Month:
            timeDisplay = startTime.format('MMMM YYYY')
            break;
        case PeriodType.Year:
            timeDisplay = startTime.format('YYYY')
            break;
    }
    const timeDebugDisplay = startTime.toISOString() + ' - ' + endTime.toISOString()
    const handlePrevious = () => {
        setStartTime(startTime.subtract(1, periodType))
        setEndTime(endTime.subtract(1, periodType))
        onChange(startTime.toISOString(), endTime.toISOString())
    }
    const handleNext = () => {
        setStartTime(startTime.add(1, periodType))
        setEndTime(endTime.add(1, periodType))
        onChange(startTime.toISOString(), endTime.toISOString())
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
    timestampsSortedDown: number[]
}
const Charts = ({timestampsSortedDown: time}: ChartsPropType) => {
    const [periodType, setPeriodType] = useState(PeriodType.Day)
    return (
        <View style={styles.chartContainer}>
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
    chartContainer: {
        alignContent: 'stretch'
    },
    chooser: {
        flexDirection: 'row',
        justifyContent: 'center'
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