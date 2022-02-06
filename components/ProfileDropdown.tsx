import { signOut, useSession } from 'next-auth/react';
import { Tooltip } from 'react-tiny-tooltip';
import { useState } from 'react';
import Avatar from './ui/Avatar';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from './ui/Menu';

const ProfileDropdown = () => {
  const { data } = useSession();
  const [name, img, email] = [
    data?.user?.name,
    data?.user?.image,
    data?.user?.email,
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
        <MenuTrigger>
          <Tooltip content={name || ''} side='left' sideOffset={5}>
            <Avatar img={img || ''} fallBack={name || ''} />
          </Tooltip>
        </MenuTrigger>
        <MenuContent isOpen={isOpen}>
          <MenuItem className='px-5 pr-10 focus:outline-none focus:bg-slate-100 hover:bg-slate-100 focus:dark:bg-slate-800 hover:dark:bg-slate-800 cursor-pointer py-3'>
            Signed in as <span className='font-bold'>{name}</span>
            <br />
            <p className='text-sm mt-1 opacity-80'>{email}</p>
          </MenuItem>
          <MenuItem link='/docs'>Documentation</MenuItem>
          <MenuItem link='/themes'>Themes</MenuItem>
          <MenuItem link='/showcase'>Showcase</MenuItem>
          <MenuItem link='/support'>Support</MenuItem>
          <MenuSeparator />
          <MenuItem
            callBack={signOut}
            className='text-red-500 focus:underline hover:underline'>
            Logout
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default ProfileDropdown;
