'use client';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div>
      <button
        onClick={isAuthenticated ? logout : () => router.replace('/login')}
      >
        {isAuthenticated ? 'logout' : 'login'}
      </button>
    </div>
  );
}
