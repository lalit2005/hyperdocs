import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Heading3, Markdown, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

const Settings = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId}`
  );

  const [ghToken, setGhToken] = useState(data?.gitHubAccessToken);
  const [web3formsKey, setWeb3formsKey] = useState(data?.web3formsKey);

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'>
      <div>
        <Card
          title='GitHub token'
          subtitle='Add this if you want to host docs from a _private repo_. You can get your token from [here](https://github.com/settings/tokens/new). Make sure you **give access to repos** while creating the token'>
          <div className='flex'>
            <Input
              className='w-full mr-3'
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
              }}>
              Save
            </Button>
          </div>
        </Card>

        <Card
          title='Web3forms API key'
          subtitle='Get your API key from [here](https://web3forms.com). This API key will be used for sending an email to you once a **feedback** is submitted from the docs site. You can access all the feedbacks here in the dashboard too.'>
          <div className='flex'>
            <Input
              className='w-full mr-3'
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
              }}>
              Save
            </Button>
          </div>
        </Card>

        <Card
          title='Danger'
          subtitle='Delete your site **permanently**, this cannot be reversed'>
          <DialogRoot>
            <DialogTrigger>
              <Button className='!text-red-400 w-full font-bold' noInvert>
                Delete {data?.siteName}
              </Button>
            </DialogTrigger>
            <DialogContent
              title={`Delete ${data?.siteName}`}
              description='Are you sure? This **cannot** be reversed!!!'>
              <Button
                noInvert
                className='!text-red-500 text-bold text-lg w-full my-5 hover:!border-red-500 !border'
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
                }}>
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
      <div className='rounded shadow-sm border dark:border-slate-700 p-4 max-w-3xl w-full my-9'>
        <Heading3>{title}</Heading3>
        <TextSmall className='my-2'>
          <Markdown text={subtitle} />
        </TextSmall>
        <div className='mt-6 max-w-xl'>{props.children}</div>
      </div>
    </div>
  );
};
