import clsx from 'clsx';
import { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import React from 'react';

const DocsLink: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { noInvert?: boolean }
> = ({ ...props }) => {
  const isRelative = props.href?.startsWith('/' || '#') ?? false;
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
          'text-blue-500 hover:text-blue-600 hover:underline dark:hover:text-blue-500',
          props?.className
        )}>
        {props.children}
      </a>
    </Wrap>
  );
};

export default DocsLink;
