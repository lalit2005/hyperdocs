import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown, ChevronRight } from 'react-feather';

export const Accordion = (props: any) => (
  <RadixAccordion.Root type='multiple' className='not-prose'>
    {props?.values?.map((value: any, index: number) => (
      <RadixAccordion.Item
        key={index}
        value={index.toString()}
        className='my-1 w-full rounded-sm bg-slate-200 dark:bg-slate-800'
      >
        <div className='px-5 py-2'>
          <RadixAccordion.Trigger className='flex w-full items-center justify-between text-left'>
            <p>{value?.title}</p>
            <ChevronRight />
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className='mt-2 text-base text-slate-700 dark:text-slate-400'>
            {value?.content}
          </RadixAccordion.Content>
        </div>
      </RadixAccordion.Item>
    ))}
  </RadixAccordion.Root>
);
