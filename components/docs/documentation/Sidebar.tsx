import Link from 'next/link';

const Sidebar: React.FC<{ sidebar: string[]; slug: string }> = ({
  sidebar,
  slug,
}) => {
  return (
    <ul className='mt-10 space-y-4'>
      {sidebar.map((file) => {
        return (
          <li key={file}>
            <Link href={`/${slug}/docs/${file}`}>
              <a className='block rounded px-3 py-2 capitalize hover:bg-gray-50 dark:hover:bg-gray-800'>
                {file.replace(/-/gi, ' ')}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
