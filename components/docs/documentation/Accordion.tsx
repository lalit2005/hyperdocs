export const Accordion = (props: any) => (
  <details
    className='open:ring-1 open:ring-black/5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 dark:open:ring-white/10 open:shadow-md border border-slate-300 dark:border-slate-700 px-4 py-2 rounded my-1 transition-all'
    open>
    <summary className='font-medium select-none'>{props?.title}</summary>
    <div className='cursor-default'>
      <p>{props?.children}</p>
    </div>
  </details>
);
