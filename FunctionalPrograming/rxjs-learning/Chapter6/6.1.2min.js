const { of } = require("rxjs");
const { count, min } = require("rxjs/operators");

const initialReleaseS$ = of(
  { name: "RxJS", year: 2011 },
  { name: "React", year: 2013 },
  { name: "Redux", year: 2015 }
);

const min$ = initialReleaseS$.pipe(min((a, b) => a.year - b.year));

min$.subscribe(console.log);
