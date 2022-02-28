import Feedback from '@/components/docs/Feedback';
import { Markdown } from '@/components/ui/Typography';

const DocsLayout: React.FC<{
  LeftSidebarContent: React.FC;
  RightSidebarContent: React.FC;
  footerText: string;
  siteId: string;
}> = ({
  LeftSidebarContent,
  RightSidebarContent,
  siteId,
  footerText,
  ...props
}) => {
  return (
    <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
      <div className='fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-64 overflow-y-auto border-r-2 border-r-slate-200 px-7 pb-10 dark:border-slate-700 lg:block'>
        <LeftSidebarContent />
      </div>
      <div className='lg:pl-72'>
        <div className='mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16'>
          <main className='relative z-20 mt-8'>{props.children}</main>
          <footer className='py-4 px-3 mt-5 border-t-2 border-t-slate-300 dark:border-t-slate-700'>
            <Markdown text={footerText} />
          </footer>
          <div className='fixed top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 px-8 xl:block'>
            <div className='sticky max-h-[calc(var(--vh)-4rem)] overflow-y-auto'>
              <RightSidebarContent />
              <div className='mt-10'>
                <Feedback siteId={siteId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
