'use client';

import { useAuth } from '@/hooks/auth';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isInitialized, isAuthenticated } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated) {
        router.replace(`/login?return=${encodeURIComponent(pathname)}`);
      } else {
        setChecked(true);
      }
    }
  }, [isInitialized, isAuthenticated, router, pathname]);

  if (!checked) return null;

  return children;
}
