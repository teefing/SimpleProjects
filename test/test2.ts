type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Exclude1<T, U> = T extends U ? never : T;
type Omit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface IMain {
  a: string,
  b: number,
  c: object
}

interface ISub {
  a: string,
  b: number
}

type pick = Pick1<IMain, "a" | "b">
type exclude = Exclude1<"a" | "b" | "c", "a">