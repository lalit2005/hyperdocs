import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

const Announcement = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${router.query.siteId as string}`);

  // announcement-text and announcement-link will be stored in a single field separated by '|||'
  const [announcementText, setAnnouncementText] = useState(
    data?.announcement?.split('|||')[0]
  );
  const [announcementLink, setAnnouncementLink] = useState(
    data?.announcement?.split('|||')[1]
  );

  return (
    <DashboardLayout
      title='Announcement'
      subtitle='This text shows up as banner on the top of the website. You can use it for announcing new releases or other milestones'
      active='announcement'>
      <form>
        <div>
          <TextSmall>Announcement text</TextSmall>
          <Input
            onChange={(e) => {
              // @ts-ignore
              setAnnouncementText(e.target.value);
            }}
            value={announcementText}
            placeholder='Version 3 of Hyperdocs is released 🎉 ->'
            className='inline-block max-w-3xl w-full'
          />
        </div>
        <div className='mt-10'>
          <TextSmall>The URL opened when user clicks the banner</TextSmall>
          <Input
            onChange={(e) => {
              // @ts-ignore
              setAnnouncementLink(e.target.value);
            }}
            type='url'
            value={announcementLink}
            placeholder='https://hyperdocs.tk/blog/version-3'
            className='inline-block max-w-3xl w-full'
          />
        </div>
        <div className='mt-14'>
          <Button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              const postReq = axios
                .post('/api/update/announcement', {
                  announcement: `${announcementText}|||${announcementLink}`,
                  siteId: data?.id,
                })
                .then(({ data }) => {
                  mutate(data);
                });
              toast.promise(postReq, {
                loading: 'Updating...',
                success: 'Updated successfully!',
                error: 'Failed to update!',
              });
            }}>
            Save
          </Button>
        </div>
      </form>
      <TextSmall className='opacity-70 max-w-lg mt-3'>
        Remove the text and link (you should be able to see the placeholder in
        both the input fields) to hide the announcement banner
      </TextSmall>
    </DashboardLayout>
  );
};

export default Announcement;
