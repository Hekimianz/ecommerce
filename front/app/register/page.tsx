'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    if (password !== confPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!res.ok) {
      const text = await res.json();
      setError(text.message);
      setLoading(false);
      throw new Error(text || 'Register failed');
    }
    setError(null);
    setLoading(false);
    router.push('/login');
  }
  return (
    <main className="min-h-screen flex items-start justify-center">
      <form
        className="w-full max-w-sm space-y-4 text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-serif-var border-b pb-4">Register</h1>
        {error && <span className="text-red-300">{error}</span>}
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border border-white/30 px-3 py-2 mt-4"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border border-white/30 px-3 py-2"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded border border-white/30 px-3 py-2"
          required
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />

        <Button
          className="font-serif font-bold text-xl cursor-pointer mt-10 w-full h-10"
          disabled={
            email.length == 0 ||
            password.length == 0 ||
            confPassword.length == 0 ||
            loading
          }
        >
          {loading ? (
            <LoaderCircle
              className="animate-spin"
              style={{ width: 25, height: 25 }}
            />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </main>
  );
}
