import clsx from 'clsx';
import Link from 'next/link';

const Grid: React.FC<{
  items: {
    color?: string;
    customColor?: string;
    title?: string;
    description?: string;
    link?: string;
  }[];
}> = ({ items }) => {
  return (
    <div className='grid md:grid-cols-2 gap-5 !text-black not-prose'>
      {items?.map(({ color, title, description, customColor, link }, i) => (
        <Link key={i} href={link || '#'}>
          <a className='block'>
            <div
              className={clsx(
                'rounded-lg shadow-md hover:scale-[1.02] px-4 py-6 transition-all duration-75 h-full bg-gradient-to-tr',
                color === 'blue' && 'from-blue-500 to-blue-200',
                color === 'cyan' && 'from-cyan-500 to-cyan-200',
                color === 'green' && 'from-green-500 to-green-200',
                color === 'red' && 'from-red-500 to-red-200',
                color === 'yellow' && 'from-yellow-500 to-yellow-200',
                color === 'purple' && 'from-purple-500 to-purple-200',
                color === 'teal' && 'from-teal-500 to-teal-200',
                color === 'orange' && 'from-orange-500 to-orange-200',
                color === 'gray' && 'from-gray-500 to-gray-200'
              )}
              style={{
                backgroundColor: customColor && customColor,
              }}>
              <h3 className='text-2xl font-bold mb-4'>{title}</h3>
              <p className='text-base'>{description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Grid;
