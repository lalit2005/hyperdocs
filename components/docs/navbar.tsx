import { NavbarLink } from '@prisma/client';
import Link from 'next/link';
import { CustomLink } from '../ui/Link';
import ThemeToggle from './ThemeToggle';

const DocsNav: React.FC<{
  links: NavbarLink[];
  navbarCta: string;
  logo: string;
  slug: string;
}> = ({ links, slug, navbarCta, logo, ...props }) => {
  return (
    <nav className='flex w-screen items-center justify-between bg-white py-3 px-10 shadow-lg dark:border-b dark:border-b-slate-700 dark:bg-black dark:shadow-slate-800/50 sticky top-0 !z-50'>
      <div className='text-lg font-bold'>
        <Link href={`/${slug}`}>
          <a>{logo}</a>
        </Link>
      </div>
      <div className='flex items-center space-x-4'>
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
        <CustomLink href={navbarCta?.split('|||')[1]} className='scale-90'>
          {navbarCta?.split('|||')[0]}
        </CustomLink>
      </div>
    </nav>
  );
};

export default DocsNav;
