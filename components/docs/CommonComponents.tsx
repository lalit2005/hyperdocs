// this component contains the common components that are used in the docs in all pages:
// docs
// /docs/[file]
// /
// /blog
// /blog/[blogId]

const CommonComponents: React.FC<{
  announcementText?: string;
  announcementUrl?: string;
}> = ({ announcementText, announcementUrl }) => {
  return (
    <>
      {announcementText && announcementUrl && (
        <a
          href={announcementUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='sticky top-0 block bg-blue-500 py-2 text-center text-white'
        >
          {announcementText}
        </a>
      )}
    </>
  );
};

export default CommonComponents;
