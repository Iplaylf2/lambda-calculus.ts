import { $true, $false, $Boolean } from "./boolean";
import { $pair, $Pair, first, second } from "./pair";

//  0 = ƛ f x. x
//  1 = ƛ f x. (f x)

export interface $Numeral {
  <T>(f: (x: T) => T, x: T): T;
}

//  0 = ƛ f x. x
export function $0<T>(_f: (x: T) => T, x: T): T {
  return x;
}

//  1 = ƛ f x. x
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

//  successor =  ƛ n. ƛ f x. (f (n f x))
export function succ(n: $Numeral): $Numeral {
  return function (f, x) {
    return f(n(f, x));
  };
}

//  plus = ƛ a b. ƛ f x. (a f (b f x))
export function plus(a: $Numeral, b: $Numeral): $Numeral {
  return function (f, x) {
    return a(f, b(f, x));
  };
}

//  plus = ƛ a b. (a succ b)
export function plus_(a: $Numeral, b: $Numeral): $Numeral {
  return a(succ, b);
}

//  multiple = ƛ a b. ƛ f x. (a <ƛ x. (b f x)> x)
//  =  ƛ a b. ƛ f x. (a (b f) x)
//  =  ƛ a b. ƛ f. (a (b f))
export function mult(a: $Numeral, b: $Numeral): $Numeral {
  return function (f, x) {
    return a((x) => b(f, x), x);
  };
}

//  multiple = ƛ a b. (a <ƛ n. (plus b n)> 0)
//  = (a (plus b) 0)
export function mult_(a: $Numeral, b: $Numeral): $Numeral {
  return a((n) => plus(b, n), $0);
}

//  power = ƛ a e. ƛ f x. ((e <ƛ n. ƛ x.(a n x)> f) x)
//  = ƛ a e. ƛ f x. ((e a f) x)
//  = ƛ a e. e a
export function pow(a: $Numeral, e: $Numeral): $Numeral {
  return function (f, x) {
    type T = typeof x;
    return e((n) => (x: T) => a(n, x), f)(x);
  };
}

//  power = ƛ a e. (e <ƛ n. (mult a n)> 1)
//  = ƛ a e. (e (mult a) 1)
export function pow_(a: $Numeral, e: $Numeral): $Numeral {
  return e((n) => mult(a, n), $1);
}

//  predecessor = ƛ n. ƛ f x. (second (n <ƛ p. (pair false (((first p) <ƛ x. x> f) (second p)))> (pair true x)))
//  = ƛ n. ƛ f x. ()
export function pred(n: $Numeral): $Numeral {}

//  predecessor = ƛ n. ƛ f x.
//    (second (n
//      <ƛ p.
//        (pair
//          false
//          (((first p) <ƛ x. x> f)
//            (second p)))>
//      (pair true x)))
export function pred_(n: $Numeral): $Numeral {
  return function (f, x) {
    type T = typeof x;
    return second(
      n(
        (p: $Pair<$Boolean, T>) =>
          $pair($false, first(p)((x: T) => x, f)(second(p))),
        $pair($true, x)
      )
    );
  };
}
