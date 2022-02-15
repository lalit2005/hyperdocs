import { Heading2, Heading3 } from '@/components/ui/Typography';
import { CustomLink } from '@/components/ui/Link';
import { Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Tooltip } from 'react-tiny-tooltip';
import {
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/Dialog';

const Navbar = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const { data, mutate } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${siteId}`);

  // navbarCta is in the form of ctaText|||ctaLink
  const [ctaText, setCtaText] = useState(
    data?.navbarCta?.split('|||')[0] || ''
  );
  const [ctaLink, setCtaLink] = useState(
    data?.navbarCta?.split('|||')[1] || ''
  );

  const [navLinkText, setnavLinkText] = useState('');
  const [navLinkUrl, setnavLinkUrl] = useState('');

  return (
    <DashboardLayout
      title='Navbar'
      subtitle='Customize the navbar of the documentation website'
      active='navbar'
    >
      <div className='max-w-3xl'>
        <div>
          <Heading3>CTA button</Heading3>
          <div>
            <TextSmall className='mt-8'>
              Text that appears in the CTA button
            </TextSmall>
            <Input
              value={ctaText}
              placeholder='Sponsor 💜'
              onChange={(e) => setCtaText(e.target.value)}
              className='w-full'
            />
            <TextSmall className='mt-5'>
              Link that the user is taken to when the button is clicked
            </TextSmall>
            <Input
              value={ctaLink}
              placeholder='https://github.com/sponsors/sindresorhus'
              onChange={(e) => setCtaLink(e.target.value)}
              className='w-full'
            />
            <Button
              className='mt-8'
              onClick={() => {
                const req = axios.post('/api/update/navbar-cta', {
                  siteId,
                  navbarCta: `${ctaText}|||${ctaLink}`,
                });
                toast.promise(req, {
                  success: 'Updated!',
                  error: 'Failed to update',
                  loading: 'Updating...',
                });
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className='mt-14'>
          <Heading3>Links to be shown in the navbar</Heading3>
          <div className='mt-5'>
            {data?.navbarLinks.map((link) => {
              return (
                <div
                  key={link.id}
                  className='flex w-full justify-between rounded py-2 px-2 hover:bg-slate-100 dark:hover:bg-slate-900'
                >
                  <TextSmall>{link.linkText}</TextSmall>
                  <TextSmall>
                    <Tooltip content={link.link} side='right' sideOffset={5}>
                      <Markdown text={`[${link.linkText}](${link.link})`} />
                    </Tooltip>
                  </TextSmall>
                  <Button
                    noInvert
                    className='!p-0 !px-1'
                    onClick={() => {
                      const req = axios
                        .post('/api/delete/navbar-link', {
                          id: link.id,
                        })
                        .then(() => {
                          // @ts-ignore
                          mutate((data) => {
                            return {
                              ...data,
                              navbarLinks: data?.navbarLinks.filter(
                                (l) => l.id !== link.id
                              ),
                            };
                          });
                        });
                      toast.promise(req, {
                        success: 'Deleted!',
                        error: 'Failed to delete',
                        loading: 'Deleting...',
                      });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
            <DialogRoot>
              <DialogTrigger>
                <Button className='mt-5 w-full'>Add new link</Button>
              </DialogTrigger>
              <DialogContent
                title='Create a navbar link'
                description='This will be updated in the website soon'
              >
                <div className='mt-5 space-y-3'>
                  <div>
                    <TextSmall>Text that appears</TextSmall>
                    <Input
                      placeholder='Blog'
                      className='w-full'
                      value={navLinkText}
                      onChange={(e) => setnavLinkText(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextSmall>
                      Link that the user is taken to when the link is clicked
                    </TextSmall>
                    <Input
                      placeholder='https://hyperdocs.tk/blog'
                      className='w-full'
                      value={navLinkUrl}
                      onChange={(e) => setnavLinkUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='mt-8'>
                  <Button
                    onClick={() => {
                      const req = axios
                        .post('/api/create/navbar-link', {
                          siteId,
                          linkText: navLinkText,
                          link: navLinkUrl,
                        })
                        .then(() => {
                          // @ts-ignore
                          mutate((data) => {
                            return {
                              ...data,
                              navbarLinks: [
                                // @ts-ignore
                                ...data?.navbarLinks,
                                {
                                  id: Math.random().toString(),
                                  linkText: navLinkText,
                                  link: navLinkUrl,
                                },
                              ],
                            };
                          });
                        });
                      toast.promise(req, {
                        success: 'Created!',
                        error: 'Failed to create',
                        loading: 'Creating...',
                      });
                      setnavLinkText('');
                      setnavLinkUrl('');
                    }}
                  >
                    Add link
                  </Button>
                </div>
              </DialogContent>
            </DialogRoot>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Navbar;
