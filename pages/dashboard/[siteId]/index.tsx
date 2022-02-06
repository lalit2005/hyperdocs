import DashboardLayout from '@/layouts/DashboardLayout';
import { Site } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Index = () => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const { data } = useSWR<Site>(`/api/get/site/?siteId=${siteId}`);

  return (
    <DashboardLayout
      active='overview'
      title='Overview'
      subtitle={`A brief overview and status of **${data?.siteName}**`}>
      {data?.siteDescription}
    </DashboardLayout>
  );
};

export default Index;
