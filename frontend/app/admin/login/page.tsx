'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!email || !password) {
    setError('Email and password are required');
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Login failed');
    }

    const data = await response.json();
    const token = data.token;

    // Simpan token ke localStorage
    localStorage.setItem('token', token);
    router.push('/');
  } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Unexpected error occurred');
  }
}

};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Selamat Datang Rafi!</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
