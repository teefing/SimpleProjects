type MyExclude<T, U> = T extends U ? never : T
type MyExtract<T, U> = T extends U ? T : never
type MyNonNullable<T> = T extends (null | undefined) ? never : T
type MyReturnType<F extends (...args: any) => any> = F extends (...args: any) => infer R ? R : F
type MyInstanceType<C extends new (...args: any) => any> = C extends new (...args: any) => infer Z ? Z : any
type MyExclusive<T, U> = MyExclude<T, U> | MyExclude<U, T>

type a = MyExtract<string | number, string | boolean>

type funcType = (a: string) => string
type b = MyReturnType<funcType>

type e = MyExclusive<1 | 2 | 3, 2 | 3 | 4>
