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
import web3forms from 'use-web3forms';
import getSidebar from '@/lib/getSidebar';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { getNextItem, getPreviousItem } from '@/lib/get-next-item';
import DocsPageNavCard from '@/components/docs/DocsPageNavCard';
import CommonComponents from '@/components/docs/CommonComponents';
import Sidebar from '@/components/docs/documentation/Sidebar';

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
  footerText,
  nextPage,
  prevPage,
  announcementText,
  announcementUrl,
  repoUrl,
}) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  const router = useRouter();
  const { file: fileName } = router.query;
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
      <CommonComponents
        announcementText={announcementText}
        announcementUrl={announcementUrl}
      />
      <div className='sticky top-0 z-50'>
        <DocsNav
          links={navLinks}
          navbarCta={navCta}
          logo={siteName}
          slug={slug}
        />
      </div>
      <DocsLayout
        extraTopMargin={announcementText ? true : false}
        siteId={siteId}
        LeftSidebarContent={() => <Sidebar sidebar={sidebar} slug={slug} />}
        RightSidebarContent={() => (
          <div>
            <div className='prose-sm prose-ul:relative prose-ul:-left-5 dark:prose-invert'>
              <p className='mb-5 text-sm font-semibold'>On this page</p>
              <ul dangerouslySetInnerHTML={{ __html: tocHtml }}></ul>
            </div>
          </div>
        )}
        repoUrl={repoUrl}
        fileName={`${fileName}.md`}
        footerText={footerText}>
        <MDXRenderer>
          {/* @ts-ignore */}
          <Component components={DocsMDXcomponents} />
        </MDXRenderer>
        <div className='my-10 flex flex-wrap items-center justify-between'>
          <DocsPageNavCard
            slug={slug}
            pageTitle={prevPage === 'index' ? '' : prevPage}
            pageSlug={prevPage === 'index' ? siteName : prevPage}
            title='&larr; Previous'
          />
          {nextPage && (
            <DocsPageNavCard
              slug={slug}
              pageTitle={nextPage}
              title='Next &rarr;'
            />
          )}
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

  try {
    const slug = params?.slug as string;
    const filename = params?.file as string;

    console.log(filename);

    const mdToHtml = new Remarkable();

    const allFiles = await getAllFiles(
      siteData?.repoLink || '',
      siteData?.gitHubAccessToken || ''
    );

    // console.log(allFiles);

    let sidebar;

    try {
      sidebar = await getSidebar(siteData);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      let filesArray: string[] = allFiles.data.map((file) =>
        file.name.replace(/\.md$/, '')
      );

      sidebar = filesArray.filter((file: string) => file !== 'index');
    }

    const content = await getFileContent(
      siteData?.repoLink || '',
      filename + '.md',
      siteData?.gitHubAccessToken?.toString()
    );

    const tocHtml = mdToHtml.render(mdToc(content).content);

    const [nextPage, prevPage] = [
      getNextItem(sidebar, filename),
      getPreviousItem(sidebar, filename),
    ];

    const asasd = prevPage || 'index';

    console.log({ asasd });

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
        sidebar: sidebar,
        navLinks: siteData?.navbarLinks,
        navCta: siteData?.navbarCta,
        siteName: siteData?.siteName,
        slug: siteData?.siteSlug,
        siteId: siteData?.id,
        description: siteData?.siteDescription,
        footerText: siteData?.footerText,
        nextPage: nextPage || '',
        prevPage: prevPage || 'index',
        announcementText: siteData?.announcement?.split('|||')[0] || null,
        announcementUrl: siteData?.announcement?.split('|||')[1] || null,
        repoUrl: siteData?.repoLink,
      },
      revalidate: 15 * 60,
    };
    // @ts-ignore
  } catch (error: Error) {
    const { submit } = web3forms({
      apikey: siteData?.gitHubAccessToken || '',
      onSuccess: () => {
        console.log('Success');
      },
      onError: () => {
        console.log('Error');
      },
    });

    submit({
      message: `Hey I'm Hyperdocs bot. There's an error with the ${siteData?.siteName}. While building the docs for docs/${filename}.md, the bundler threw an error. Please check the error`,
      error: error.message,
      'Visit Page on GitHub': `${siteData?.repoLink}/blob/master/docs/${filename}.md`,
    });

    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
