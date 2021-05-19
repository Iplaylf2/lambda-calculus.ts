import { $n, mult, plus, exp, minus, toNumber, $y } from "lambda-calculus";

const $5 = $n(5);
const $2 = $n(2);

console.log(toNumber(plus($5, $2)));
console.log(toNumber(mult($5, $2)));
console.log(toNumber(exp($5, $2)));
console.log(toNumber(minus($5, $2)));

function fact(recur: (n: number) => number) {
  return (n: number) => (n > 1 ? n * recur(n - 1) : 1);
}

console.log($y(fact)(5));
