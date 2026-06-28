import { useState, useCallback } from "react";
import equal from "fast-deep-equal";

export function useDeepState<T>(initialValue: T) {
  const [state, setState] = useState(initialValue);
  const [changeCount, setChangeCount] = useState(0);

  const setDeepState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next =
          typeof value === "function"
            ? (value as (prev: T) => T)(prev)
            : value;

        if (!equal(prev, next)) {
          setChangeCount((c) => c + 1);
          return next;
        }

        return prev;
      });
    },
    []
  );

  return [state, setDeepState, changeCount] as const;
}