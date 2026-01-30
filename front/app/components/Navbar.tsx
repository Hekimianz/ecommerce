'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';

export default function Navbar() {
  const { ready, isAuthenticated, user, logout } = useAuth();

  if (!ready) return null;

  return (
    <div className="flex font-zain items-center justify-between px-5 py-5 shadow-lg border-b border-white/20 mb-10 text-xl ">
      <Link href="/" className="font-dancing text-3xl font-bold select-none">
        Commonplace
      </Link>

      {isAuthenticated ? (
        <nav className="flex items-center gap-3">
          <Link className="hover:text-primary" href="profile">
            {user?.email}
          </Link>
          <button
            onClick={logout}
            className="cursor-pointer hover:text-primary"
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav className="flex items-center gap-3">
          <Link className="hover:text-primary" href="/login">
            Login
          </Link>
          <Link className="hover:text-primary" href="/register">
            Register
          </Link>
        </nav>
      )}
    </div>
  );
}
