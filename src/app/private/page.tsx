'use client';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <AuthGuard>
      <h1>this is a private page</h1>
      <button
        onClick={isAuthenticated ? logout : () => router.replace('/login')}
      >
        {isAuthenticated ? 'logout' : 'login'}
      </button>
    </AuthGuard>
  );
}
