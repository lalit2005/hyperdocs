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
import { capitalize } from '@/lib/capitalize';
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
      <div className='sticky top-0 z-30'>
        <DocsNav links={navLinks} navbarCta={navCta} logo={logo} />
      </div>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-64 pb-10 px-7 overflow-y-auto border-r-2 border-r-slate-200 dark:border-slate-700'>
          <ul className='space-y-4 mt-10'>
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
        <div className='lg:pl-72'>
          <div className='max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16'>
            <main className='relative z-20 mt-8'>
              <div className='prose-headings:scroll-mt-20 dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 prose-headings:font-bold px-3 dark:prose-invert prose-lg prose-slate prose-pre:bg-[#282C34] dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
                <Component />
              </div>
            </main>
            <footer className='text-sm leading-6 mt-12'>Footer</footer>
            <div className='fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block'>
              <div className='overflow-y-auto sticky max-h-[calc(var(--vh)-4rem)]'>
                <p className='text-xs mb-8 uppercase'>On this page</p>
                <ul
                  dangerouslySetInnerHTML={{ __html: tocHtml }}
                  className='space-y-4 prose prose-li:underline-offset-4 text-opacity-50 dark:prose-invert'></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filename = params?.file as string;

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
  let filesArray = allFiles.data.map((file) => file.name.replace(/\.md$/, ''));

  filesArray = filesArray.filter((file: string) => file !== 'index');

  const content = await getFileContent(
    siteData?.repoLink || '',
    filename + '.md',
    siteData?.gitHubAccessToken?.toString()
  );

  const tocHtml = mdToHtml.render(mdToc(content).content);

  return {
    props: {
      content: (
        await bundleMdxContent(
          `# ${capitalize(filename.replace(/-/gi, ' '))} \n ${content
            .toString()
            .trim()}`
        )
      ).code,
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
