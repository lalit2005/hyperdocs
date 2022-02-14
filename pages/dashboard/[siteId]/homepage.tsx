import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import ReactTextareaAutosize from 'react-textarea-autosize';

const Blog = () => {
  const router = useRouter();

  const { data, mutate } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${router.query.siteId as string}`);

  const [homepage, setHomepage] = useState(data?.homePage);

  return (
    <DashboardLayout
      title='Homepage'
      // TODO: Add docs link
      subtitle={`Create the homepage of your documentation with pre-made components. Visit [docs](docs) for more info.Want a new component? Just ask for it [here](https://github.com/lalit2005/hyperdocs/issues/new)`}
      active='homepage'>
      <div className='max-w-3xl'>
        <ReactTextareaAutosize
          minRows={7}
          // TODO: Add docs link
          placeholder='Build your homepage in markdown here with all the available react components. Visit docs for more info.'
          className='text-input font-mono w-full'
          // @ts-ignore
          value={homepage}
          onChange={(e) => {
            setHomepage(e.target.value);
          }}
        />
      </div>
      <Button
        className='mt-7'
        onClick={() => {
          const req = axios
            .post('/api/update/homepage', {
              homepage,
              siteId: data?.id,
            })
            .then(({ data }) => {
              mutate(data);
            });
          toast.promise(req, {
            loading: 'Updating...',
            success: 'Updated successfully!',
            error: 'Failed to update!',
          });
        }}>
        Save
      </Button>
    </DashboardLayout>
  );
};

export default Blog;
