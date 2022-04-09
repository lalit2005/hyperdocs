import { NavbarLink } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { AnchorHTMLAttributes } from 'react';
import { Menu } from 'react-feather';
import { CustomLink } from '../ui/Link';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/Menu';
import ThemeToggle from './ThemeToggle';

const DocsNav: React.FC<{
  links: NavbarLink[];
  navbarCta: string;
  logo: string;
  slug: string;
}> = ({ links, slug, navbarCta, logo, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='sticky top-0 !z-50 flex w-screen items-center justify-between bg-white py-3 px-10 shadow-lg dark:border-b dark:border-b-gray-700 dark:bg-black dark:shadow-gray-800/50'>
      <div className='text-lg font-bold'>
        <Link href={`/${slug}`}>
          <a>{logo}</a>
        </Link>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='hidden items-center space-x-4 lg:flex'>
          {links?.map((link) => (
            <div key={link.id}>
              <NavLink href={link.link}>{link?.linkText}</NavLink>
            </div>
          ))}
        </div>
        <div>
          <ThemeToggle />
        </div>
        <div className='sticky top-0 mt-5 block lg:hidden'>
          <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
            <MenuTrigger>
              <Menu className='relative -top-2' />
            </MenuTrigger>
            <MenuContent isOpen={isOpen}>
              {links?.map((link) => (
                <MenuItem key={link.id}>
                  <NavLink href={link.link}>{link?.linkText}</NavLink>
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>
        </div>
        <CustomLink href={navbarCta?.split('|||')[1]} className='scale-90'>
          {navbarCta?.split('|||')[0]}
        </CustomLink>
      </div>
    </nav>
  );
};

export default DocsNav;

export const NavLink: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { noInvert?: boolean }
> = ({ noInvert = false, ...props }) => {
  const isRelative =
    (props.href?.startsWith('/') || props.href?.startsWith('#')) ?? false;
  const Wrap = isRelative ? Link : React.Fragment;
  const wrapProps = isRelative ? { href: props.href } : {};
  const linkProps = !isRelative ? { target: '_blank' } : {};

  return (
    // @ts-ignore
    <Wrap {...wrapProps}>
      <a {...props} {...linkProps}>
        {props.children}
      </a>
    </Wrap>
  );
};
