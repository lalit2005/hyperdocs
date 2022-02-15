import { Tooltip as TooltipComponent } from 'react-tiny-tooltip';

const Tooltip = (props: any) => {
  return (
    <p className='underline decoration-wavy decoration-blue-400 inline-block cursor-help'>
      <TooltipComponent {...props}>{props.children}</TooltipComponent>
    </p>
  );
};

export default Tooltip;
