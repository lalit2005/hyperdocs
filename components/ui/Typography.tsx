import clsx from 'clsx';
import snarkdown from 'snarkdown';

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
    <h3 className={clsx('text-xl text-opacity-75 font-bold', className)}>
      {props.children}
    </h3>
  );
};

export const TextSmall: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  return <p className={clsx('text-light', className)}>{props.children}</p>;
};

export const Markdown: React.FC<{ className?: string; text?: string }> = ({
  className,
  text,
  ...props
}) => {
  return (
    <>
      <p
        className={clsx('markdown', className)}
        {...props}
        dangerouslySetInnerHTML={{ __html: snarkdown(text || '') }}></p>
    </>
  );
};
