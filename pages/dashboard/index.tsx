import DashboardNav from '@/components/DashboardNav';
import { Input } from '@/components/ui/Input';
import { CustomLink } from '@/components/ui/Link';
import Loader from '@/components/ui/Loader';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Site } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import useSWR from 'swr';
import truncate from 'lodash.truncate';

const Dashboard = () => {
  const { data, error } = useSWR<Site[]>('/api/get/dashboard-data');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const results =
    data &&
    data.filter((site) => {
      return site.siteName.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
            autoComplete='off'
            placeholder='Search...'
            id='search-input'
            className='max-w-[10/12] w-full'
          />
          <CustomLink href='/new' className='ml-5 block w-52 p-0 text-center'>
            <Plus className='inline-block relative -top-px' />{' '}
            <span className='hidden md:inline-block'>New Project</span>
          </CustomLink>
        </div>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {!data && !error && <Loader />}
          {results &&
            results.map((site) => {
              return (
                site.siteName.includes(searchQuery) && (
                  <div key={site.id}>
                    <CustomLink
                      href={`/dashboard/${site.id}`}
                      noInvert
                      className='hover:scale-[1.01] focus:scale-[1.01] transition-all !p-5 h-full'>
                      <h3 className='text-xl font-bold capitalize'>
                        {site.siteName}
                      </h3>
                      <p className='mt-5 dark:text-slate-300'>
                        {truncate(site.siteDescription, {
                          length: 100,
                        })}
                      </p>
                    </CustomLink>
                  </div>
                )
              );
            })}
          {results?.length == 0 && (
            <p className='text-red-400'>No results found for `{searchQuery}`</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
