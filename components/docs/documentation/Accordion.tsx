export const Accordion = (props: any) => (
  <details className='my-1 cursor-pointer rounded border border-gray-300 px-4 py-2 transition-all open:shadow-md open:ring-1 open:ring-black/5 hover:bg-gray-100 dark:border-gray-700 dark:open:ring-white/10 dark:hover:bg-gray-900'>
    <summary className='select-none font-medium'>{props?.title}</summary>
    <div className='cursor-default'>
      <p>{props?.children}</p>
    </div>
  </details>
);
