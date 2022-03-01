import Link from 'next/link';
import Logo from './Logo';
import { useSession } from 'next-auth/react';
import { Tooltip } from 'react-tiny-tooltip';

const Nav = () => {
  const { data, status } = useSession();
  return (
    <nav className='sticky top-0 mb-20 bg-white/70 dark:bg-black/70 backdrop-blur-md z-50 shadow-sm'>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo />
        </div>
        <div>
          <ul className='space-x-10 py-5'>
            <Link href='/hyperdocs/docs'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Docs
              </a>
            </Link>
            <Link href='/showcase'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Showcase
              </a>
            </Link>
            <Link href='/hyperdocs/blog'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Blog
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
