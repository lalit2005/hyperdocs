import { Heading3, Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Empty from '@/components/Empty';
import FeedbackCard from '@/components/FeedbackCard';

const Feedbacks = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const { data: site, mutate } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${siteId}`);

  return (
    <DashboardLayout
      siteName={site?.siteName}
      title='Feedbacks'
      subtitle='Feedbacks that people submitted through the documentation website'
      active='feedbacks'
    >
      <div className='max-w-4xl'>
        <div>
          {!site?.web3formsKey && (
            <div className='inline-block rounded-md bg-green-300 p-5 dark:bg-green-800'>
              <Markdown text='Make sure you have set up your [Web3forms](https://web3forms.com) API key in settings to recieve an email whenever someone submits a form.' />
            </div>
          )}
        </div>
        <Heading3 className='mt-10'>All Feedbacks</Heading3>
        <div className='mt-4 space-y-3'>
          {site?.feedbacks?.map((feedback) => {
            return (
              <FeedbackCard
                feedback={feedback}
                mutate={mutate}
                key={feedback.id}
                data={site}
              />
            );
          })}
        </div>
        {site?.feedbacks?.length === 0 && (
          <div className='space-y-4 p-5'>
            <Empty />
            <TextSmall className='text-center'>No feedbacks yet!</TextSmall>
          </div>
        )}
        {}
      </div>
    </DashboardLayout>
  );
};

export default Feedbacks;
