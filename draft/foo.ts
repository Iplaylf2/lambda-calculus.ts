import { $n, mult, plus, exp, minus, toNumber } from "lambda-calculus";

const $5 = $n(5);
const $2 = $n(2);

console.log(toNumber(plus($5, $2)));
console.log(toNumber(mult($5, $2)));
console.log(toNumber(exp($5, $2)));
console.log(toNumber(minus($5, $2)));
