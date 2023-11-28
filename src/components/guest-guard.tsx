'use client';

import { useAuth } from '@/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = searchParams.get('return');
      router.replace(returnUrl || `/private`);
    }
  }, [isAuthenticated, router, searchParams]);

  return children;
}
