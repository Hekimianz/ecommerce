'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';

export default function Navbar() {
  const { ready, isAuthenticated, user, logout } = useAuth();

  if (!ready) return null;

  return (
    <div className="flex items-center justify-between px-10 py-5">
      <Link href="/">Commonplace</Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-80">{user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
