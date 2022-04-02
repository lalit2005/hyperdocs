import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReactStars from 'react-stars';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Button } from '../ui/Button';
import { DialogContent, DialogRoot, DialogTrigger } from '../ui/Dialog';
import { Input } from '../ui/Input';

const Feedback: React.FC<{ siteId: string }> = ({ siteId }) => {
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);

  return (
    <div className='max-w-sm pb-1 text-sm'>
      <ReactTextareaAutosize
        className='relative left-1 rounded border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-500'
        placeholder='Any feedbacks or ideas to improve the docs?'
        minRows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <div className='relative right-2 flex items-center justify-around'>
        <ReactStars
          className='my-1 scale-[1.4]'
          value={stars}
          onChange={(val) => setStars(val)}
          half={false}
        />
        <DialogRoot>
          <DialogTrigger>
            <div>
              <Button noInvert>Submit</Button>
            </div>
          </DialogTrigger>
          <DialogContent
            title='Email?'
            description='Would you like to provide your email so that we can get back to you?'
          >
            <form
              className='flex'
              onSubmit={(e) => {
                e.preventDefault();
                if (feedback.length === 0) {
                  toast.error('Please provide a valid feedback.');
                  return;
                }
                // if feedback contains only whitespace, don't send
                if (feedback.trim().length === 0) {
                  toast.error('Please provide a valid feedback.');
                  return;
                }
                if (stars === 0) {
                  toast.error('Please rate the docs first');
                  return;
                }
                if (feedback.length > 0) {
                  const req = axios.post('/api/create/feedback', {
                    feedback,
                    stars,
                    sentBy: e.currentTarget.sentBy?.value,
                    siteId,
                  });
                  toast.promise(req, {
                    success: 'Feedback sent!',
                    error: 'Error sending feedback',
                    loading: 'Sending feedback...',
                  });
                }
              }}
            >
              <Input
                placeholder='Email (optional)'
                className='mr-2 w-full'
                type='email'
                name='sentBy'
              />
              <Button type='submit'>Submit</Button>
            </form>
          </DialogContent>
        </DialogRoot>
      </div>
    </div>
  );
};

export default Feedback;
