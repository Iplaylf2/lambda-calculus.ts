import { $n, mult, plus, pow, pred_, toNumber } from "lambda-calculus";

const $4 = $n(4);
const $2 = $n(2);

console.log(toNumber(plus($4, $2)));
console.log(toNumber(mult($4, $2)));
console.log(toNumber(pow($4, $2)));
console.log(toNumber(pred_($4)));
