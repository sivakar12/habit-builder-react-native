import { Habit } from "./Types";

const habits: Habit[] = [
    {
        id: '1',
        name: 'Drink Water',
        createdTime: new Date(),
        archived: false,
        logs: []
    },
    {
        id: '2',
        name: 'Do Planks',
        createdTime: new Date(),
        archived: false,
        logs: [
            {
                time: new Date(2020, 10, 5, 12, 11, 23)
            },
            {
                time: new Date(2020, 10, 6, 7, 10, 43)
            }
        ]
    },
    {
        id: '3',
        name: 'Meditate',
        createdTime: new Date(),
        archived: false,
        logs: [
            {
                time: new Date(2020, 11, 2, 12, 11, 23)
            },
            {
                time: new Date(2020, 12, 2, 12, 11, 23)
            },
            {
                time: new Date(2020, 12, 3, 12, 34, 3)
            },
            {
                time: new Date(2020, 12, 4, 7, 12, 3)
            }
        ]
    }
]

export { habits as default } 