const { concat, of } = require("rxjs");

const a$ = of(1, 2, 3);
const b$ = of(4, 5, 6);
concat(a$, b$).subscribe(console.log);
