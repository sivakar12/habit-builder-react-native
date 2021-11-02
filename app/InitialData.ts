import dayjs from "dayjs";
import { Habit } from "./Types";


// TODO: Refactor date transformations
const habits: Habit[] = [
    {
        id: '1',
        name: 'Drink Water',
        createdTime: dayjs(new Date()).toISOString(),
        archived: false,
        logs: []
    },
    {
        id: '2',
        name: 'Do Planks',
        createdTime: dayjs(new Date()).toISOString(),
        archived: false,
        logs: [
            {
                time: dayjs(new Date(2020, 10, 5, 12, 11, 23)).toISOString()
            },
            {
                time: dayjs(new Date(2020, 10, 6, 7, 10, 43)).toISOString()
            }
        ]
    },
    {
        id: '3',
        name: 'Meditate',
        createdTime: dayjs(new Date()).toISOString(),
        archived: false,
        logs: [
            {
                time: dayjs(new Date(2020, 11, 2, 12, 11, 23)).toISOString()
            },
            {
                time: dayjs(new Date(2020, 12, 2, 12, 11, 23)).toISOString()
            },
            {
                time: dayjs(new Date(2020, 12, 3, 12, 34, 3)).toISOString()
            },
            {
                time: dayjs(new Date(2020, 12, 4, 7, 12, 3)).toISOString()
            }
        ]
    }
]

export { habits as default } 