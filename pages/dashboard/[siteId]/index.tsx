import { CustomLink } from '@/components/ui/Link';
import { Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Index = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const { data } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${siteId}`);

  return (
    <DashboardLayout
      active='overview'
      title='Overview'
      subtitle={`A brief overview and status of **${data?.siteName}**`}
    >
      <div>
        <CustomLink
          className='my-2 mr-2 block sm:my-auto sm:inline'
          href={`https://hyperdocs.tk/${data?.siteSlug}`}
          target='_blank'
          noInvert
          rel='noopener noreferrer'
        >
          Visit site
        </CustomLink>
        <CustomLink
          className='my-2 mr-2 block sm:my-auto sm:inline'
          noInvert
          href={`https://pagespeed.web.dev/report/?url=https://hyperdocs.tk/${data?.siteSlug}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          View Lighthouse score
        </CustomLink>
        <CustomLink
          className='my-2 block sm:my-auto sm:inline'
          noInvert
          href={data?.repoLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          View repository on GitHub
        </CustomLink>
      </div>
      <div className='mt-10'>
        <TextSmall>
          <Markdown
            text={`Site was last updated at: **${new Date(
              data?.updatedAt || ''
            ).toLocaleString()}**`}
          />
        </TextSmall>
      </div>
    </DashboardLayout>
  );
};

export default Index;
