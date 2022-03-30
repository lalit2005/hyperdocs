import { CustomLink } from '@/components/ui/Link';
import PrimaryLayout from '@/layouts/PrimaryLayout';
import showcaseSites from 'data/showcase';
import truncate from 'lodash.truncate';

const Showcase = () => {
  return (
    <PrimaryLayout title='Showcase'>
      <p className='mt-5 text-center opacity-70'>
        A collection of awesome documentation sites created with Hyperdocs
      </p>
      <div className='mt-10 grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 md:grid-cols-3'>
        {showcaseSites.map((site) => {
          return (
            <div key={site.name}>
              <CustomLink
                href={site.link}
                target='_blank'
                rel='noopener noreferrer'
                noInvert
                className='inline-flex h-full w-full flex-col justify-between !p-5 transition-all hover:scale-[1.01] focus:scale-[1.01]'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.image} alt='' className='rounded object-cover' />
                <h3 className='mt-4 text-xl font-bold capitalize'>
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
