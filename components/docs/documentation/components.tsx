import { useRef } from 'react';
import * as FeatherIcons from 'react-feather';
import { Accordion } from './Accordion';
import Callout from './Callout';
import Tooltip from './Tooltip';
import { Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import { RoughNotation } from 'react-rough-notation';
import Grid from './Grid';
import Head from 'next/head';
import DocsLink from './Link';

const DocsMDXcomponents = {
  pre: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLPreElement>(null);

    return (
      <pre ref={ref} {...props} className='relative'>
        <button
          className='absolute right-3 top-2 inline-block'
          onClick={() => copyToClipboard(ref.current?.textContent)}>
          <FeatherIcons.Clipboard className='h-6 w-6 text-slate-400 transition-all hover:scale-105 hover:text-slate-50' />
        </button>
        {props?.children}
      </pre>
    );
  },
  a: DocsLink,
  Callout: Callout,
  Tooltip: Tooltip,
  Icons: FeatherIcons,
  Accordion: Accordion,
  Sandpack: Sandpack,
  RoughNotation: RoughNotation,
  Grid: Grid,
  Head: Head,
};

function copyToClipboard(children: string | null | undefined): void {
  window.navigator.clipboard.writeText(children || '');
}

export default DocsMDXcomponents;
