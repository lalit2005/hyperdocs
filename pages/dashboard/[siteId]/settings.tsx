import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Heading3, Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feedback, NavbarLink, Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { z } from 'zod';

interface SiteDetails {
  siteName: string;
  siteDescription: string;
  ogImageUrl: string;
}

const Settings = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >(`/api/get/site/?siteId=${router.query.siteId}`);

  const [ghToken, setGhToken] = useState(data?.gitHubAccessToken);
  const [web3formsKey, setWeb3formsKey] = useState(data?.web3formsKey);

  const [slug, setSlug] = useState(data?.siteSlug);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteDetails>({
    resolver: zodResolver(
      z.object({
        siteName: z
          .string()
          .min(1, 'Site name must be more than a character')
          .max(100, 'Site name must be less than 100 characters'),
        siteDescription: z
          .string()
          .min(1, 'Site description must be more than a character')
          .max(150, 'Site description must be less than 150 characters'),
        ogImageUrl: z.string().url('Please enter a valid URL'),
      })
    ),
    defaultValues: {
      siteName: data?.siteName,
      siteDescription: data?.siteDescription,
      ogImageUrl: data?.ogImageUrl,
    },
  });

  const updateSiteDetails = (siteDetails: SiteDetails) => {
    const req = axios
      .post('/api/update/site-details', { ...siteDetails, siteId: data?.id })
      .then(() => {
        // @ts-ignore
        mutate({ ...data, ...siteDetails });
      });

    toast.promise(req, {
      success: 'Updated successfully',
      error: 'There was an error updating the site details',
      loading: 'Updating...',
    });
  };

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'
      siteName={data?.siteName}
    >
      <div>
        <Card
          title='Site details'
          subtitle='These will appear on the docs navbar and SEO as well'
        >
          <form
            className='space-y-3'
            onSubmit={handleSubmit(updateSiteDetails)}
          >
            <div>
              <TextSmall>Site name</TextSmall>
              <input {...register('siteName')} className='text-input w-full' />
              <TextSmall className='mt-1 text-xs !text-red-400'>
                {errors.siteName?.message}
              </TextSmall>
            </div>
            <div>
              <TextSmall>Site description</TextSmall>
              <input
                {...register('siteDescription')}
                className='text-input w-full'
              />
              <TextSmall className='mt-1 text-xs !text-red-400'>
                {errors.siteDescription?.message}
              </TextSmall>
            </div>
            <div className='mb-10'>
              <TextSmall>OG image</TextSmall>
              <input
                {...register('ogImageUrl')}
                className='text-input w-full'
              />
              <TextSmall className='mt-1 text-xs !text-red-400'>
                {errors.ogImageUrl?.message}
              </TextSmall>
            </div>
            <div className='pt-5'>
              <Button type='submit'>Update</Button>
            </div>
          </form>
        </Card>

        <Card
          title='Repository link on GitHub'
          subtitle='The markdown files for generating the documentaion will be fetched from this repo on GitHub'
        >
          <form
            className='flex'
            onSubmit={(e) => {
              e.preventDefault();
              const req = axios
                .post('/api/update/repo-link', {
                  siteId: data?.id,
                  repoLink: e.currentTarget.repoLink.value,
                })
                .then(({ data }) => {
                  mutate({ ...data }, false);
                });
              toast.promise(req, {
                success: 'Updated successfully',
                error: 'There was an error updating the site details',
                loading: 'Updating...',
              });
            }}
          >
            <Input
              defaultValue={data?.repoLink}
              name='repoLink'
              pattern='^https:\/\/github.com\/[^/]+\/[^/]+$'
              className='mr-3 inline-block w-full'
            />
            <Button type='submit'>Update</Button>
          </form>
        </Card>

        <Card
          title='Site slug'
          subtitle={`The site will be be hosted at **hyperdocs.netlify.app/${slug}**, a custom domain can be added later`}
        >
          <div className='flex'>
            <Input
              className='mr-3 w-full'
              placeholder='my-project'
              defaultValue={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button
              onClick={() => {
                const req = axios
                  .post('/api/update/site-slug', {
                    siteId: data?.id,
                    slug,
                  })
                  // @ts-ignore
                  .then(() => mutate({ ...data, siteSlug: slug }));
                toast.promise(req, {
                  success: 'Updated successfully!',
                  error: 'There was an error updating the site slug',
                  loading: 'Updating...',
                });
              }}
            >
              Save
            </Button>
          </div>
        </Card>

        <Card
          title='GitHub token'
          subtitle='Add this if you want to host docs from a private repo. You can get your token from [here](https://github.com/settings/tokens/new). Make sure you **give access to repos** while creating the token'
        >
          <div className='flex'>
            <Input
              className='mr-3 w-full'
              placeholder='ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              value={ghToken || ''}
              onChange={(e) => {
                setGhToken(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                const req = axios.post('/api/update/github-token', {
                  siteId: data?.id,
                  ghToken,
                });
                toast.promise(req, {
                  loading: 'Updating...',
                  success: 'Updated successfully!',
                  error: 'Failed to update!',
                });
              }}
            >
              Save
            </Button>
          </div>
        </Card>

        <Card
          title='Web3forms API key'
          subtitle='Get your API key from [here](https://web3forms.com). This API key will be used for sending an email to you once a **feedback** is submitted from the docs site. You can access all the feedbacks here in the dashboard too.'
        >
          <div className='flex'>
            <Input
              className='mr-3 w-full'
              placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
              value={web3formsKey || ''}
              onChange={(e) => {
                setWeb3formsKey(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                const req = axios.post('/api/update/web3forms-key', {
                  siteId: data?.id,
                  web3formsKey,
                });
                toast.promise(req, {
                  loading: 'Updating...',
                  success: 'Updated successfully!',
                  error: 'Failed to update!',
                });
              }}
            >
              Save
            </Button>
          </div>
        </Card>

        <Card
          title='Danger'
          subtitle='Delete your site **permanently**, this cannot be reversed'
        >
          <DialogRoot>
            <DialogTrigger>
              <Button className='w-full font-bold !text-red-400' noInvert>
                Delete {data?.siteName}
              </Button>
            </DialogTrigger>
            <DialogContent
              title={`Delete ${data?.siteName}`}
              description='Are you sure? This **cannot** be reversed!!!'
            >
              <Button
                noInvert
                className='text-bold my-5 w-full !border text-lg !text-red-500 hover:!border-red-500'
                onClick={() => {
                  const req = axios
                    .post('/api/delete/site', {
                      siteId: data?.id,
                    })
                    .then(() => {
                      router.push('/dashboard');
                    });

                  toast.promise(req, {
                    loading: 'Deleting...',
                    success: 'Deleted successfully!',
                    error: 'Failed to delete!',
                  });
                }}
              >
                Delete it now
              </Button>
            </DialogContent>
          </DialogRoot>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

const Card: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
  ...props
}) => {
  return (
    <div>
      <div className='my-9 w-full max-w-3xl rounded border p-4 shadow-sm dark:border-gray-800'>
        <Heading3>{title}</Heading3>
        <TextSmall className='my-2'>
          <Markdown text={subtitle} />
        </TextSmall>
        <div className='mt-6 max-w-xl'>{props.children}</div>
      </div>
    </div>
  );
};
