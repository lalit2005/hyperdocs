import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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
import DocsLayout from '@/layouts/DocsLayout';
import { DocsPageProps } from 'types/types';

const Page: NextPage<DocsPageProps> = ({
  content,
  tocHtml,
  navLinks,
  navCta,
  logo,
  sidebar,
  slug,
  siteId,
}) => {
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
      <DocsLayout
        siteId={siteId}
        LeftSidebarContent={() => (
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
        )}
        RightSidebarContent={() => (
          <div>
            <p className='text-xs mb-8 uppercase'>On this page</p>
            <ul
              dangerouslySetInnerHTML={{ __html: tocHtml }}
              className='space-y-4 prose prose-li:underline-offset-4 text-opacity-50 dark:prose-invert'></ul>
          </div>
        )}>
        <div className='prose-headings:scroll-mt-20 dark:text-slate-200 dark:prose-headings:text-slate-50 text-slate-800 prose-headings:text-slate-800 prose-headings:font-bold px-3 dark:prose-invert prose-lg prose-slate prose-pre:bg-[#282C34] dark:prose-hr:divide-slate-600 prose-pre:overflow-x-scroll prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-a:p-[2px] prose-a:rounded-sm dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1'>
          <Component />
        </div>
      </DocsLayout>
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
    // * Make sure to change the DocsPageProps in @types/types.ts
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
      siteId: siteData?.id,
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
