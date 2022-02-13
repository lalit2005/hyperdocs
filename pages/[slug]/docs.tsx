import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@/utils/prisma';
import { Octokit } from 'octokit';
import parseGitHubUrl from 'parse-github-url';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import axios from 'axios';
import bundleMdxContent from '@/lib/mdx-bundler';
import Head from 'next/head';
import Nav from '@/components/Nav';
import DocsNav from '@/components/docs/navbar';
import getAllFiles from '@/utils/getAllFiles';
import invariant from 'tiny-invariant';
import getFileContent from '@/utils/getFile';
import { Remarkable } from 'remarkable';
// @ts-ignore
import mdToc from 'markdown-toc';
// @ts-ignore
const Page = ({ finalMdxCode: { code }, tocHtml, navLinks, navCta, logo }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
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
                  <ul
                    dangerouslySetInnerHTML={{ __html: tocHtml }}
                    className='space-y-4 prose prose-li:underline-offset-4 text-opacity-50 dark:prose-invert'></ul>
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
                  <ul className='space-y-4'>
                    <li>Lorem, ipsum.</li>
                    <li>Saepe, eius?</li>
                    <li>Ducimus, omnis.</li>
                    <li>Error, cumque!</li>
                    <li>Modi, quidem?</li>
                    <li>Ducimus, officiis.</li>
                    <li>Ipsum, aut?</li>
                    <li>Hic, eveniet.</li>
                    <li>Tenetur, odit!</li>
                    <li>Laboriosam, quis?</li>
                  </ul>
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

  const siteData = await prisma.site.findUnique({
    where: {
      siteSlug: slug,
    },
    include: {
      navbarLinks: true,
    },
  });

  const files = await getAllFiles(
    siteData?.repoLink || '',
    siteData?.gitHubAccessToken?.toString()
  );

  invariant(files, 'No files found');

  const mdToHtml = new Remarkable();

  interface MdFileInfo {
    mdxCode: string;
    toc: string;
    name: string;
    content: string;
  }

  // @ts-ignore
  const bundledFilesArray = files.data.map(async (file) => {
    const content = await getFileContent(
      siteData?.repoLink || '',
      file.name,
      siteData?.gitHubAccessToken?.toString()
    );

    const tocHtml = mdToHtml.render(mdToc(content).content);

    return {
      toc: tocHtml,
      name: file.name,
      content: `# ${file.name.slice(0, -3).replace(/-/gi, ' ')} \n ${content
        .toString()
        .trim()}`,
    };
  });

  const bundledFiles: MdFileInfo[] = await Promise.all(bundledFilesArray);

  console.log(bundledFiles);

  const finalToc = mdToHtml.render(
    mdToc(bundledFiles.map((file) => file.content).join('\n')).content
  );
  console.log(finalToc);

  return {
    props: {
      // bundledFiles: bundledFiles,
      // combine all files' content
      finalMdxCode: await bundleMdxContent(
        bundledFiles.map((file) => file.content).join('\n')
      ),
      tocHtml: finalToc,
      navLinks: siteData?.navbarLinks,
      navCta: siteData?.navbarCta,
      logo: siteData?.siteName,
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
