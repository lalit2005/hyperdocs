import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown, ChevronRight } from 'react-feather';

export const Accordion = (props: any) => (
  <RadixAccordion.Root type='multiple' className='not-prose'>
    {props?.values?.map((value: any, index: number) => (
      <RadixAccordion.Item
        key={index}
        value={index.toString()}
        className='w-full bg-slate-200 dark:bg-slate-800 rounded-sm my-1'>
        <div className='px-5 py-2'>
          <RadixAccordion.Trigger className='w-full flex justify-between text-left items-center'>
            <p>{value?.title}</p>
            <ChevronRight />
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className='text-base text-slate-700 dark:text-slate-400 mt-2'>
            {value?.content}
          </RadixAccordion.Content>
        </div>
      </RadixAccordion.Item>
    ))}
  </RadixAccordion.Root>
);
