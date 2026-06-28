import { type DependencyList, type EffectCallback, useEffect, useRef } from "react";
import equal from "fast-deep-equal";

// export function useDeepCompareEffect(
//   effect: EffectCallback,
//   deps: DependencyList
// ) {
//   const depsRef = useRef<DependencyList>(deps);

//   if (!equal(depsRef.current, deps)) {
//     depsRef.current = deps;
//   }

//   useEffect(effect, [depsRef.current]);
// }


function useDeepCompareMemoize<T extends DependencyList>(deps: T): T {
  const ref = useRef(deps);

  if (!equal(ref.current, deps)) {
    ref.current = deps;
  }

  return ref.current;
}

export function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
) {
  useEffect(effect, useDeepCompareMemoize(deps));
}