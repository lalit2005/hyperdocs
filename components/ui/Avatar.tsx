import * as RadixAvatar from '@radix-ui/react-avatar';

const Avatar: React.FC<{ img: string; fallBack: string }> = ({
  img,
  fallBack,
}) => {
  return (
    <RadixAvatar.Root>
      <RadixAvatar.Image
        className='w-9 rounded-full group-focus:ring group-focus:ring-blue-500'
        src={img}
      />
      <RadixAvatar.Fallback
        delayMs={600}
        className='flex h-full w-full cursor-default items-center justify-center rounded-full bg-blue-500 p-3 text-xs uppercase leading-none'
      >
        {fallBack?.split(' ')[0]?.substring(0, 2) || fallBack?.substring(0, 2)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
