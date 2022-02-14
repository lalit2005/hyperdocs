import { Heading1, Heading2 } from '@/components/ui/Typography';
import { useRef } from 'react';
import { Clipboard } from 'react-feather';

const HomepageMDXcomponents = {
  pre: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLPreElement>(null);

    return (
      <pre ref={ref} {...props} className='relative'>
        <button
          className='absolute inline-block right-3 top-2'
          onClick={() => copyToClipboard(ref.current?.textContent)}>
          <Clipboard className='h-6 w-6 text-slate-400 hover:text-slate-50 transition-all hover:scale-105' />
        </button>
        {props?.children}
      </pre>
    );
  },

  Hero1: (props: any) => {
    return (
      <div className='text-center px-10'>
        <h1 className='mt-32 text-6xl md:text-7xl font-extrabold'>
          {props?.heading}
        </h1>
        <p className='text-xl text-slate-600 dark:text-slate-300 mt-5'>
          {props?.description}
        </p>
      </div>
    );
  },
  Hero2: (props: any) => {
    return (
      <div className='text-center px-10'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.logo} alt='' className='w-52 h-52 mx-auto mt-24' />
        <h1 className='mt-10 text-6xl md:text-7xl font-black'>
          {props?.heading}
        </h1>
        <p className='text-xl text-slate-600 dark:text-slate-300 mt-5'>
          {props?.description}
        </p>
      </div>
    );
  },
  Features1: (props: any) => {
    return (
      <div className='mt-32 mx-20'>
        <h2 className='text-center text-4xl font-bold'>Features</h2>
        <div className='grid sm:grid-cols-3 grid-cols-1 mt-10 gap-5'>
          {props.features.map(
            (
              feature: { title?: string; description?: string },
              index: number
            ) => (
              <div
                key={index}
                className='w-full rounded shadow border border-slate-300 dark:border-slate-700 p-5 text-center'>
                <h3 className='font-bold text-2xl'>{feature?.title}</h3>
                <p className='mt-6 text-lg text-light'>
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
