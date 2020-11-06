type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Partial
// Required
// ReadOnly
// Pick

