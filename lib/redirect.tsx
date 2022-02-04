import { useSession } from 'next-auth/react';
import { usePrefetch } from 'use-link-prefetch';

export const RedirectToDashboard = () => {
  const router = usePrefetch(['/dashboard']);
  const { status } = useSession();

  if (status == 'authenticated') {
    router.push('/dashboard');
  }

  return null;
};
