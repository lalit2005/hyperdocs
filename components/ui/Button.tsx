import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { noInvert?: boolean }
> = ({ noInvert = 'true', ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'rounded text-invert px-4 py-2 m-px focus:ring-2 focus:outline-none focus:ring-blue-500 border border-black dark:border-white',
        noInvert === true &&
          'text-no-invert border !border-slate-400 dark:!border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800',
        props.className
      )}>
      {props.children}
    </button>
  );
};
