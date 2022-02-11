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
          <div className='px-[8px] border-none p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900 group-focus:ring group-focus:ring-blue-500 relative -bottom-1'>
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
        </MenuTrigger>
        <MenuContent isOpen={isOpen}>
          <MenuItem callBack={() => setTheme('dark')}>
            <Moon className='inline p-1 mr-2 relative -top-px' />
            Dark
          </MenuItem>
          <MenuItem callBack={() => setTheme('light')}>
            <Sun className='inline p-1 mr-2 relative -top-px' />
            Light
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default ThemeToggle;
