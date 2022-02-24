import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import prisma from '@/utils/prisma';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';
import bundleMdxContent from '@/lib/mdx-bundler';
import DocsNav from '@/components/docs/navbar';
import getAllFiles from '@/utils/getAllFiles';
import getFileContent from '@/utils/getFile';
import { Remarkable } from 'remarkable';
// @ts-ignore
import mdToc from 'markdown-toc';
import { capitalize } from '@/lib/capitalize';
import DocsLayout from '@/layouts/DocsLayout';
import { DocsPageProps } from 'types/types';
import MDXRenderer from '@/components/docs/MDXRenderer';
import DocsMDXcomponents from '@/components/docs/documentation/components';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const Page: NextPage<DocsPageProps> = ({
  content,
  tocHtml,
  navLinks,
  navCta,
  siteName,
  description,
  sidebar,
  slug,
  siteId,
}) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <div>
      <NextSeo
        title={siteName}
        description={description}
        openGraph={{
          url: 'https://hyperdocs.netlify.app',
          title: siteName,
          description: description,
          images: [
            {
              url: `https://ogsupa.com/api/v1?title=${encodeURIComponent(
                siteName
              )}&description=${encodeURIComponent(
                description
              )}&background_color=%2319354d&font_style=font-sans`,
              alt: siteName,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <div className='sticky top-0 z-30'>
        <DocsNav links={navLinks} navbarCta={navCta} logo={siteName} />
      </div>
      <DocsLayout
        siteId={siteId}
        LeftSidebarContent={() => (
          <ul className='mt-10 space-y-4'>
            {sidebar.map((file: string) => {
              return (
                <li key={file}>
                  <Link href={`/${slug}/docs/${file}`}>
                    <a className='block rounded px-3 py-2 capitalize hover:bg-slate-50 dark:hover:bg-slate-800'>
                      {file.replace(/-/gi, ' ')}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        RightSidebarContent={() => (
          <div>
            <div className='prose-sm prose-ul:relative prose-ul:-left-5 dark:prose-invert'>
              <p className='mb-5 font-semibold text-sm'>On this page</p>
              <ul dangerouslySetInnerHTML={{ __html: tocHtml }}></ul>
            </div>
          </div>
        )}>
        <MDXRenderer>
          {/* @ts-ignore */}
          <Component components={DocsMDXcomponents} />
        </MDXRenderer>
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
      siteName: siteData?.siteName,
      slug: siteData?.siteSlug,
      siteId: siteData?.id,
      description: siteData?.siteDescription,
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
