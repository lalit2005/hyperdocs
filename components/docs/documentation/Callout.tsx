import clsx from 'clsx';
import * as FeatherIcons from 'react-feather';

const Callout = (props: any) => {
  return (
    <div
      className={clsx(
        'rounded p-7 not-prose my-5 text-black',
        props.type == 'info' && 'bg-blue-400',
        props.type == 'tip' && 'bg-cyan-400',
        props.type == 'success' && 'bg-green-400',
        props.type == 'warning' && 'bg-yellow-400',
        props.type == 'danger' && 'bg-red-400',
        !props.type && 'bg-blue-400'
      )}>
      <div className='mb-3'>
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
