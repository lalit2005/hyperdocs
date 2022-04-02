import { useRef } from 'react';
import { Clipboard } from 'react-feather';

const HomepageMDXcomponents = {
  pre: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLPreElement>(null);

    return (
      <pre ref={ref} {...props} className='relative'>
        <button
          className='absolute right-3 top-2 inline-block'
          onClick={() => copyToClipboard(ref.current?.textContent)}
        >
          <Clipboard className='h-6 w-6 text-gray-400 transition-all hover:scale-105 hover:text-gray-50' />
        </button>
        {props?.children}
      </pre>
    );
  },

  Hero1: (props: any) => {
    return (
      <div className='px-10 text-center'>
        <h1 className='mt-32 text-6xl font-extrabold md:text-7xl'>
          {props?.heading}
        </h1>
        <p className='mt-5 text-xl text-gray-600 dark:text-gray-300'>
          {props?.description}
        </p>
      </div>
    );
  },
  Hero2: (props: any) => {
    return (
      <div className='px-10 text-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.logo} alt='' className='mx-auto mt-24 h-52 w-52' />
        <h1 className='mt-10 text-6xl font-black md:text-7xl'>
          {props?.heading}
        </h1>
        <p className='mt-5 text-xl text-gray-600 dark:text-gray-300'>
          {props?.description}
        </p>
      </div>
    );
  },
  Features1: (props: any) => {
    return (
      <div className='mx-20 mt-32'>
        <h2 className='text-center text-4xl font-bold'>Features</h2>
        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3'>
          {props.features.map(
            (
              feature: { title?: string; description?: string },
              index: number
            ) => (
              <div
                key={index}
                className='w-full rounded border border-gray-300 p-5 text-center shadow dark:border-gray-700'
              >
                <h3 className='text-2xl font-bold'>{feature?.title}</h3>
                <p className='text-light mt-6 text-lg'>
                  {feature?.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  },
};

function copyToClipboard(children: string | null | undefined): void {
  window.navigator.clipboard.writeText(children || '');
}

export default HomepageMDXcomponents;
