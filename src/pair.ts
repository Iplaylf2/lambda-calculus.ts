import { $true, $false } from "./boolean";

// [a, b]
// (first [a, b]) = a
// (second [a, b]) = b

export interface $Pair<T, K> {
  <U extends T | K>(f: (a: T, b: K) => U): U;
}

// [a, b] = ƛ a b. ƛ x. (x a b)
export function $pair<T, K>(a: T, b: K): $Pair<T, K> {
  return function (f) {
    return f(a, b);
  };
}

// first = ƛ pair. (pair <ƛ a b. a>)
export function first<T>(pair: $Pair<T, any>): T {
  return pair((a, _b) => a);
}

// first = ƛ pair. (pair true)
export function first_<T>(pair: $Pair<T, any>): T {
  return pair($true);
}

// second = ƛ pair. (pair <ƛ a b. b>)
export function second<T>(pair: $Pair<any, T>): T {
  return pair((_a, b) => b);
}

// second = ƛ pair. (pair false)
export function second_<T>(pair: $Pair<any, T>): T {
  return pair($false);
}

export function toNative<T, K>(x: $Pair<T, K>): [T, K] {
  return [first(x), second(x)];
}
