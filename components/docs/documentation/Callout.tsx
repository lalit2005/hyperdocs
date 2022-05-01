import clsx from 'clsx';
import * as FeatherIcons from 'react-feather';

const Callout = (props: any) => {
  return (
    <div
      className={clsx(
        'not-prose callout my-5 border-l-4 p-7 dark:bg-gray-800/70',
        props.type == 'info' && 'border-blue-500 bg-blue-400/10',
        props.type == 'tip' && 'border-cyan-500 bg-cyan-400/10',
        props.type == 'success' && 'border-green-500 bg-green-400/10',
        props.type == 'warning' && 'border-yellow-500 bg-yellow-400/10',
        props.type == 'danger' && 'border-red-500 bg-red-400/10',
        !props.type && 'border-blue-500 bg-blue-400/10'
      )}>
      <div
        className={clsx(
          'mb-3',
          props.type == 'info' && 'text-blue-500',
          props.type == 'tip' && 'text-cyan-500',
          props.type == 'success' && 'text-green-500',
          props.type == 'warning' && 'text-yellow-500',
          props.type == 'danger' && 'text-red-500',
          !props.type && 'text-blue-500'
        )}>
        {(props.type == 'info' && <FeatherIcons.Info />) ||
          (props.type == 'tip' && <FeatherIcons.Zap />) ||
          (props.type == 'success' && <FeatherIcons.CheckCircle />) ||
          (props.type == 'warning' && <FeatherIcons.AlertTriangle />) ||
          (props.type == 'danger' && <FeatherIcons.AlertCircle />)}
      </div>
      <p>{props?.children}</p>
    </div>
  );
};

export default Callout;
