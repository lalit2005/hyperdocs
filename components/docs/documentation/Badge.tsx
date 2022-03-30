import clsx from 'clsx';

const Badge = (props: any) => {
  return (
    <span
      className={clsx(
        'rounded border px-2 py-1 text-sm dark:bg-transparent',
        props.color == 'blue' &&
          'border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-700 dark:text-blue-500',
        props.color == 'green' &&
          'border-green-200 bg-green-200 text-green-700 dark:border-green-700 dark:text-green-500',
        props.color == 'yellow' &&
          'border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-700 dark:text-yellow-500',
        props.color == 'red' &&
          'border-red-200 bg-red-100 text-red-700 dark:border-red-700 dark:text-red-500',
        !props.color &&
          'border-green-200 bg-green-200 text-green-700 dark:border-green-700 dark:text-green-500'
      )}
    >
      {props?.children}
    </span>
  );
};

export default Badge;
