// @ts-nocheck
import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@/utils/prisma';
import { Octokit } from 'octokit';
import parseGitHubUrl from 'parse-github-url';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import axios from 'axios';
import bundleMdxContent from '@/lib/mdx-bundler';

const Page = ({ files, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      {/* <pre>{JSON.stringify(files, null, 2)}</pre> */}
      <div className='dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 max-w-3xl prose-headings:font-bold px-3 mx-auto dark:prose-invert mt-10 prose-lg prose-slate prose-pre:bg-slate-800 dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
        <Component />
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
  });

  console.log(siteData);

  const octokit = new Octokit({
    auth: process.env.GITHUB_APIKEY || '',
  });

  // get repo owner and repo name from siteData?.repoUrl
  const repoUrl = siteData?.repoLink as string;
  const repoLinkData = parseGitHubUrl(repoUrl);

  console.log(repoLinkData);

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
      return 'hi ' + decodedFileContents;
    })
  );

  const filesContentsBundled = await bundleMdxContent(
    filesContents.join('\n'),
    siteData?.shikiTheme
  );

  return {
    props: {
      files: filesContentsBundled,
      code: filesContentsBundled.code,
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
