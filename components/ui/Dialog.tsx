import * as RadixDialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'react-feather';
import { Button } from './Button';
import { Heading3, Markdown, TextSmall } from './Typography';

export const DialogRoot: React.FC = (props) => {
  return <RadixDialog.Root>{props.children}</RadixDialog.Root>;
};

export const DialogTrigger: React.FC = (props) => {
  return <RadixDialog.Trigger asChild>{props.children}</RadixDialog.Trigger>;
};

export const DialogContent: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description, ...props }) => {
  return (
    <RadixDialog.Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <RadixDialog.Overlay
          forceMount
          className='fixed inset-0 z-20 bg-black/50'
        />
      </motion.div>
      <div
        className={clsx(
          'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
          'fixed z-50',
          'w-[95vw] max-w-lg md:w-full'
        )}
      >
        <AnimatePresence>
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
              scale: 0.1,
              transition: {
                duration: 0.5,
              },
            }}
            transition={{
              type: 'spring',
              duration: 0.2,
            }}
          >
            <RadixDialog.Content
              forceMount
              className={clsx(
                'rounded-lg p-7',
                'bg-white dark:bg-gray-800',
                'focus:outline-none focus-visible:ring focus-visible:ring-blue-500'
              )}
            >
              <div className='flex w-full items-center justify-between'>
                <RadixDialog.Title>
                  <Heading3>{title}</Heading3>
                </RadixDialog.Title>
                <RadixDialog.Close asChild>
                  <Button
                    noInvert
                    className='relative -top-1 rounded-full border-none !p-px'
                  >
                    <X style={{ zoom: 0.8 }} />
                  </Button>
                </RadixDialog.Close>
              </div>
              <RadixDialog.Description className='mb-3'>
                <TextSmall>
                  <Markdown text={description || ''} />
                </TextSmall>
              </RadixDialog.Description>
              <div>{props.children}</div>
            </RadixDialog.Content>
          </motion.div>
        </AnimatePresence>
      </div>
    </RadixDialog.Portal>
  );
};
