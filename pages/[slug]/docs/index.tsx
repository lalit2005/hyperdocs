import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@/utils/prisma';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import bundleMdxContent from '@/lib/mdx-bundler';
import Head from 'next/head';
import DocsNav from '@/components/docs/navbar';
import getAllFiles from '@/utils/getAllFiles';
import getFileContent from '@/utils/getFile';
import { Remarkable } from 'remarkable';
// @ts-ignore
import mdToc from 'markdown-toc';
// @ts-ignore
const Page = ({ content, tocHtml, navLinks, navCta, logo, sidebar, slug }) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css'
        />
      </Head>
      <div>
        <div className='sticky top-0'>
          <DocsNav links={navLinks} navbarCta={navCta} logo={logo} />
        </div>
        <div className='mx-auto'>
          <div className='flex flex-row flex-wrap py-5'>
            <aside className='w-full sm:w-2/12 px-2 border-r-2 border-slate-300 dark:border-slate-600'>
              <div className='sticky top-20 p-4 w-full'>
                <div className='flex flex-col overflow-hidden'>
                  <div className=''>
                    <ul className='space-y-4'>
                      {sidebar.map((file: string) => {
                        return (
                          <li key={file}>
                            <a
                              className='capitalize px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 block'
                              href={`/${slug}/docs/${file}`}>
                              {file.replace(/-/gi, ' ')}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
            <main role='main' className='w-full sm:w-8/12 pt-4 px-10'>
              <div className='prose-headings:scroll-mt-20 dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 prose-headings:font-bold px-3 dark:prose-invert prose-lg prose-slate prose-pre:bg-[#282C34] dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
                <Component />
              </div>
            </main>
            <div className='w-full sm:w-2/12 px-2'>
              <div className='sticky top-20 p-4 w-full border-l dark:border-slate-700 border-slate-300'>
                <div className='flex flex-col'>
                  <p className='uppercase text-xs mb-5'>In this page</p>
                  <ul
                    dangerouslySetInnerHTML={{ __html: tocHtml }}
                    className='space-y-4 prose prose-li:underline-offset-4 text-opacity-50 dark:prose-invert'></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='mt-auto'>...</footer>
      </div>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filename = 'index';

  console.log(filename);

  const siteData = await prisma.site.findUnique({
    where: {
      siteSlug: slug,
    },
    include: {
      navbarLinks: true,
    },
  });

  const mdToHtml = new Remarkable();

  const allFiles = await getAllFiles(
    siteData?.repoLink || '',
    siteData?.gitHubAccessToken || ''
  );

  console.log(allFiles);

  // @ts-ignore
  const filesArray = allFiles.data.map((file) =>
    file.name.replace(/\.md$/, '')
  );

  const content = await getFileContent(
    siteData?.repoLink || '',
    filename + '.md',
    siteData?.gitHubAccessToken?.toString()
  );

  const tocHtml = mdToHtml.render(mdToc(content).content);

  return {
    props: {
      content: (await bundleMdxContent(`${content.toString().trim()}`)).code,
      tocHtml: tocHtml,
      sidebar: filesArray,
      navLinks: siteData?.navbarLinks,
      navCta: siteData?.navbarCta,
      logo: siteData?.siteName,
      slug: siteData?.siteSlug,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
