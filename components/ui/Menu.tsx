import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { usePrefetch } from 'use-link-prefetch';
import Link from 'next/link';

export const MenuRoot: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen, ...props }) => {
  return (
    <RadixMenu.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      {props.children}
    </RadixMenu.Root>
  );
};

export const MenuTrigger: React.FC = (props) => {
  return (
    <RadixMenu.Trigger className='focus:outline-none focus:ring-transparent group'>
      {props.children}
    </RadixMenu.Trigger>
  );
};

export const MenuContent: React.FC<{
  isOpen: boolean;
  side?: 'right' | 'top' | 'bottom' | 'left';
}> = ({ isOpen, side, ...props }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <RadixMenu.Content
          sideOffset={10}
          asChild
          side={side || 'bottom'}
          forceMount
          align='start'
          className='border-slate-200 dark:border-slate-600 border rounded block shadow-lg !max-w-lg !w-full bg-white dark:bg-black max-h-80 overflow-y-scroll'>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              type: 'spring',
              duration: 0.2,
            }}>
            {props.children}
          </motion.div>
        </RadixMenu.Content>
      )}
    </AnimatePresence>
  );
};

export const MenuItem: React.FC<{
  className?: string;
  callBack?: () => void;
  link?: string;
}> = ({ className, callBack, link, ...props }) => {
  const router = usePrefetch([link || '/dashboard']);
  const r = (url?: string) => {
    return () => {
      router.push(url || '/dashboard');
    };
  };

  return (
    <>
      <RadixMenu.Item
        onSelect={callBack || r(link)}
        className={clsx(
          'px-5 pr-10 focus:outline-none focus:bg-slate-100 hover:bg-slate-100 focus:dark:bg-slate-800 hover:dark:bg-slate-800 cursor-pointer py-2',
          className
        )}>
        {link && (
          <Link href={link}>
            <a className='w-full'>{props.children}</a>
          </Link>
        )}
        {!link && props.children}
      </RadixMenu.Item>
    </>
  );
};

export const MenuSeparator: React.FC = () => {
  return (
    <RadixMenu.Separator className='h-px dark:bg-slate-600 bg-slate-200' />
  );
};
