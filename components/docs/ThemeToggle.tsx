import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Moon, Sun } from 'react-feather';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/Menu';

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
        <MenuTrigger>
          <div className='relative -bottom-1 rounded border-none p-2 px-[8px] hover:bg-gray-50 group-focus:ring group-focus:ring-blue-500 dark:hover:bg-gray-900'>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
        </MenuTrigger>
        <MenuContent isOpen={isOpen}>
          <MenuItem callBack={() => setTheme('dark')}>
            <Moon className='relative -top-px mr-2 inline p-1' />
            Dark
          </MenuItem>
          <MenuItem callBack={() => setTheme('light')}>
            <Sun className='relative -top-px mr-2 inline p-1' />
            Light
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default ThemeToggle;
