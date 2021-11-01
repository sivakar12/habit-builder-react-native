type Id = string;

type Habit = {
    id: Id,
    name: string,
    createdTime: Date,
    archived: boolean,
    logs: HabitLog[]
}

type HabitLog = {
    time: Date
}

type Orders = Id[]
