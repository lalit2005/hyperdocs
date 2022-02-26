import clsx from 'clsx';
import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import React from 'react';

export const CustomLink: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { noInvert?: boolean }
> = ({ noInvert = false, ...props }) => {
  const isRelative = props.href?.startsWith('/') ?? false;
  const Wrap = isRelative ? Link : React.Fragment;
  const wrapProps = isRelative ? { href: props.href } : {};
  const linkProps = !isRelative ? { target: '_blank' } : {};

  return (
    // @ts-ignore
    <Wrap {...wrapProps}>
      <a
        {...props}
        {...linkProps}
        className={clsx(
          'text-invert m-px block rounded border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white',
          noInvert === true &&
            'text-no-invert border hover:bg-slate-100 !border-slate-300 dark:!border-slate-700 dark:hover:bg-slate-800',
          props?.className
        )}>
        {props.children}
      </a>
    </Wrap>
  );
};
