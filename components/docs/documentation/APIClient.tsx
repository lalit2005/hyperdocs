import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/Menu';
import axios from 'axios';
import { useState } from 'react';
import { ChevronDown } from 'react-feather';

const APIClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [reqMethod, setReqMethod] =
    useState<'get' | 'post' | 'delete' | 'patch' | 'put'>('get');

  return (
    <div className='w-full rounded dark:bg-slate-800 bg-slate-100 p-5'>
      <div className='flex justify-evenly items-center w-full'>
        <div>
          <MenuRoot isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
            <MenuTrigger>
              <Button noInvert className='uppercase block'>
                <p className='uppercase'>
                  {reqMethod}
                  <ChevronDown className='inline-block ml-3 relative -top-px' />
                </p>
              </Button>
            </MenuTrigger>
            <MenuContent isOpen={isMenuOpen}>
              <MenuItem
                callBack={() => {
                  setReqMethod('get');
                }}
                className='uppercase'>
                Get
              </MenuItem>
              <MenuItem
                callBack={() => {
                  setReqMethod('post');
                }}
                className='uppercase'>
                Post
              </MenuItem>
              <MenuItem
                callBack={() => {
                  setReqMethod('post');
                }}
                className='uppercase'>
                Patch
              </MenuItem>
              <MenuItem
                callBack={() => {
                  setReqMethod('delete');
                }}
                className='uppercase'>
                Delete
              </MenuItem>
              <MenuItem
                callBack={() => {
                  setReqMethod('put');
                }}
                className='uppercase'>
                Put
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
        <Input
          placeholder='https://jsonplaceholder.typicode.com/posts/5'
          className='w-[70%]'
        />
        <div>
          <Button
            className='block'
            onClick={() => {
              axios({});
            }}>
            Send
          </Button>
        </div>
      </div>
      <div className='p-3'>Headers</div>
    </div>
  );
};

export default APIClient;
