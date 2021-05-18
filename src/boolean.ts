//  (true a b) = a;
//  (false a b) = b;
//  ƛ x. ƛ a b.(x a b)

export interface $Boolean {
  <T, K>(a: T, b: K): T | K;
}

//  true = ƛ a b. a
export function $true<T>(a: T, _b: any): T {
  return a;
}

//  false = ƛ a b. b
export function $false<T>(_a: any, b: T): T {
  return b;
}

export function toNative(x: $Boolean): boolean {
  return x(true, false);
}

//  and = ƛ a b. (a b false)
export function and(a: $Boolean, b: $Boolean): $Boolean {
  return a(b, $false);
}

//  or = ƛ a b. (a true b)
export function or(a: $Boolean, b: $Boolean): $Boolean {
  return a($true, b);
}

//  not = ƛ x. (x false true)
export function not(x: $Boolean): $Boolean {
  return x($false, $true);
}
