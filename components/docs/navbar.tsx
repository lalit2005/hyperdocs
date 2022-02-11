import { NavbarLink } from '@prisma/client';
import Link from 'next/link';
import { CustomLink } from '../ui/Link';
import ThemeToggle from './ThemeToggle';

const DocsNav: React.FC<{
  links: NavbarLink[];
  navbarCta: string;
  logo: string;
}> = ({ links, navbarCta, logo, ...props }) => {
  return (
    <nav className='flex justify-between py-3 bg-white dark:bg-black shadow-lg w-screen px-10 items-center dark:shadow-slate-800/50 dark:border-b dark:border-b-slate-700'>
      <div className='font-bold text-lg'>
        <Link href='/'>
          <a>{logo}</a>
        </Link>
      </div>
      <div className='flex space-x-4 items-center'>
        {links?.map((link) => (
          <div key={link.id}>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={link.link}
              className='text-light'>
              {link?.linkText}
            </a>
          </div>
        ))}
        <div>
          <ThemeToggle />
        </div>
        <CustomLink href={navbarCta.split('|||')[1]} className='scale-90'>
          {navbarCta.split('|||')[0]}
        </CustomLink>
      </div>
    </nav>
  );
};

export default DocsNav;
