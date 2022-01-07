import React from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";

type NewHabitDialogProps = {
    onSubmit: (habitName: string) => void,
    onDismiss: () => void,
    visible: boolean
}
const NewHabitDialog = ({ visible, onDismiss, onSubmit }: NewHabitDialogProps) => {
    const [habitName, setHabitName] = React.useState('');
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>New Habit</Dialog.Title>
                <Dialog.Description>
                    Give your new habit a name
                </Dialog.Description>
                <Dialog.Input onChangeText={setHabitName}/>
                <Dialog.Button onPress={onDismiss} label="Cancel" />
                <Dialog.Button onPress={() => onSubmit(habitName)} label="Create" />
            </Dialog.Container>
        </View>
    )
}

export default NewHabitDialog;