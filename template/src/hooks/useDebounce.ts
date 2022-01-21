import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: any, delay = 500) =>
{
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  useEffect(() =>
  {
    const handler = setTimeout(() =>
    {
      setDebouncedValue(value);
    }, delay);
    return () =>
    {
      clearTimeout(handler);
    };
  }, [value]);
  return debouncedValue;
};



// Trailing
export const useDebouncedCallback = (callback: (...arg: any) => void, wait = 100) =>
{
  const argsRef = useRef<any>();
  const timeout = useRef<NodeJS.Timeout>();

  function flush()
  {
    if (timeout.current)
    {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => flush, []);

  return function debouncedCallback(...args: any)
  {
    argsRef.current = args;
    flush();
    timeout.current = setTimeout(() =>
    {
      if (argsRef.current)
      {
        callback(...argsRef.current);
      }
    }, wait);
  };
};
