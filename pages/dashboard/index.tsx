import DashboardNav from '@/components/DashboardNav';
import { Heading2 } from '@/components/ui/Typography';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <ProtectedRoute>
      <DashboardNav />
      <div className='max-w-6xl mx-auto px-10'>
        <Heading2>{user?.name}&apos;s Documentation sites</Heading2>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
