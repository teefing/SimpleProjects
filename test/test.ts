type func1 = (a: number | string) => void
type func2 = (a: string) => void

let func1: func2 = (a) => {
  a.toLocaleString
}
let func2: func2 = a => {
  a.length
}
