// 提取promise中的泛型
type UnGenericPromiseT<T extends Promise<any>> = T extends Promise<infer U> ? U : never