import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        className={clsx(
          'relative -bottom-[1px] rounded border border-slate-400 px-5 py-[9px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-px',
          props?.className
        )}
      />
    </>
  );
};
