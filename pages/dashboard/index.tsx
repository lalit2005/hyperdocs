import DashboardNav from '@/components/DashboardNav';
import { Input } from '@/components/ui/Input';
import { CustomLink } from '@/components/ui/Link';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const searchInput = document.getElementById(
          'search-input'
        ) as HTMLInputElement;
        searchInput.value === '' && e.preventDefault();
        searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedRoute>
      <DashboardNav />
      <div className='max-w-6xl mx-auto px-10'>
        <div className='w-full flex justify-between'>
          <Input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder='Search...'
            id='search-input'
            className='max-w-[10/12] w-full'
          />
          <CustomLink href='/new' className='ml-5 block w-52 p-0 text-center'>
            <Plus className='inline-block relative -top-px' /> New Project
          </CustomLink>
        </div>
        <p className='mt-5'>Search results for: {searchQuery}</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
