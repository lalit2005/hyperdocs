export const Accordion = (props: any) => (
  <details className='my-1 cursor-pointer rounded border border-gray-300 px-4 py-2 transition-all dark:border-gray-700'>
    <summary className='select-none font-medium'>{props?.title}</summary>
    <div className='cursor-default'>
      <p>{props?.children}</p>
    </div>
  </details>
);
