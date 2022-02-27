import Nav from '@/components/Nav';
import type { NextPage } from 'next';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import Image from 'next/image';
import LandingPageImage from '../public/landing-page-image.png';
import Hyperdocs3d from '../public/hyperdocs-3d.png';
import clsx from 'clsx';
import {
  Zap,
  Download,
  Edit,
  Terminal,
  MessageSquare,
  GitHub,
  Moon,
  Box,
} from 'react-feather';
import WorkflowSvg from '@/components/WorkflowSvg';
import { Markdown } from '@/components/ui/Typography';
import { CustomLink } from '@/components/ui/Link';

const Home: NextPage = () => {
  const gradient = 'bg-gradient-to-r text-transparent bg-clip-text';

  return (
    <div>
      <Nav />
      <div>
        <p className='mb-2 text-center text-sm font-semibold uppercase text-slate-500 dark:text-slate-400'>
          Open source. Free forever
        </p>
        <h1 className='text-center text-6xl font-black md:text-[80px]'>
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
        <div className='max-w-5xl mx-auto'>
          <Image
            src={LandingPageImage}
            alt=''
            placeholder='blur'
            className='rounded-lg shadow-2xl'
          />
        </div>
      </div>

      <div className='px-10 max-w-7xl mx-auto mt-40 mb-10'>
        <div>
          <h2 className='text-7xl font-extrabold'>
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
              className='p-7 rounded shadow-lg border dark:border-slate-800'>
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
        <div className='mt-32'>
          <h3 className='text-7xl font-extrabold max-w-3xl'>
            <span className='opacity-40 mb-2'>Building docs is boring.</span>
            <br />
            <span>
              But Hyperdocs makes docs{' '}
              <span
                className={clsx(
                  gradient,
                  'from-cyan-500 to-slate-100 dark:from-[#61f4de] dark:to-slate-900'
                )}>
                fun and intuitive
              </span>
            </span>
          </h3>
          <p className='text-lg opacity-70 mt-2 max-w-3xl'>
            Just focus on content. Hyperdocs will take care of hosting, feedback
            collection, blog management, SEO, lighthouse score and many more.{' '}
            <RoughNotation
              type='underline'
              strokeWidth={2}
              animationDuration={2000}
              color='rgb(129 140 248)'
              animate
              show>
              <span>Just push to GitHub and it&apos;s done.</span>
            </RoughNotation>
          </p>
          <WorkflowSvg />
        </div>
      </div>
      <div className='w-full py-16'>
        <div className='max-w-7xl mx-auto'>
          <h3 className='text-7xl font-extrabold'>
            <span className={clsx(gradient, 'from-[#1dbde6] to-[#f1515e]')}>
              Prebuilt components{' '}
            </span>
            <Box
              className='inline-block relative -top-1'
              strokeWidth={3}
              size={40}
            />
          </h3>
          <p className='mt-3 max-w-3xl text-lg opacity-70'>
            <Markdown
              text='Hyperdocs has many prebuilt components that you can just start
            using right away in your markdown files.'
            />
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 mt-10'>
            {[
              'Tooltips',
              'JSX',
              'Code playgrounds',
              'Callouts',
              'And much more...',
            ].map((name) => (
              // TODO: link to docs
              <div key={name} className='p-4'>
                <h3 className='text-xl border dark:border-slate-800 font-semibold px-4 py-6 rounded bg-white dark:bg-black text-black dark:text-white h-full flex justify-center items-center text-center'>
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto mt-20'>
        <h3 className=' font-extrabold text-7xl'>
          No more{' '}
          <span
            className={clsx(
              gradient,
              'from-[#6274e7] to-[#8752a3]'
            )}>{`{ config }`}</span>
        </h3>
        <p className='text-lg my-3 opacity-70 max-w-3xl'>
          Every documentation generator needs a separate <code>`.json`</code>{' '}
          config file to function properly. Although Hyperdocs works without any
          config, you can add a <code>`_sidebar.txt`</code> file to customize
          the order in which links appear in sidebar.
        </p>
        {/* // TODO: add image */}
      </div>
      <div className='mt-20 max-w-7xl mx-auto text-invert rounded-xl py-10 shadow-xl mb-5'>
        <h3
          className={clsx(
            gradient,
            'text-7xl font-extrabold from-[#f44369] to-[#3e3b92] text-center'
          )}>
          Supercharge your docs now
        </h3>

        <div className='text-invert max-w-xs mx-auto flex flex-wrap justify-around'>
          <CustomLink
            href='/new'
            className='text-center text-2xl font-semibold !p-4 mt-10 shadow-2xl hover:scale-105 transition-all'>
            Get started now →
          </CustomLink>
        </div>
      </div>
      <div className='mt-20 max-w-xl mx-auto'>
        <Image src={Hyperdocs3d} alt='' className='dark:invert' />
      </div>
      <footer className='px-10 py-5 border-t dark:border-slate-700 mt-10'>
        <div>
          <a
            className='text-blue-500 hover:text-blue-700'
            rel='noopener noreferrer'
            href='https://lalit2005.hashnode.dev/hyperdocs'>
            Made by lalit
          </a>
        </div>
      </footer>
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
      'Spend a minute on setup and forget the rest. Just keep updating the `docs/` folder and the website will auto update automagically.',
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
