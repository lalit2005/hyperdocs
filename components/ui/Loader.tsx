import { Loader as LoaderIcon } from 'react-feather';

const Loader = ({ ...props }) => {
  return (
    <LoaderIcon
      className='animate-spin'
      style={{
        animation: 'spin 2s linear infinite',
      }}
      size={25}
      {...props}
    />
  );
};

export default Loader;
