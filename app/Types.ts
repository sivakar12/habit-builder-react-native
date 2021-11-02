type Id = string;
type DateString = string;

type Habit = {
    id: Id,
    name: string,
    createdTime: DateString,
    archived: boolean,
    logs: HabitLog[]
}

type HabitLog = {
    time: DateString
}

type Orders = Id[]

export { Id, Habit, HabitLog, Orders }