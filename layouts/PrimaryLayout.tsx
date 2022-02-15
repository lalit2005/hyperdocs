import Nav from '@/components/Nav';
import { Heading1 } from '@/components/ui/Typography';

const PrimaryLayout: React.FC<{ title?: string }> = ({ title, ...props }) => {
  return (
    <div>
      <Nav />
      {title && <Heading1 className='mt-24 text-center'>{title}</Heading1>}
      {props.children}
    </div>
  );
};

export default PrimaryLayout;
