type UserTextEvent = {value: string, target: string}
type UserMouseEvent = {value: [number, number], target: number}

type UserEvent = UserTextEvent | UserMouseEvent

let event1: UserEvent = {
  value: 'aaa',
  target: 1
}