type GetOnlyFnKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}
type GetOnlyFnProps<T extends object> = {
  [K in keyof GetOnlyFnKeys<T>] : T[K]
}

type MixType = {
  a: number
  func: () => void
}

type Res
