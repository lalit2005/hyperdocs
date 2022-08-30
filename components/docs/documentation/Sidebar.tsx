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
    <ul
      className={clsx(
        'space-y-3',
        sidebarItems[0].startsWith('- ') ? '' : 'mt-10'
      )}>
      {sidebarItems.map((file, index) => {
        if (file.startsWith('- ')) {
          return (
            <p
              key={index}
              className='block px-3 pt-10 text-sm font-semibold text-gray-800 dark:text-gray-100'>
              {file.substring(2)}
            </p>
          );
        } else {
          return (
            <li key={file}>
              <Link href={`/${slug}/docs/${file}`}>
                <a
                  className={clsx(
                    'block rounded-sm px-3 py-1 capitalize text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800',
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
