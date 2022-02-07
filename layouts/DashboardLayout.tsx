import Logo from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { CustomLink } from '@/components/ui/Link';
import { Heading1, Markdown } from '@/components/ui/Typography';
import ProtectedRoute from '@/lib/ProtectedRoute';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type ActiveTab =
  | 'overview'
  | 'snippet-injection'
  | 'blog'
  | 'feedbacks'
  | 'integrations'
  | 'navbar'
  | 'announcement'
  | 'settings';

interface SideBarLinks {
  name: string;
  href: string;
  active: ActiveTab;
}

const DashboardLayout: React.FC<{
  title: string;
  subtitle: string;
  active: ActiveTab;
}> = ({ title, subtitle, active, ...props }) => {
  const router = useRouter();
  const siteId = router.query.siteId as string;
  const { data } = useSession();

  const sideBarLinks: SideBarLinks[] = [
    {
      name: 'Overview',
      href: `/dashboard/${siteId}`,
      active: 'overview',
    },
    {
      name: 'Snippet injection',
      href: `/dashboard/${siteId}/snippet-injection`,
      active: 'snippet-injection',
    },
    {
      name: 'Blog',
      href: `/dashboard/${siteId}/blog`,
      active: 'blog',
    },
    {
      name: `Feedbacks`,
      href: `/dashboard/${siteId}/feedbacks`,
      active: 'feedbacks',
    },
    {
      name: `Navbar`,
      href: `/dashboard/${siteId}/navbar`,
      active: 'navbar',
    },
    {
      name: `Announcement`,
      href: `/dashboard/${siteId}/announcement`,
      active: 'announcement',
    },
    {
      name: `Settings`,
      href: `/dashboard/${siteId}/settings`,
      active: 'settings',
    },
  ];

  return (
    <ProtectedRoute>
      <div className='w-screen h-screen'>
        <div className='flex flex-row flex-wrap'>
          <aside className='w-full sm:w-1/5'>
            <div className='sticky top-0 w-full'>
              <div className='border-r-2 border-r-slate-200 dark:border-r-slate-800 pt-24 relative h-screen'>
                <div className='absolute top-0 p-4'>
                  <Logo href='/dashboard' />
                </div>
                <ul className='space-y-3 px-4'>
                  {sideBarLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <CustomLink
                          href={link.href}
                          noInvert
                          className={clsx(
                            'border-none',
                            active === link.active &&
                              'font-semibold !bg-slate-100 dark:!bg-slate-700 dark:!text-white'
                          )}>
                          {link.name}
                        </CustomLink>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <div className='absolute bottom-0 w-full inline-block'>
                    <div>
                      <CustomLink
                        href='/dashboard'
                        noInvert
                        className='text-slate-400 hover:font-bold text-sm py-3 block mt-3 border-none px-5 !bg-slate-100 dark:!bg-slate-900'>
                        {'<-'} Go back
                      </CustomLink>
                    </div>
                    <div className='justify-between px-5 py-2 pt-5 bg-slate-100 dark:bg-slate-900 items-center border-t border-t-slate-300 dark:border-t-slate-700'>
                      <ProfileDropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main role='main' className='w-full sm:w-4/5 pt-1 px-2'>
            <div className='pl-16 mt-24'>
              <Heading1>{title}</Heading1>
              <p className='text-lg text-light mt-5 mb-16'>
                <Markdown>{subtitle}</Markdown>
              </p>
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
