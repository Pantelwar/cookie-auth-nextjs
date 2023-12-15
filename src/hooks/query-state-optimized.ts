'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useQueryState = <T extends Record<string, string>>(
  defaultState: T
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParmas = useSearchParams();

  const state: T = {
    ...defaultState,
    ...Object.fromEntries(searchParmas.entries()),
  };

  // initial state to query params
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(defaultState).map(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  }, [defaultState, router, pathname]);

  const setState = (stateOrFunc: T | ((state: T) => T)) => {
    if (typeof stateOrFunc === 'function') {
      const newState = stateOrFunc(state);
      const params = new URLSearchParams();
      Object.entries(newState).map(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams();
      Object.entries(stateOrFunc).map(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return [state, setState] as const;
};
