const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

type ButtonType = typeof ButtonTypes[number]

type O = {
    [key: string]: 1 | 2 | 3;
}
const obj: O = {a: 1, b: 2, c: 3}
type test = typeof obj[number]