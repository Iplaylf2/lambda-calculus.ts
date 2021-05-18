import { $Boolean, $false, $true, and } from "./boolean";
import { $pair, $Pair, first, second } from "./pair";

//  0 = ƛ f x. x
//  1 = ƛ f x. f x

export interface $Numeral {
  <T>(f: (x: T) => T, x: T): T;
}

//  0 = ƛ f x. x
export function $0<T>(_f: (x: T) => T, x: T): T {
  return x;
}

//  1 = ƛ f x. f x
export function $1<T>(f: (x: T) => T, x: T): T {
  return f(x);
}

export function $n(n: number): $Numeral {
  return function (f, x) {
    let result = x;
    for (let i = 0; i !== n; i++) {
      result = f(result);
    }
    return result;
  };
}

export function toNative(x: $Numeral): number {
  return x((x) => x + 1, 0);
}

//  successor =  ƛ n. ƛ f x. f (n f x)
export function succ(n: $Numeral): $Numeral {
  return function (f, x) {
    return f(n(f, x));
  };
}

//  plus = ƛ a b. ƛ f x. a f (b f x)
export function plus(a: $Numeral, b: $Numeral): $Numeral {
  return function (f, x) {
    return a(f, b(f, x));
  };
}

//  plus = ƛ a b. a succ b
export function plus_(a: $Numeral, b: $Numeral): $Numeral {
  return a(succ, b);
}

//  multiplication = ƛ a b. ƛ f x. a <ƛ x. (b f x)> x
//  =  ƛ a b. ƛ f x. a (b f) x
//  =  ƛ a b. ƛ f. a (b f)
export function mult(a: $Numeral, b: $Numeral): $Numeral {
  return function (f, x) {
    return a((x) => b(f, x), x);
  };
}

//  multiplication = ƛ a b. a <ƛ n. (plus b n)> 0
//  = ƛ a b. a (plus b) 0
export function mult_(a: $Numeral, b: $Numeral): $Numeral {
  return a((n) => plus(b, n), $0);
}

//  exponentiation = ƛ n e. ƛ f x. (e <ƛ m. ƛ x.(n m x)> f) x
//  = ƛ n e. ƛ f x. (e n f) x
//  = ƛ n e. e n
export function exp(n: $Numeral, e: $Numeral): $Numeral {
  return function (f, x) {
    type T = typeof x;
    return e((m) => (x: T) => n(m, x), f)(x);
  };
}

//  exponentiation = ƛ n e. ƛ f x. e F X I
//  n = 0; X I = 1
//  n = 1; (F X) I = n
//  n = 2; (F (F X)) I = n * n
//  try X = f, I = x; then F = ƛ xf. ƛ x. n xf x
//  ------

//  exponentiation = ƛ n e. e <ƛ m. (mult n m)> 1
//  = ƛ n e. e (mult n) 1
export function exp_(n: $Numeral, e: $Numeral): $Numeral {
  return e((m) => mult(n, m), $1);
}

//  predecessor = ƛ n. ƛ f x. n F X I
//  n = 0; X I = 0; x; 0 ≦ n
//  n = 1; (F X) I = 0; x
//  n = 2; (F (F X)) I = n - 1; f x
//  X = F X, F contains f;
//  try X = ƛ _. x, I = ƛ x. x; then F = ƛ xf. ƛ i. i (xf f)
//  predecessor = ƛ n. ƛ f x. (n <ƛ xf. ƛ i. i (xf f)> <ƛ _. x>) <ƛ x. x>
export function pred(n: $Numeral): $Numeral {
  return function (f, x) {
    type T = typeof x;
    return n(
      (xf) => (i) => i(xf(f)),
      (_: (x: T) => T) => x
    )((x: T) => x);
  };
}

//  predecessor = ƛ n. ƛ f x.
//    first (n
//      <ƛ p.
//        pair
//          (second p)
//          (f (second p))>
//      (pair x x))
//  = ƛ n. ƛ f x.
//    first (n
//      <ƛ p.
//        (<ƛ m. pair m (f m)>
//          (second p))>
//      <ƛ _. x>)
export function pred_(n: $Numeral): $Numeral {
  return function (f, x) {
    type T = typeof x;
    return first(
      n(
        (p: $Pair<T, T>) => ((m) => $pair(m, f(m)))(second(p)),
        ((_: any) => x) as $Pair<T, T>
      )
    );
  };
}

//  subtraction = ƛ a b. b pred a
export function minus(a: $Numeral, b: $Numeral) {
  return b(pred, a);
}

//  is-zero = ƛ n. (n <ƛ _. false> true)
export function isZero(n: $Numeral): $Boolean {
  return n((_) => $false, $true);
}

//  less-than-or-equal-to = ƛ a b. is-zero (minus a b)
export function leq(a: $Numeral, b: $Numeral): $Boolean {
  return isZero(minus(a, b));
}

//  equality = ƛ a b. and (leq a b) (leq b a)
export function eq(a: $Numeral, b: $Numeral): $Boolean {
  return and(leq(a, b), leq(b, a));
}
