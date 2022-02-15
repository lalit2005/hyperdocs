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
import { TextSmall } from '@/components/ui/Typography';
import Empty from '@/components/Empty';

const Dashboard = () => {
  const { data, error } = useSWR<Site[]>('/api/get/dashboard-data');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const results =
    data &&
    data.length !== 0 &&
    data.filter((site) => {
      return (
        site.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.siteDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
      <div className='mx-auto max-w-6xl px-10'>
        <div className='flex w-full justify-between'>
          <Input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            autoComplete='off'
            placeholder='Search...'
            id='search-input'
            className='w-full max-w-[10/12]'
          />
          <CustomLink href='/new' className='ml-5 block w-52 p-0 text-center'>
            <Plus className='relative -top-px inline-block' />{' '}
            <span className='hidden md:inline-block'>New Project</span>
          </CustomLink>
        </div>
        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {!data && !error && <Loader />}
          {results &&
            results.map((site) => {
              return (
                <div key={site.id}>
                  <CustomLink
                    href={`/dashboard/${site.id}`}
                    noInvert
                    className='h-full !p-5 transition-all hover:scale-[1.01] focus:scale-[1.01]'
                  >
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
              );
            })}
          {/* @ts-ignore */}
          {results?.length == 0 && (
            <p className='text-red-400'>No results found for `{searchQuery}`</p>
          )}
        </div>
        {data?.length == 0 && (
          <div className='text-center'>
            <Empty />
            <TextSmall className='my-3'>
              You don&apos;t have any sites created.
              <br />
              <CustomLink
                href='/new'
                noInvert
                className='my-3 mx-auto max-w-sm'
              >
                Create your first documentation site
              </CustomLink>
            </TextSmall>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
