interface A {
  good(x: number): string
  bad(x: number): string
}

interface B extends A {
  good(x: number | string): string
  bad(x: string): string
}

// B想要继承A，必须对兼容

type C = {
  good(x: number): string
  bad(x: number): string
}

type D = C & {
  good(x: number | string): string
  bad(x: string): string
}

let d: D = {
  good(a: number) {
    return '1'
  },
  bad(a: string) {
    return '1'
  }
}