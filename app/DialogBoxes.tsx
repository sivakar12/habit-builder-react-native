import React from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";

type NewHabitDialogProps = {
    onSubmit: (habitName: string) => void,
    onDismiss: () => void,
}
const NewHabitDialog = ({ onDismiss, onSubmit }: NewHabitDialogProps) => {
    const [habitName, setHabitName] = React.useState('');
    return (
        <View>
            <Dialog.Container visible={true}>
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

type RenameHabitDialogProps = {
    onSubmit: (habitName: string) => void,
    onDismiss: () => void,
    oldName: string
}

const RenameHabitDialog = ({ oldName, onDismiss, onSubmit }: RenameHabitDialogProps) => {
    const [habitName, setHabitName] = React.useState(oldName);
    return (
        <View>
            <Dialog.Container visible={true}>
                <Dialog.Title>Rename Habit</Dialog.Title>
                <Dialog.Description>
                    Give the new name
                </Dialog.Description>
                <Dialog.Input onChangeText={setHabitName} defaultValue={habitName}/>
                <Dialog.Button onPress={onDismiss} label="Cancel" />
                <Dialog.Button onPress={() => onSubmit(habitName)} label="Rename" />
            </Dialog.Container>
        </View>
    )
}

type DeleteConfirmationDialogProps = {
    onSubmit: () => void,
    onDismiss: () => void,
}

const DeleteConfirmationDialog = ({ onDismiss, onSubmit }: DeleteConfirmationDialogProps) => {
    return (
        <View>
            <Dialog.Container visible={true}>
                <Dialog.Title>Delete Habit</Dialog.Title>
                <Dialog.Description>
                    Are you sure you want to delete this habit?
                </Dialog.Description>
                <Dialog.Button onPress={onDismiss} label="Cancel" />
                <Dialog.Button onPress={onSubmit} label="Delete" />
            </Dialog.Container>
        </View>
    )
}

export { NewHabitDialog, RenameHabitDialog, DeleteConfirmationDialog };