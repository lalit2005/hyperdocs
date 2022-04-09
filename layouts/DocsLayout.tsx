import Feedback from '@/components/docs/Feedback';
import { Button } from '@/components/ui/Button';
import { MenuContent, MenuRoot, MenuTrigger } from '@/components/ui/Menu';
import { Markdown } from '@/components/ui/Typography';
import clsx from 'clsx';
import { useState } from 'react';
import { Sidebar } from 'react-feather';
import { Tooltip } from 'react-tiny-tooltip';

const DocsLayout: React.FC<{
  LeftSidebarContent: React.FC;
  RightSidebarContent: React.FC;
  footerText: string;
  siteId: string;
  extraTopMargin?: boolean;
  repoUrl: string;
  fileName: string;
}> = ({
  LeftSidebarContent,
  RightSidebarContent,
  siteId,
  footerText,
  repoUrl,
  fileName,
  extraTopMargin = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-screen px-4 sm:px-6 md:px-8'>
      <div
        className={clsx(
          'fixed inset-0 left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-64 overflow-y-auto border-r-2 border-r-gray-200 px-7 pb-10 dark:border-gray-700 lg:block',
          extraTopMargin ? 'top-[5.5rem]' : 'top-[3.8125rem]'
        )}
      >
        <LeftSidebarContent />
      </div>
      <div className='fixed bottom-0 z-50 mb-5 inline-flex max-w-[130px] rounded border border-gray-400 bg-white dark:border-gray-500 dark:bg-black lg:hidden'>
        <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
          <MenuTrigger>
            <Tooltip content='Menu'>
              <Button>
                <div>
                  <Sidebar
                    className='relative -top-[2px] mr-1 inline-block'
                    size={20}
                  />
                </div>
              </Button>
            </Tooltip>
          </MenuTrigger>
          <MenuContent isOpen={isOpen}>
            <div className='-mt-10 px-6 py-5'>
              <LeftSidebarContent />
            </div>
          </MenuContent>
        </MenuRoot>
      </div>
      <div className='lg:pl-72'>
        <div className='mx-auto max-w-3xl pt-10 xl:ml-0 2xl:ml-[max(0px,calc(60%-45rem))]'>
          <main className='relative z-20 mt-8'>{props.children}</main>
          <footer className='mt-5 border-t-2 border-t-gray-300 py-4 px-3 pb-20 dark:border-t-gray-700 lg:pb-4'>
            <Markdown text={footerText} />
          </footer>
          <div className='fixed top-[5.5rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 px-8 xl:block'>
            <div className='sticky max-h-[calc(var(--vh)-4rem)] overflow-y-auto'>
              <RightSidebarContent />
              <div className='mt-10'>
                <Feedback siteId={siteId} />
                <div>
                  <a
                    href={`${
                      repoUrl.endsWith('/') ? repoUrl.slice(0, -1) : repoUrl
                    }/tree/master/docs/${fileName}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-5 block text-sm underline underline-offset-1 opacity-75 hover:opacity-90'
                  >
                    Edit this page on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
