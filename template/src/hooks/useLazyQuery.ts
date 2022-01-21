import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

export default function useLazyQuery(key: any, fn: any, options: any = {}) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const query = useQuery(key, fn, {
    ...options,
    enabled,
  });

  return [useCallback(() => setEnabled(true), []), query];
}
