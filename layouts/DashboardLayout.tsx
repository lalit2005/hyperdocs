import Logo from '@/components/Logo';
import ProfileDropdown from '@/components/ProfileDropdown';
import { CustomLink } from '@/components/ui/Link';
import { Heading1, Markdown } from '@/components/ui/Typography';
import ProtectedRoute from '@/lib/ProtectedRoute';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Activity,
  Command,
  Edit3,
  Home,
  IconProps,
  Link2,
  MessageCircle,
  Settings,
  Volume2,
} from 'react-feather';

type ActiveTab =
  | 'overview'
  | 'snippet-injection'
  | 'blog'
  | 'homepage'
  | 'feedbacks'
  | 'integrations'
  | 'navbar'
  | 'announcement'
  | 'settings';

interface SideBarLinks {
  name: string;
  href: string;
  active: ActiveTab;
  Icon: React.FC<IconProps>;
}

const DashboardLayout: React.FC<{
  title: string;
  subtitle: string;
  active: ActiveTab;
}> = ({ title, subtitle, active, ...props }) => {
  const router = useRouter();
  const siteId = router.query.siteId as string;

  const sideBarLinks: SideBarLinks[] = [
    {
      name: 'Overview',
      href: `/dashboard/${siteId}`,
      active: 'overview',
      Icon: Activity,
    },
    {
      name: 'Blog',
      href: `/dashboard/${siteId}/blog`,
      active: 'blog',
      Icon: Edit3,
    },
    {
      name: 'Homepage',
      href: `/dashboard/${siteId}/homepage`,
      active: 'homepage',
      Icon: Home,
    },
    {
      name: 'Snippet injection',
      href: `/dashboard/${siteId}/snippet-injection`,
      active: 'snippet-injection',
      Icon: Command,
    },
    {
      name: `Feedbacks`,
      href: `/dashboard/${siteId}/feedbacks`,
      active: 'feedbacks',
      Icon: MessageCircle,
    },
    {
      name: `Navbar`,
      href: `/dashboard/${siteId}/navbar`,
      active: 'navbar',
      Icon: Link2,
    },
    {
      name: `Announcement`,
      href: `/dashboard/${siteId}/announcement`,
      active: 'announcement',
      Icon: Volume2,
    },
    {
      name: `Settings`,
      href: `/dashboard/${siteId}/settings`,
      active: 'settings',
      Icon: Settings,
    },
  ];

  return (
    <ProtectedRoute>
      <div className='h-screen w-screen'>
        <div className='flex flex-row flex-wrap'>
          <aside className='w-1/5'>
            <div className='sticky top-0 w-full'>
              <div className='relative h-screen border-r-2 border-r-slate-200 pt-24 dark:border-r-slate-800'>
                <div className='absolute top-0 p-4'>
                  <Logo href='/dashboard' />
                </div>
                <ul className='space-y-3 px-4'>
                  {sideBarLinks.map((link, index) => {
                    const Icon = link.Icon;
                    return (
                      <li key={index}>
                        <CustomLink
                          href={link.href}
                          noInvert
                          className={clsx(
                            'border-none',
                            active === link.active &&
                              '!bg-slate-100 font-semibold dark:!bg-slate-700 dark:!text-white'
                          )}>
                          <Icon className='mr-2 inline-block scale-75 opacity-75 relative -top-px' />
                          <span className='hidden md:inline-block'>
                            {link.name}
                          </span>
                        </CustomLink>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <div className='absolute bottom-0 inline-block w-full'>
                    <div>
                      <CustomLink
                        href='/dashboard'
                        noInvert
                        className='mt-3 mb-[2px] block rounded-none border-none !bg-slate-100 py-3 px-5 text-sm text-slate-400 hover:font-bold dark:!bg-slate-900'>
                        {'<-'}{' '}
                        <span className='hidden sm:inline-block'>Go back</span>
                      </CustomLink>
                    </div>
                    <div className='items-center justify-between border-t border-t-slate-300 bg-slate-100 px-5 py-2 pt-5 dark:border-t-slate-700 dark:bg-slate-900'>
                      <ProfileDropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main role='main' className='w-4/5 px-5 pt-1 sm:px-2'>
            <div className=' mt-24 pl-5 sm:pl-16'>
              <Heading1>{title}</Heading1>
              <p className='text-light mt-5 mb-16 max-w-4xl text-lg'>
                <Markdown text={subtitle} />
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
