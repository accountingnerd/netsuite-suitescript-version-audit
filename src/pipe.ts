/* eslint-disable @typescript-eslint/no-explicit-any -- generic helper types need any */
type AnyFn = (arg: any) => any;

// Checks that each fn accepts the previous output.
// On a mismatch, it swaps in the expected signature so TS reports an error at that argument.
type Chain<In, Fns extends AnyFn[], Acc extends AnyFn[] = []> = Fns extends [
  infer F extends AnyFn,
  ...infer Rest extends AnyFn[],
]
  ? [In] extends [Parameters<F>[0]]
    ? Chain<ReturnType<F>, Rest, [...Acc, F]>
    : [...Acc, (arg: In) => unknown, ...Rest]
  : Acc;

type PipeResult<In, Fns extends AnyFn[]> = Fns extends [
  ...any[],
  infer Last extends AnyFn,
]
  ? ReturnType<Last>
  : In;

export function pipe<In, Fns extends AnyFn[]>(
  data: In,
  ...fns: Fns & Chain<In, Fns>
): PipeResult<In, Fns> {
  return (fns as AnyFn[]).reduce<any>((acc, fn) => fn(acc), data);
}
