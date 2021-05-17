import { $true, $false } from "./boolean";

// [a, b]
// (first [a, b]) = a
// (second [a, b]) = b

export interface $Pair<T> {
  (f: (a: T, b: T) => T): T;
}

// [a, b] = ƛ a b. ƛ x. (x a b)
export function $pair<T>(a: T, b: T): $Pair<T> {
  return function (f) {
    return f(a, b);
  };
}

// first = ƛ pair. (pair true)
export function $first<T>(pair: $Pair<T>): T {
  return pair($true);
}

// second = ƛ pair. (pair false)
export function $second<T>(pair: $Pair<T>): T {
  return pair($false);
}

export function toNative<T>(x: $Pair<T>): [T, T] {
  return [$first(x), $second(x)];
}
