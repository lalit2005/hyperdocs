import Logo from '@/components/Logo';
import { Heading1, Heading2 } from '@/components/ui/Typography';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { CheckCircle, GitHub } from 'react-feather';

const Signup = () => {
  const { theme } = useTheme();
  return (
    <div>
      {/* // TODO: <RedirectToDashboard /> */}
      <div className='grid grid-cols-2 h-screen'>
        <div className='mt-20 px-14 ml-7'>
          <span className='inline-block'>
            <Logo />
          </span>
          {/* <h2 className='mt-5 text-4xl font-bold'>
          </h2> */}
          <Heading2 className='mt-5'>
            Start making beautiful docs <br /> without any hassle
          </Heading2>
          <div>
            <ul className='mt-10 text-lg space-y-7 max-w-sm opacity-90'>
              {features.map((feature, index) => (
                <li key={index}>
                  <CheckCircle className='inline mr-3 text-blue-500 dark:text-blue-400' />
                  <p className='relative -right-10 -top-7'>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='pt-[33vh] px-14 ml-7 bg-white text-invert'>
          <div className='text-center flex flex-col items-center justify-center'>
            {/* <h1 className='text-4xl font-bold'>Sign up</h1> */}
            <Heading1>Sign up</Heading1>
            <button
              onClick={() => signIn('github')}
              className={clsx(
                'mt-10 rounded text-invert px-5 py-2 text-lg hover:opacity-90',
                theme === 'light' && 'text-no-invert'
              )}>
              <GitHub className='inline-block mr-2' /> Sign up with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

const features = [
  'Create a landing page for your docs site from premade templates',
  'Write and publish your blog for your docs from a rich text markdown editor in dashboard.',
  'Switch themes for your directly docs from dashboard.',
  'Manage docs metadata such as docs navbar, analytics scripts, SEO settings, from dashboard.',
];
