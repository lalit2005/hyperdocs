import DashboardNav from '@/components/DashboardNav';
import { Button } from '@/components/ui/Button';
import { Heading1, Heading2, Heading3 } from '@/components/ui/Typography';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { usePrefetch } from 'use-link-prefetch';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { CustomLink } from '@/components/ui/Link';

const SuccessPage = () => {
  const router = usePrefetch([]);
  usePrefetch([`/dashboard/${router.query.siteId}`]);

  useEffect(() => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(
      particleRatio: number,
      opts: {
        spread: number;
        startVelocity?: number;
        decay?: number;
        scalar?: number;
      }
    ) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <ProtectedRoute>
      <DashboardNav />
      <div className='max-w-6xl mx-auto px-10'>
        <div>
          <Heading1>Congratulations!!</Heading1>
          <Heading2 className='mt-5'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#1dbde6] to-[#f1515e]'>
              {'`' + router.query.siteName + '`' || 'Your site'} has been
              created
            </span>
          </Heading2>

          <div className='mt-10 space-y-5 max-w-sm'>
            <div>
              <CustomLink
                href={`/dashboard/${router.query.siteId}`}
                className='inline-block w-full'>
                View dashboard
              </CustomLink>
            </div>
            <div>
              <CustomLink
                href={`/hyperdocs/docs`}
                noInvert
                className='inline-block w-full'>
                View Docs
              </CustomLink>
            </div>
            <div>
              <CustomLink
                href={`/hyperdocs/docs`}
                noInvert
                className='inline-block w-full'>
                View CLI documentation
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SuccessPage;
