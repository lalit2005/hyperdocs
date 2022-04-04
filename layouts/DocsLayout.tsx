import Feedback from '@/components/docs/Feedback';
import { Markdown } from '@/components/ui/Typography';
import clsx from 'clsx';

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
      <div className='lg:pl-72'>
        <div className='mx-auto max-w-3xl pt-10 xl:ml-0 2xl:ml-[max(0px,calc(60%-45rem))]'>
          <main className='relative z-20 mt-8'>{props.children}</main>
          <footer className='mt-5 border-t-2 border-t-gray-300 py-4 px-3 dark:border-t-gray-700'>
            <Markdown text={footerText} />
          </footer>
          <div className='fixed top-[5.5rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 px-8 xl:block'>
            <div className='sticky max-h-[calc(var(--vh)-4rem)] overflow-y-auto'>
              <RightSidebarContent />
              <div className='mt-10'>
                <Feedback siteId={siteId} />
                <a
                  href={`${
                    repoUrl.endsWith('/') ? repoUrl.slice(0, -1) : repoUrl
                  }/edit/master/docs/${fileName}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-5 block text-sm underline underline-offset-1 opacity-75 hover:opacity-90'
                >
                  Edit file on GitHub
                </a>
                <a
                  href={`${
                    repoUrl.endsWith('/') ? repoUrl.slice(0, -1) : repoUrl
                  }/tree/master/docs/${fileName}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-2 block text-sm underline underline-offset-1 opacity-75 hover:opacity-90'
                >
                  View file on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
