import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { noInvert?: boolean }
> = ({ noInvert = 'true', ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'text-invert m-px rounded border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white',
        noInvert === true &&
          'text-no-invert border !border-gray-400 hover:bg-gray-100 dark:!border-gray-500 dark:hover:bg-gray-800',
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
