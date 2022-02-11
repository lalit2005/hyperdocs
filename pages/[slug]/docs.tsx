// @ts-nocheck
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

const Page = ({ files, code, navLinks, navCta, logo }) => {
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
        <div className='container mx-auto'>
          <div className='flex flex-row flex-wrap py-5'>
            <aside className='w-full sm:w-2/12 px-2 border-r-2 border-slate-300 dark:border-slate-600'>
              <div className='sticky top-20 p-4 w-full'>
                <div className='flex flex-col overflow-hidden'>
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
            </aside>
            <main role='main' className='w-full sm:w-8/12 pt-4 px-10'>
              <div className='dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 prose-headings:font-bold px-3 dark:prose-invert prose-lg prose-slate prose-pre:bg-[#282C34] dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
                <Component />
              </div>
            </main>
            <div className='w-full sm:w-2/12 px-2'>
              <div className='sticky top-20 p-4 w-full border-l dark:border-slate-700 border-slate-300'>
                <div className='flex flex-col overflow-hidden'>
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

  console.log(siteData);

  const octokit = new Octokit({
    auth: siteData?.gitHubAccessToken,
  });

  // get repo owner and repo name from siteData?.repoUrl
  const repoUrl = siteData?.repoLink as string;
  const repoLinkData = parseGitHubUrl(repoUrl);

  // get all files from /docs folder in the repo
  const files = await octokit.rest.repos.getContent({
    owner: repoLinkData?.owner as string,
    repo: repoLinkData?.repo?.split('/')[1] as string,
    path: 'docs',
  });

  // console.log(files);

  // check if files is an array
  if (!Array.isArray(files.data)) {
    // filter out files that are not markdown files
    console.log('files is not an array');
  }

  const markdownFiles = files.data.filter(
    (file) => file.type === 'file' && file.name.endsWith('.md')
  );

  // combine the contents of all the files and bundle them and return them as props
  const filesContents = await Promise.all(
    markdownFiles.map(async (file) => {
      const fileContents = await octokit.rest.repos.getContent({
        owner: repoLinkData?.owner as string,
        repo: repoLinkData?.repo?.split('/')[1] as string,
        path: `docs/${file.name}`,
      });

      // base64 decode the fileContents.data.content from atob
      const decodedFileContents = Buffer.from(
        fileContents.data.content,
        'base64'
      ).toString('utf8');
      return decodedFileContents;
    })
  );
  const filesContentsBundled = await bundleMdxContent(filesContents.join('\n'));

  return {
    props: {
      code: filesContentsBundled.code,
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
