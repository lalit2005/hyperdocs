import Head from 'next/head';

const MDXRenderer: React.FC = (props) => {
  return (
    <div className='mdx-content prose-lg prose-slate px-3 text-gray-800 prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-gray-800 prose-blockquote:border-l-4 prose-blockquote:border-gray-600 prose-blockquote:py-1 prose-pre:overflow-x-scroll prose-pre:bg-[#282C34] prose-ol:list-decimal prose-ul:list-disc dark:prose-invert dark:text-gray-200 dark:prose-headings:text-gray-50 dark:prose-hr:divide-gray-600'>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css'
        />
      </Head>
      {props.children}
    </div>
  );
};

export default MDXRenderer;
