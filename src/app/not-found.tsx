'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/api/auth/useAuth';

export default function NotFound() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}
