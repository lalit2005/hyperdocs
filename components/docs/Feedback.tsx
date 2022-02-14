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
    <div className='max-w-sm text-sm pb-1'>
      <ReactTextareaAutosize
        className='rounded border border-slate-300 dark:border-slate-500 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative left-1'
        placeholder='Any feedbacks or ideas to improve the docs?'
        minRows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <div className='flex justify-around items-center relative right-2'>
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
            description='Would you like to provide your email so that we can get back to you?'>
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
              }}>
              <Input
                placeholder='Email (optional)'
                className='w-full mr-2'
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
