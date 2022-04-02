import CommonComponents from '@/components/docs/CommonComponents';
import HomepageMDXcomponents from '@/components/docs/homepage/components';
import DocsNav from '@/components/docs/navbar';
import bundleMdxContent from '@/lib/mdx-bundler';
import prisma from '@/utils/prisma';
import { NavbarLink } from '@prisma/client';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useMemo } from 'react';

const Index: NextPage<{
  homepageContent: string;
  navLinks: NavbarLink[];
  navbarCta: string;
  siteName: string;
  slug: string;
  announcementText?: string;
  announcementUrl?: string;
}> = ({
  homepageContent,
  slug,
  navLinks,
  navbarCta,
  siteName,
  announcementText,
  announcementUrl,
}) => {
  const Component = useMemo(
    () => getMDXComponent(homepageContent),
    [homepageContent]
  );

  return (
    <div>
      <div className='sticky top-0'>
        <CommonComponents
          announcementText={announcementText}
          announcementUrl={announcementUrl}
        />
        <DocsNav
          slug={slug}
          links={navLinks}
          navbarCta={navbarCta}
          logo={siteName}
        />
      </div>
      <div>
        <Component components={HomepageMDXcomponents} />
      </div>
    </div>
  );
};

export default Index;

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

  const homepageMdx = siteData?.homePage;

  const homepageContent = (await bundleMdxContent(homepageMdx || '')).code;

  return {
    props: {
      homepageContent,
      navLinks: siteData?.navbarLinks,
      navbarCta: siteData?.navbarCta,
      siteName: siteData?.siteName,
      slug,
      announcementText: siteData?.announcement?.split('|||')[0],
      announcementUrl: siteData?.announcement?.split('|||')[1],
    },
    revalidate: 15 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
