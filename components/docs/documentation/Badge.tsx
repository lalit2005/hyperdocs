import clsx from 'clsx';

const Badge = (props: any) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 rounded border dark:bg-transparent',
        props.color == 'blue' &&
          'border-blue-200 text-blue-500 bg-blue-100 dark:border-blue-700 dark:text-blue-500',
        props.color == 'green' &&
          'border-green-200 text-green-500 bg-green-200 dark:border-green-700 dark:text-green-500',
        props.color == 'yellow' &&
          'border-yellow-200 text-yellow-500 bg-yellow-100 dark:border-yellow-700 dark:text-yellow-500',
        props.color == 'red' &&
          'border-red-200 text-red-500 bg-red-100 dark:border-red-700 dark:text-red-500',
        !props.color &&
          'border-green-200 text-green-500 bg-green-200 dark:border-green-700 dark:text-green-500'
      )}>
      {props?.children}
    </span>
  );
};

export default Badge;
