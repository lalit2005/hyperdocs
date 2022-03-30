import { useState } from 'react';

const Loom: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false);
  url = url.replace('share', 'embed');
  return (
    <div>
      <div
        style={{
          position: 'relative',
          paddingBottom: '62.5%',
          height: '0',
        }}
      >
        {isVideoVisible ? (
          <iframe
            src={url}
            frameBorder='0'
            // @ts-ignore
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
            className='rounded-lg'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        ) : (
          <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg bg-slate-600'>
            <p className='relative top-1/3 select-none text-lg font-bold text-slate-200 sm:text-2xl'>
              {title}
            </p>
            <div
              className='absolute cursor-pointer'
              onClick={() => setIsVideoVisible(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-24 w-24 text-white transition-all hover:scale-125'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loom;
