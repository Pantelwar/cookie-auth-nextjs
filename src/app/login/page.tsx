'use client';
import { GuestGuard } from '@/components/guest-guard';
import { useAuth } from '@/hooks/auth';
import { useRef } from 'react';

export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  return (
    <GuestGuard>
      <form
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const username = usernameRef.current?.value;
          const password = passwordRef.current?.value;

          console.log({ username, password });
          login();
        }}
      >
        <label>Username</label>
        <input type='text' name='username' ref={usernameRef} />

        <label>Password</label>
        <input type='password' name='password' ref={passwordRef} />

        <button type='submit'>Login</button>
      </form>
    </GuestGuard>
  );
}
