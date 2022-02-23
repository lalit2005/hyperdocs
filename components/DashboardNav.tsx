import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

const DashboardNav: React.FC<{ className?: string }> = ({ className }) => {
  const { data } = useSession();

  return (
    <nav
      className={clsx(
        'sticky top-0 z-10 mb-20 bg-white/50 backdrop-blur-sm backdrop-filter dark:bg-black/50',
        className
      )}>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo href='/dashboard' />
        </div>
        <div>
          <ul className='py-5'>
            <ProfileDropdown />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
