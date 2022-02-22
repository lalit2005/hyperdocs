import clsx from 'clsx';
import Link from 'next/link';

const Grid: React.FC<{
  features: {
    color?: string;
    customColor?: string;
    title?: string;
    description?: string;
    link?: string;
  }[];
}> = ({ features }) => {
  return (
    <div className='grid md:grid-cols-2 gap-5 !text-black not-prose'>
      {features.map(({ color, title, description, customColor, link }, i) => (
        <Link key={i} href={link || '#'}>
          <a className='block'>
            <div
              className={clsx(
                'rounded-lg shadow-md hover:scale-[1.02] px-4 py-6 transition-all duration-75 h-full',
                color === 'blue' && 'bg-blue-400',
                color === 'cyan' && 'bg-cyan-400',
                color === 'green' && 'bg-green-400',
                color === 'red' && 'bg-red-400',
                color === 'yellow' && 'bg-yellow-400',
                color === 'purple' && 'bg-purple-400',
                color === 'teal' && 'bg-teal-400',
                color === 'orange' && 'bg-orange-400',
                color === 'gray' && 'bg-gray-400'
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
