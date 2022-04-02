import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import TextareaAutoResize from 'react-textarea-autosize';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        className={clsx(
          'relative -bottom-[1px] m-px rounded border border-gray-500 px-5 py-[9px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
          props?.className
        )}
      />
    </>
  );
};

export const Textarea: React.FC<InputHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return (
    <>
      {/* @ts-ignore */}
      <TextareaAutoResize
        {...props}
        minRows={3}
        className={clsx(
          'relative -bottom-[1px] m-px rounded border border-gray-400 px-5 py-[9px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
          props?.className
        )}
      />
    </>
  );
};
