import Logo from '@/components/Logo';
import { Heading1, Heading2 } from '@/components/ui/Typography';
import { RedirectToDashboard } from '@/lib/redirect';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { CheckCircle, GitHub } from 'react-feather';

const Signup = () => {
  const { theme } = useTheme();
  return (
    <div>
      <RedirectToDashboard />
      <div className='grid h-screen grid-cols-2'>
        <div className='mt-20 ml-7 px-14'>
          <span className='inline-block'>
            <Logo />
          </span>
          {/* <h2 className='mt-5 text-4xl font-bold'>
          </h2> */}
          <Heading2 className='mt-5'>
            Start making beautiful docs <br /> without any hassle
          </Heading2>
          <div>
            <ul className='mt-10 max-w-sm space-y-7 text-lg opacity-90'>
              {features.map((feature, index) => (
                <li key={index}>
                  <CheckCircle className='mr-3 inline text-blue-500 dark:text-blue-400' />
                  <p className='relative -right-10 -top-7'>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='text-invert ml-7 bg-white px-14 pt-[33vh]'>
          <div className='flex flex-col items-center justify-center text-center'>
            <Heading1>Sign up</Heading1>
            <button
              onClick={() => signIn('github')}
              className={clsx(
                'text-no-invert mt-10 rounded px-5 py-2 text-lg hover:opacity-90',
                theme === 'light' && 'text-no-invert'
              )}
            >
              <GitHub className='mr-2 inline-block' /> Sign up with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

const features = [
  'Just have a docs/ folder with markdown files and a beautiful documentation site will be generated.',
  'Update the `docs/` folder and the website will auto update automagically.',
  'Every docs comes with a feedback widget to help you get better feedback from your users.',
  'You can manage blog posts from the dashboard. No more pushing drafts to GitHub.',
];
