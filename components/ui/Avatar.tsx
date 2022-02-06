import * as RadixAvatar from '@radix-ui/react-avatar';

const Avatar: React.FC<{ img: string; fallBack: string }> = ({
  img,
  fallBack,
}) => {
  return (
    <RadixAvatar.Root>
      <RadixAvatar.Image
        className='rounded-full w-9 group-focus:ring group-focus:ring-blue-500'
        src={img}
      />
      <RadixAvatar.Fallback
        delayMs={600}
        className='bg-blue-500 w-full h-full flex items-center justify-center p-3 uppercase text-xs leading-none rounded-full cursor-default'>
        {fallBack?.split(' ')[0]?.substring(0, 2) || fallBack?.substring(0, 2)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
