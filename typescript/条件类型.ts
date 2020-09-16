type Extract1<T, U> = T extends U ? T : never
interface Worker {
  name: string,
  age: number,
  email: string,
  salary: number
}
interface Student {
  name: string,
  age: number,
  email: string,
  grade: number
}


type CommonKeys = Extract1<keyof Worker, keyof Student>

// typescript 中 裸类型 和 包装类型
// 裸类型构成的联合类型在进行类型的条件判断时，联合类型会自动个进行分发
// 例如对于 T extends U ? X : Y，当是A|B|C时，被解析为 (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types