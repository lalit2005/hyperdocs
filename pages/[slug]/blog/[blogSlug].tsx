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
}) => {
  const Component = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);
  return (
    <div>
      <DocsNav links={navbarLinks} navbarCta={navbarCta} logo={logo} />
      <main className='max-w-4xl mx-auto p-5 mt-10'>
        <h2 className='text-5xl font-extrabold'>{title}</h2>
        <p className='text-slate-600 text-lg dark:text-slate-400 my-2'>
          {description}
        </p>

        <p className='text-opacity-30 text-sm my-5'>
          Posted by:{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://twitter.com/${author}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://unavatar.io/twitter/${author}`}
              width={25}
              height={25}
              className='rounded-full inline-block ml-1 mr-1'
              alt=''
            />
            <span className='dark:text-blue-400 text-blue-600'>
              {author.startsWith('@') ? author : `@${author}`}
            </span>
          </a>
        </p>

        {ogImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ogImageUrl}
            alt=''
            className='rounded-xl mt-10'
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
