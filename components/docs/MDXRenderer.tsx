const MDXRenderer: React.FC = (props) => {
  return (
    <div className='prose-headings:scroll-mt-20 dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 prose-headings:font-bold px-3 dark:prose-invert prose-lg prose-slate prose-pre:bg-[#282C34] dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
      {props.children}
    </div>
  );
};

export default MDXRenderer;
