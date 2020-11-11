const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

type ButtonType = typeof ButtonTypes[number]