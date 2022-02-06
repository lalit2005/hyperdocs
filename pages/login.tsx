import PrimaryLayout from '@/layouts/PrimaryLayout';
import { RedirectToDashboard } from '@/lib/redirect';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GitHub } from 'react-feather';

const Login = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <PrimaryLayout title='Login to your account'>
      <RedirectToDashboard />
      <div className='text-center'>
        <button
          onClick={() =>
            signIn('github', {
              callbackUrl: `${router.query.redirectTo || '/dashboard'}`,
            })
          }
          className='mt-10 rounded text-invert px-5 py-2 text-lg hover:opacity-90'>
          <GitHub className='inline-block mr-2' /> Sign in with GitHub
        </button>
      </div>
    </PrimaryLayout>
  );
};

export default Login;
