import Nav from '@/components/Nav';
import { useTheme } from 'next-themes';
import type { NextPage } from 'next';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';

const Home: NextPage = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div>
      <Nav />
      <div>
        <p className='uppercase text-sm text-slate-500 dark:text-slate-400 text-center font-semibold mb-2'>
          Open source. Free forever
        </p>
        <h1 className='md:text-7xl text-6xl text-center font-black'>
          Simplest way to{' '}
          <p className='bg-clip-text text-transparent bg-gradient-to-r from-[#40c9ff] to-[#e81cff] inline'>
            create docs{' '}
          </p>
          <br /> for your open source projects
        </h1>
        <p className='text-center text-2xl mt-10 dark:text-slate-300 text-slate-700'>
          Just add a{' '}
          <code className='dark:text-blue-300 text-blue-600'>`/docs`</code>{' '}
          folder with{' '}
          <code className='dark:text-blue-300 text-blue-600'>`markdown`</code>{' '}
          files and get a hosted,{' '}
          <RoughNotation
            type='underline'
            strokeWidth={2}
            animationDuration={2000}
            color='rgb(129 140 248)'
            animate
            show>
            <span>auto-updating</span>
          </RoughNotation>{' '}
          <br /> documentation website up in less than 30 seconds
        </p>
      </div>

      <div className='grid items-start justify-center gap-8 mt-24'>
        <div className='relative group'>
          <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition filter blur-2xl duration-1000 group-hover:duration-200 animate-tilt'></div>
          <Link href='/signup'>
            <a className='block px-8 py-4 text-2xl font-bold text-white transition-all duration-150 transform bg-blue-500 rounded font-cal hover:scale-105'>
              Get Started <span className='ml-2'>→</span>
            </a>
          </Link>
        </div>
      </div>

      <button onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
        Toggle theme
      </button>
      <p>{theme}</p>
    </div>
  );
};

export default Home;
