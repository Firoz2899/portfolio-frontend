import { type DependencyList, useEffect } from "react";

export function useDebounceTrigger(
  callback: () => void | Promise<void>,
  delay: number,
  dependencies: DependencyList
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, [...dependencies, delay]);
}