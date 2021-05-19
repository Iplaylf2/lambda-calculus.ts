//  f = ƛ recur. ƛ X. F (recur X)
//  for, (f2 f2) X = (f (Y f)) X; then f2 = ƛ recur. ƛ X. F ((recur recur) X)
//  let recur-able = recur recur; then f2 = ƛ recur. <ƛ recur-able. ƛ X. F (recur-able X)> (recur recur)
//  ƛ recur-able. ƛ X. F (recur-able X) = ƛ recur. ƛ X. F (recur X) = f
//  f2 = ƛ recur. f (recur recur)
//  let to-recur-able = ƛ f. ƛ recur. f (recur recur)
//  f2 f2 = Y f
//  Y = ƛ f. <ƛ recur-able. recur-able recur-able> (to-recur-able f)
//  = ƛ f. <ƛ ra. ra ra> <ƛ r. f (r r)>
export function $y<T extends Function>(f: (r: T) => T): T {
  return ((rA) => rA(rA as any))((r: any) =>
    f(((...x: any[]) => r(r)(...x)) as any)
  );
}
