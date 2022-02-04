import clsx from 'clsx';

export const Heading1: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <h2 className={clsx('text-5xl font-extrabold', className)}>
      {props.children}
    </h2>
  );
};

export const Heading2: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <h1 className={clsx('text-4xl font-bold', className)}>{props.children}</h1>
  );
};

export const Heading3: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <h3 className={clsx('text-4xl font-bold', className)}>{props.children}</h3>
  );
};
