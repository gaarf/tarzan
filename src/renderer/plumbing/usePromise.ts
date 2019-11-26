import { useState, useCallback, useEffect } from "react";

type Trigger = (...args: unknown[]) => void;
type Loading = boolean;
type AutoFn<T> = (result: T) => void;
type Auto<T> = AutoFn<T> | boolean;

export function usePromise<T>(
  factory: () => Promise<T>,
): [Trigger, Loading, Error?, T?];

export function usePromise<T>(
  factory: () => Promise<T>,
  auto: Auto<T>
): [Loading, Error?, T?];

export function usePromise<T>(factory: () => Promise<T>, auto:Auto<T> = false) {
  const [loading, setLoading] = useState<Loading>(false);
  const [error, setError] = useState<Error>();
  const [result, setResult] = useState<T>();

  const trigger = useCallback<Trigger>(() => {
    if (!loading) {
      setLoading(true);
      setError(undefined);
      factory()
        .then(setResult, setError)
        .finally(() => setLoading(false))
    }
  }, [factory]);

  useEffect(() => {
    if (auto) {
      trigger();
    }
  }, []);

  useEffect(() => {
    if (result && typeof auto === 'function') {
      auto(result);
    }
  }, [result]);

  if (auto) {
    return [loading, error, result];
  }

  return [trigger, loading, error, result];
}
