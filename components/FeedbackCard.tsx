import { Feedback, NavbarLink, Site } from '@prisma/client';
import axios from 'axios';
import { formatRelative } from 'date-fns';
import truncate from 'lodash.truncate';
import toast from 'react-hot-toast';
import ReactStars from 'react-stars';
import { KeyedMutator, mutate } from 'swr';
import { Button } from './ui/Button';
import { DialogContent, DialogRoot, DialogTrigger } from './ui/Dialog';
import { Markdown, TextSmall } from './ui/Typography';

const FeedbackCard: React.FC<{
  feedback: Feedback;
  mutate: KeyedMutator<
    Site & {
      navbarLinks: NavbarLink[];
      feedbacks: Feedback[];
    }
  >;
  data: Site & {
    navbarLinks: NavbarLink[];
    feedbacks: Feedback[];
  };
}> = ({ feedback, mutate, data }) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button noInvert className='w-full py-1 shadow'>
          <div className='flex items-center justify-between p-3'>
            <ReactStars edit={false} size={20} value={feedback.stars} />
            <TextSmall className='text-left font-semibold'>
              {truncate(feedback.feedback, {
                length: 50,
              })}
            </TextSmall>
            <TextSmall>
              {formatRelative(
                new Date(feedback.createdAt),
                new Date()
                // make first letter caps
              ).replace(/^./, (str) => str.toUpperCase())}
            </TextSmall>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        title='Feedback'
        description={`Submitted on ${formatRelative(
          new Date(feedback.createdAt),
          new Date()
        )}`}
      >
        <div className='mt-8 space-y-6'>
          <div>
            <p className='text-lg font-semibold'>Feedback</p>
            <TextSmall>{feedback.feedback}</TextSmall>
          </div>
          <div>
            <p className='text-lg font-semibold'>Rating</p>
            <TextSmall>{feedback.stars}</TextSmall>
          </div>
          <div>
            <p className='text-lg font-semibold'>Submitted by</p>
            <TextSmall>
              <Markdown text={feedback?.sentBy || '*Not provided*'} />
            </TextSmall>
          </div>
          <Button
            onClick={() => {
              const req = axios
                .post('/api/delete/feedback', {
                  feedbackId: feedback.id,
                })
                .then(() => {
                  mutate({
                    ...data,
                    feedbacks: data.feedbacks.filter(
                      (f) => f.id !== feedback.id
                    ),
                  });
                });
              toast.promise(req, {
                loading: 'Deleting feedback...',
                success: 'Feedback deleted!',
                error: 'Error deleting feedback',
              });
            }}
            className='!border-red-500 !text-red-500'
            noInvert
          >
            Delete this feedback
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};

export default FeedbackCard;
