'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useQueryState = <T extends Record<string, string>>(
  defaultState: T
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParmas = useSearchParams();

  const [state, setState] = useState<T>(defaultState);

  const [checked, setChecked] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // set initial state to query params
  useEffect(() => {
    if (!initialized) {
      const params = new URLSearchParams();

      Object.entries(defaultState).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      router.replace(`${pathname}?${params}`);
      setInitialized(true);
    }
  }, [defaultState, router, initialized, pathname]);

  // sync state on state changes
  useEffect(() => {
    const params = new URLSearchParams();

    console.log(state);
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    console.log(params.toString());

    router.replace(`${pathname}?${params}`);
  }, [state, router, checked, pathname]);

  // sync state on page refresh
  useEffect(() => {
    if (!checked && !initialized) {
      const params = new URLSearchParams(searchParmas.toString());
      setState(Object.fromEntries(params.entries()) as T);
      setChecked(true);
    }
  }, [initialized, checked, searchParmas]);

  return [
    checked ? state : defaultState,
    setState,
    checked && initialized,
  ] as const;
};
