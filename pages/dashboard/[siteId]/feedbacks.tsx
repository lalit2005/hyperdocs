import { CustomLink } from '@/components/ui/Link';
import { Heading3, Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, Site } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ReactStars from 'react-stars';
import truncate from 'lodash.truncate';
import { formatRelative } from 'date-fns';
import Empty from '@/components/Empty';

const Feedbacks = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const { data: feedbacks } = useSWR<Feedback[]>(
    `/api/get/feedbacks/?siteId=${siteId}`
  );
  const { data } = useSWR<Site>(`/api/get/site/?siteId=${siteId}`);

  return (
    <DashboardLayout
      title='Feedbacks'
      subtitle='Feedbacks that people submitted through the documentation website'
      active='feedbacks'>
      <div className='max-w-4xl'>
        <div>
          {!data?.web3formsKey && (
            <div className='dark:bg-green-800 bg-green-300 p-5 rounded-md inline-block'>
              <Markdown text='Make sure you have set up your [Web3forms](https://web3forms.com) API key in settings to recieve an email whenever someone submits a form.' />
            </div>
          )}
        </div>
        <Heading3 className='mt-10'>All Feedbacks</Heading3>
        <div className='mt-4 space-y-3'>
          {feedbacks?.map((feedback) => {
            return (
              <div
                key={feedback.id}
                className='flex justify-between items-center p-3 rounded border border-slate-300 dark:border-slate-700 shadow'>
                <ReactStars edit={false} size={20} value={feedback.stars} />
                <TextSmall className='font-semibold'>
                  {truncate(feedback.feedback, {
                    length: 50,
                  })}
                </TextSmall>
                <TextSmall>
                  {formatRelative(
                    new Date(feedback.createdAt),
                    new Date()
                    // make first letter caps
                  ).replace(/^./, (str) => str.toUpperCase())}
                </TextSmall>
              </div>
            );
          })}
        </div>
        {feedbacks?.length === 0 && (
          <div className='p-5 space-y-4'>
            <Empty />
            <TextSmall className='text-center'>No feedbacks yet!</TextSmall>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Feedbacks;
