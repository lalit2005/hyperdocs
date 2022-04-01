import { CustomLink } from '../ui/Link';

const DocsPageNavCard: React.FC<{
  slug: string;
  pageTitle: string;
  pageSlug?: string;
  title: '&larr; Previous' | 'Next &rarr;';
}> = ({ slug, pageTitle, title, pageSlug }) => {
  return (
    <CustomLink
      href={`/${slug}/docs/${pageTitle}`}
      noInvert
      className='my-3 mx-auto block w-full px-7 !py-5 hover:scale-105 md:mx-0 md:max-w-xs'
    >
      <p className='mb-1 text-left text-xs font-bold uppercase'>{title}</p>
      <p className='capitalize'>{pageSlug || pageTitle.replace(/-/gi, ' ')}</p>
    </CustomLink>
  );
};

export default DocsPageNavCard;
