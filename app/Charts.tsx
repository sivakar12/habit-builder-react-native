import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
    }
})

export { Charts as default }