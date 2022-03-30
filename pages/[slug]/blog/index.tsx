import DocsNav from '@/components/docs/navbar';
import { CustomLink } from '@/components/ui/Link';
import { Heading1 } from '@/components/ui/Typography';
import prisma from '@/utils/prisma';
import { Blog, NavbarLink } from '@prisma/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

const BlogsPage: NextPage<{
  blogs: Blog[];
  navbarLinks: NavbarLink[];
  navbarCta: string;
  logo: string;
  siteId: string;
  slug: string;
}> = ({ blogs, slug, navbarLinks, navbarCta, logo }) => {
  return (
    <div>
      <DocsNav
        slug={slug}
        links={navbarLinks}
        navbarCta={navbarCta}
        logo={logo}
      />

      <main className='mx-auto mt-10 max-w-3xl p-5'>
        <Heading1 className='my-10'>Blog</Heading1>
        {blogs?.map((blog) => {
          return (
            <CustomLink
              key={blog.id}
              href={`/${slug}/blog/${blog.slug}`}
              noInvert
              className='my-3 border !p-5 transition-all duration-75 hover:scale-[1.02]'
            >
              <h2 className='text-2xl font-bold'>{blog.title}</h2>
              <p className='my-2 text-slate-600 dark:text-slate-400'>
                {blog.description}
              </p>
            </CustomLink>
          );
        })}
      </main>
    </div>
  );
};

export default BlogsPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let siteData = await prisma.site.findUnique({
    where: {
      siteSlug: params?.slug as string,
    },
    include: {
      blogs: {
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          published: true,
        },
      },
      navbarLinks: true,
    },
  });

  // @ts-ignore
  siteData.blogs = siteData?.blogs.map((x) => {
    // @ts-ignore
    x.createdAt = Math.floor(x.createdAt / 1000);
    // @ts-ignore
    x.updatedAt = Math.floor(x.updatedAt / 1000);
    return x;
  });

  return {
    props: {
      blogs: siteData?.blogs || [],
      navbarLinks: siteData?.navbarLinks || [],
      navbarCta: siteData?.navbarCta || '',
      logo: siteData?.siteName || '',
      siteId: siteData?.id || '',
      slug: siteData?.siteSlug || 'hyperdocs',
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
