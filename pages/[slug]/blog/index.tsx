import DocsNav from '@/components/docs/navbar';
import { CustomLink } from '@/components/ui/Link';
import { Heading1 } from '@/components/ui/Typography';
import prisma from '@/utils/prisma';
import { Blog, NavbarLink } from '@prisma/client';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

const BlogsPage: NextPage<{
  blogs: Blog[];
  navbarLinks: NavbarLink[];
  navbarCta: string;
  logo: string;
  siteId: string;
}> = ({ blogs, navbarLinks, navbarCta, logo }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <DocsNav links={navbarLinks} navbarCta={navbarCta} logo={logo} />

      <main className='max-w-3xl mx-auto p-5 mt-10'>
        <Heading1 className='my-10'>Blog</Heading1>
        {blogs?.map((blog) => {
          return (
            <CustomLink
              key={blog.id}
              href={`/${slug}/blog/${blog.slug}`}
              noInvert
              className='!p-5 hover:scale-[1.02] transition-all duration-75 border my-3'>
              <h2 className='text-2xl font-bold'>{blog.title}</h2>
              <p className='text-slate-600 dark:text-slate-400 my-2'>
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
