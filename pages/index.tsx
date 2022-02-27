import Nav from '@/components/Nav';
import type { NextPage } from 'next';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import Image from 'next/image';
import LandingPageImage from '../public/landing-page-image.png';
import { Fade } from 'react-awesome-reveal';
import clsx from 'clsx';
import {
  Zap,
  Download,
  Edit,
  Terminal,
  MessageSquare,
  GitHub,
} from 'react-feather';

const Home: NextPage = () => {
  const gradient = 'bg-gradient-to-r text-transparent bg-clip-text';

  return (
    <div>
      <Nav />
      <div>
        <p className='mb-2 text-center text-sm font-semibold uppercase text-slate-500 dark:text-slate-400'>
          Open source. Free forever
        </p>
        <h1 className='text-center text-6xl font-black md:text-7xl'>
          Simplest way to{' '}
          <p className='inline bg-gradient-to-r from-[#40c9ff] to-[#e81cff] bg-clip-text text-transparent'>
            create docs{' '}
          </p>
          <br /> for your open source projects
        </h1>
        <p className='mt-10 text-center text-2xl text-slate-700 dark:text-slate-300'>
          Just add a{' '}
          <code className='text-blue-600 dark:text-blue-300'>`/docs`</code>{' '}
          folder with{' '}
          <code className='text-blue-600 dark:text-blue-300'>`markdown`</code>{' '}
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

      <div className='mt-24 grid items-start justify-center gap-8'>
        <div className='group relative'>
          <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-2xl filter transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
          <Link href='/signup'>
            <a className='font-cal block transform rounded bg-blue-500 px-8 py-4 text-2xl font-bold text-white transition-all duration-150 hover:scale-105'>
              Get Started <span className='ml-2'>→</span>
            </a>
          </Link>
        </div>
      </div>

      <div className='mt-24'>
        <Fade direction='up' duration={500}>
          <div className='max-w-5xl mx-auto'>
            <Image
              src={LandingPageImage}
              alt=''
              placeholder='blur'
              className='rounded-lg shadow-xl block'
            />
          </div>
        </Fade>
      </div>

      <div className='px-10 max-w-7xl mx-auto mt-40 mb-10'>
        <div>
          <h2 className='text-5xl font-extrabold'>
            A feature packed <br />
            <span className={clsx(gradient, `from-[#696eff] to-[#f8acff]`)}>
              documentation generator
            </span>
          </h2>
          <p className='mt-3 text-lg text-slate-700 dark:text-slate-300 max-w-2xl'>
            Hyperdocs has all the features you need to create a fully fledged
            documentation website for your open source project.
          </p>
        </div>
        <div className='mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {features.map(({ title, description, Icon }) => (
            <div
              key={title}
              className='p-7 rounded border dark:border-slate-800'>
              <Icon size={25} opacity={0.7} />
              <div className='mt-4'>
                <h3 className='text-xl font-bold'>{title}</h3>
                <p className='text-base mt-1 text-slate-700 dark:text-slate-300'>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

const features = [
  {
    title: 'Hosted docs',
    description:
      'Just have a docs/ folder with markdown files and a beautiful documentation site will be generated.',
    Icon: Zap,
  },
  {
    title: 'Auto updating',
    description:
      'Spend a minute on setup and forget the rest. Just keep updating the docs/ folder and the website will auto update automagically.',
    Icon: Download,
  },
  {
    title: 'Customizable',
    description:
      'You can change the look and feel of your docs with available themes and plugin.',
    Icon: Edit,
  },
  {
    title: 'CLI',
    description:
      'You can use Hyperdocs as a CLI tool to generate your docs and deploy them to your server.',
    Icon: Terminal,
  },
  {
    title: 'Feedback Widget',
    description:
      'Every docs comes with a feedback widget to help you get better feedback from your users.',
    Icon: MessageSquare,
  },
  {
    title: 'GitHub as source',
    description:
      'All your documentation lives on GitHub. So you get all the collab features of GitHub.',
    Icon: GitHub,
  },
];
