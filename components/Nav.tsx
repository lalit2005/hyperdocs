import Link from 'next/link';
import Logo from './Logo';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const { data, status } = useSession();
  return (
    <nav className='sticky top-0 mb-20'>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo />
        </div>
        <div>
          <ul className='space-x-10 py-5'>
            <Link href='/docs'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Docs
              </a>
            </Link>
            <Link href='/showcase'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Showcase
              </a>
            </Link>
            <Link href='/themes'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Themes
              </a>
            </Link>
            <Link href='/login'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Login
              </a>
            </Link>
            {status === 'unauthenticated' || status === 'loading' ? (
              <Link href='/signup'>
                <a className='text-invert rounded px-4 py-2'>Sign Up</a>
              </Link>
            ) : (
              <Link href='/dashboard'>
                <a className='text-invert rounded px-4 py-2'>Dashboard</a>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
