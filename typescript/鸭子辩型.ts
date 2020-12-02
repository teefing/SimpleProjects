type DuckA = {
  name: string;
};

type DuckB = {
  name: string;
};

function testDuck(a: DuckA) {
  console.log(a);
}

let duckA: DuckA = { name: "1" };
let duckB: DuckB = { name: "2" };

testDuck(duckA);
testDuck(duckB);
