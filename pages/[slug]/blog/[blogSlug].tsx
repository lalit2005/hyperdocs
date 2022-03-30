import DocsMDXcomponents from '@/components/docs/documentation/components';
import MDXRenderer from '@/components/docs/MDXRenderer';
import DocsNav from '@/components/docs/navbar';
import bundleMdxContent from '@/lib/mdx-bundler';
import prisma from '@/utils/prisma';
import { NavbarLink } from '@prisma/client';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useMemo } from 'react';

const BlogPage: NextPage<{
  mdxCode: string;
  updatedAt: string;
  ogImageUrl: string;
  title: string;
  description: string;
  navbarLinks: NavbarLink[];
  navbarCta: string;
  author: string;
  logo: string;
  slug: string;
}> = ({
  mdxCode,
  description,
  logo,
  navbarCta,
  navbarLinks,
  ogImageUrl,
  title,
  author,
  updatedAt,
  slug,
}) => {
  const Component = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);
  return (
    <div>
      <DocsNav
        slug={slug}
        links={navbarLinks}
        navbarCta={navbarCta}
        logo={logo}
      />
      <main className='mx-auto mt-10 max-w-4xl p-5'>
        <h2 className='text-5xl font-extrabold'>{title}</h2>
        <p className='my-2 text-lg text-slate-600 dark:text-slate-400'>
          {description}
        </p>

        <p className='my-5 text-sm text-opacity-30'>
          Posted by:{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://twitter.com/${author}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://unavatar.io/twitter/${author}`}
              width={25}
              height={25}
              className='ml-1 mr-1 inline-block rounded-full'
              alt=''
            />
            <span className='text-blue-600 dark:text-blue-400'>
              {author.startsWith('@') ? author : `@${author}`}
            </span>
          </a>
        </p>

        {ogImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ogImageUrl}
            alt=''
            className='mt-10 rounded-xl'
            width={1200}
            height={600}
          />
        )}
        <div className='mt-14'>
          <MDXRenderer>
            {/* @ts-ignore */}
            <Component components={DocsMDXcomponents} />
          </MDXRenderer>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = await prisma.blog.findFirst({
    where: {
      slug: params?.blogSlug as string,
      site: {
        siteSlug: params?.slug as string,
      },
    },
    include: {
      site: {
        include: {
          navbarLinks: true,
        },
      },
    },
  });

  const mdxCode = (await bundleMdxContent(blog?.content || '')).code;

  return {
    props: {
      mdxCode,
      updatedAt: blog?.updatedAt.toString(),
      ogImageUrl: blog?.ogImageUrl,
      title: blog?.title,
      description: blog?.description,
      navbarLinks: blog?.site?.navbarLinks,
      navbarCta: blog?.site?.navbarCta,
      logo: blog?.site?.siteName,
      author: blog?.postedBy,
      slug: blog?.site?.siteSlug,
    },
    revalidate: 15 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
