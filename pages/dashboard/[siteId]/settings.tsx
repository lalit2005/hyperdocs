import { Button } from '@/components/ui/Button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/Menu';
import { Heading3, TextSmall } from '@/components/ui/Typography';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Site } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

const Settings = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId}`
  );

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'>
      <div>
        <Card
          title='Danger'
          subtitle='Delete your site permanently, this cannot be reversed'>
          <Button className='!text-red-400 font-bold' noInvert>
            Delete {data?.siteName}
          </Button>
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
      <div className='rounded shadow-sm border dark:border-slate-700 p-4 max-w-3xl w-full my-5'>
        <Heading3>{title}</Heading3>
        <TextSmall className='my-2'>{subtitle}</TextSmall>
        <div className='mt-6'>{props.children}</div>
      </div>
    </div>
  );
};
