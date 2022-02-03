import Link from 'next/link';
import Logo from './Logo';

const Nav = () => {
  return (
    <nav className='sticky top-0'>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo />
        </div>
        <div>
          <ul className='space-x-10 py-5'>
            <Link href='/docs'>
              <a className='opacity-60 hover:opacity-100 transition-all'>
                Docs
              </a>
            </Link>
            <Link href='/showcase'>
              <a className='opacity-60 hover:opacity-100 transition-all'>
                Showcase
              </a>
            </Link>
            <Link href='/themes'>
              <a className='opacity-60 hover:opacity-100 transition-all'>
                Themes
              </a>
            </Link>
            <Link href='/login'>
              <a className='opacity-60 hover:opacity-100 transition-all'>
                Login
              </a>
            </Link>
            <Link href='/signup'>
              <a className='dark:text-black dark:bg-white text-white bg-black rounded px-4 py-2'>
                Sign Up
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
