import { useEffect, useRef } from "react";

interface UseIntervalWhenOptions {
  when: boolean;
  ms: number;
  startImmediately?: boolean | number;
}

export const useIntervalWhen = (
  callback: () => void,
  condition: UseIntervalWhenOptions
): void => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startDelay =
      condition.startImmediately === true
        ? 1
        : typeof condition.startImmediately === "number"
          ? condition.startImmediately
          : 100;

    const timeoutId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (condition.when) {
          callback();
        }
      }, condition.ms);
    }, startDelay);

    if (!condition.when && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      clearTimeout(timeoutId);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    callback,
    condition.ms,
    condition.when,
    condition.startImmediately,
  ]);
};