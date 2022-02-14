import Feedback from '@/components/docs/Feedback';

const DocsLayout: React.FC<{
  LeftSidebarContent: React.FC;
  RightSidebarContent: React.FC;
  siteId: string;
}> = ({ LeftSidebarContent, RightSidebarContent, siteId, ...props }) => {
  return (
    <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
      <div className='hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-64 pb-10 px-7 overflow-y-auto border-r-2 border-r-slate-200 dark:border-slate-700'>
        <LeftSidebarContent />
      </div>
      <div className='lg:pl-72'>
        <div className='max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16'>
          <main className='relative z-20 mt-8'>{props.children}</main>
          <footer className='text-sm leading-6 mt-12'>Footer</footer>
          <div className='fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block'>
            <div className='overflow-y-auto sticky max-h-[calc(var(--vh)-4rem)]'>
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
