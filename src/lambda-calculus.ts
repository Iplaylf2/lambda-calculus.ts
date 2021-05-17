export {
  $Boolean,
  $true,
  $false,
  and,
  or,
  not,
  toNative as toBoolean,
} from "./boolean";
export { $Pair, $pair, first, second, toNative as toPair } from "./pair";
export {
  $Numeral,
  $n,
  succ,
  plus,
  mult,
  pow,
  pred_,
  toNative as toNumber,
} from "./numeral";
