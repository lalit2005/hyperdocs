import clsx from 'clsx';

const Badge = (props: any) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 rounded border',
        props.color == 'blue' &&
          'border-blue-200 text-blue-500 bg-blue-100 dark:border-blue-900 dark:text-blue-200 dark:bg-blue-700',
        props.color == 'green' &&
          'border-green-200 text-green-500 bg-green-200 dark:border-green-900 dark:text-green-200 dark:bg-green-700',
        props.color == 'yellow' &&
          'border-yellow-200 text-yellow-500 bg-yellow-100 dar:border-yellow-900 dark:text-yellow-200 dark:bg-yellow-700',
        props.color == 'red' &&
          'border-red-200 text-red-500 bg-red-100 dark:border-red-900 dark:text-red-200 dark:bg-red-700',
        !props.color &&
          'border-green-200 text-green-500 bg-green-200 dark:border-green-900 dark:text-green-200 dark:bg-green-700'
      )}>
      {props?.children}
    </span>
  );
};

export default Badge;
