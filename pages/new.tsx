import DashboardNav from '@/components/DashboardNav';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Heading1, TextSmall } from '@/components/ui/Typography';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useForm } from 'react-hook-form';
import { NewSite } from 'types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { newSiteSchema } from '@/lib/schemas/newSiteSchema';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';

const NewSite = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<NewSite>({
    resolver: zodResolver(newSiteSchema),
  });

  const createSite = async (data: NewSite) => {
    alert(JSON.stringify(data, null, 2));
    const asd = await axios.post('/api/create/site', {
      ...data,
    });
    alert(JSON.stringify(asd.data, null, 2));
  };

  return (
    <ProtectedRoute>
      <DevTool control={control} />
      <DashboardNav />
      <div className='max-w-6xl mx-auto px-10 -mt-10'>
        <Heading1>
          Create a new{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#696eff] to-[#ff1b6b]'>
            documentation site
          </span>
        </Heading1>
        <div className='mt-16'>
          <form className='max-w-3xl' onSubmit={handleSubmit(createSite)}>
            <label className='my-2 block' htmlFor='siteName'>
              <TextSmall>Name of the new site</TextSmall>
              <input
                className='max-w-xl mt-2 w-full text-input'
                placeholder='Hyperdocs Documentation'
                id='siteName'
                {...register('siteName')}
              />
              {errors.siteName && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.siteName.message}
                </p>
              )}
            </label>
            <br />
            <label className='my-2 block' htmlFor='siteDescription'>
              <TextSmall>Description of the site</TextSmall>
              <textarea
                className='text-input max-w-xl mt-2 w-full'
                placeholder='The simplest way to create docs for your next open source project.'
                id='siteDescription'
                rows={3}
                {...register('siteDescription')}
              />
              {errors.siteDescription && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.siteDescription.message}
                </p>
              )}
            </label>
            <br />
            <label className='mb-10 block' htmlFor='repoLink'>
              <TextSmall>Repository link</TextSmall>
              <input
                className='max-w-xl mt-2 w-full text-input'
                id='repoLink'
                placeholder='https://github.com/lalit2005/hyperdocs'
                {...register('repoLink')}
              />
              {errors.repoLink && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.repoLink.message}
                </p>
              )}
            </label>
            <label className='my-10 block' htmlFor='ogImageUrl'>
              <TextSmall>OG Image URL for this site</TextSmall>
              <input
                className='max-w-xl mt-2 w-full text-input'
                placeholder='https://image.com/my-image.png'
                id='ogImageUrl'
                {...register('ogImageUrl')}
              />
              <TextSmall className='text-xs mt-1'>
                <span
                  onClick={() => {
                    setValue(
                      'ogImageUrl',
                      `https://cdn.statically.io/og/${encodeURIComponent(
                        getValues().siteName
                      )}`
                    );
                  }}>
                  Click here to auto-generate one from title.
                </span>
              </TextSmall>
              {errors.ogImageUrl && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.ogImageUrl.message}
                </p>
              )}
            </label>

            <Button type='submit'>Create site</Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewSite;
