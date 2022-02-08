import { Button } from '@/components/ui/Button';
import { TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Site } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReactTextareaAutosize from 'react-textarea-autosize';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const SnippetInjection = () => {
  const router = useRouter();

  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId as string}`
  );

  const [head, setHead] = useState(data?.customHead);

  return (
    <DashboardLayout
      title='Snippet Injection'
      subtitle='Inject custom code such as analytics, popup menus, CSS stylesheets, custom fonts, etc.'
      active='snippet-injection'>
      <div>
        <div>
          <TextSmall className='font-mono text-xl'>{'<head>'}</TextSmall>
          <ReactTextareaAutosize
            minRows={5}
            placeholder='Add your custom stylesheets(themes) or analytics here'
            className='text-input font-mono max-w-3xl w-full'
            onChange={(e) => {
              setHead(e.target.value);
            }}
            defaultValue={data?.customHead as string}
          />
          <TextSmall className='font-mono text-xl'>{'</head>'}</TextSmall>
        </div>
        <div className='mt-10'>
          <Button
            onClick={() => {
              const postReq = axios.post('/api/update/custom-head', {
                customHead: head,
                siteId: data?.id,
              });
              toast.promise(postReq, {
                loading: 'Updating...',
                success: 'Updated successfully!',
                error: 'Failed to update!',
              });
              mutate(data);
            }}>
            Save
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SnippetInjection;
