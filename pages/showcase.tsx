import { CustomLink } from '@/components/ui/Link';
import PrimaryLayout from '@/layouts/PrimaryLayout';
import showcaseSites from 'data/showcase';
import truncate from 'lodash.truncate';

const Showcase = () => {
  return (
    <PrimaryLayout title='Showcase'>
      <p className='opacity-70 text-center mt-5'>
        A collection of awesome documentation sites created with Hyperdocs
      </p>
      <div className='mt-10 px-10 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3'>
        {showcaseSites.map((site) => {
          return (
            <div key={site.name}>
              <CustomLink
                href={`/dashboard/${site.link}`}
                target='_blank'
                rel='noopener noreferrer'
                noInvert
                className='!p-5 transition-all h-full inline-flex flex-col justify-between w-full hover:scale-[1.01] focus:scale-[1.01]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.image} alt='' className='object-cover rounded' />
                <h3 className='text-xl font-bold mt-4 capitalize'>
                  {site.name}
                </h3>
                <p className='mt-1 dark:text-slate-300'>
                  {truncate(site.desc, {
                    length: 100,
                  })}
                </p>
              </CustomLink>
            </div>
          );
        })}
      </div>
    </PrimaryLayout>
  );
};

export default Showcase;
