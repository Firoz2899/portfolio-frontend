import { type DependencyList, useEffect, useRef } from "react";

export function useDebounceTrigger(
  callback: () => void | Promise<void>,
  delay: number,
  dependencies: DependencyList
) {
  const callbackRef = useRef<any | null | undefined>(undefined)
  useEffect(() => {
    const timer = setTimeout(() => {
      const res = callback();
      if(callbackRef.current){
        callbackRef.current = res;
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      if(callbackRef.current){
        callbackRef.current?.();
      }
    }
  }, [...dependencies, delay]);
}