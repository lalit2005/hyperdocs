import clsx from 'clsx';
import Link from 'next/link';

const Sidebar: React.FC<{
  sidebar: string[];
  slug: string;
  filename?: string;
}> = ({ sidebar, slug, filename }) => {
  // remove all empty strings from the array
  const sidebarItems = sidebar.filter((item) => item);

  return (
    <ul className='mt-10 space-y-4'>
      {sidebarItems.map((file) => {
        if (file.startsWith('- ')) {
          return (
            <p className='block px-3 pt-10 font-semibold text-gray-800 dark:text-gray-100'>
              {file.substring(2)}
            </p>
          );
        } else {
          return (
            <li key={file}>
              <Link href={`/${slug}/docs/${file}`}>
                <a
                  className={clsx(
                    'block rounded px-3 py-2 capitalize text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800',
                    filename === file ? 'bg-gray-100 dark:bg-gray-800' : ''
                  )}>
                  {file.replace(/-/gi, ' ')}
                </a>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Sidebar;
