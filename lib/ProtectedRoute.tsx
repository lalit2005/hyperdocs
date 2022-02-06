import { useSession } from 'next-auth/react';
import { usePrefetch } from 'use-link-prefetch';

const ProtectedRoute: React.FC = (props) => {
  const { status } = useSession();

  const router = usePrefetch(['/login']);

  if (status === 'unauthenticated') {
    router.push(`/login/?redirectTo=${router.pathname}`);
  } else if (status === 'authenticated') {
    return <>{props.children}</>;
  }

  return null;
};

export default ProtectedRoute;
