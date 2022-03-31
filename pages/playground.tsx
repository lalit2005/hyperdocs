import DocsMDXcomponents from '@/components/docs/documentation/components';
import MDXRenderer from '@/components/docs/MDXRenderer';
import { Button } from '@/components/ui/Button';
import { Heading1, Markdown, TextSmall } from '@/components/ui/Typography';
import axios from 'axios';
import clsx from 'clsx';
import { getMDXComponent } from 'mdx-bundler/client';
import { useRouter } from 'next/router';
import { gradient } from '@/components/gradient';
import { useMemo, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { ArrowDown } from 'react-feather';
import HomepageMDXComponents from '@/components/docs/homepage/components';

const Playground = () => {
  const DEFAULT_MDX_Code =
    'var Component=(()=>{var m=Object.create;var c=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty;var i=n=>c(n,"__esModule",{value:!0});var _=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),f=(n,t)=>{for(var e in t)c(n,e,{get:t[e],enumerable:!0})},a=(n,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of d(t))!l.call(n,o)&&(e||o!=="default")&&c(n,o,{get:()=>t[o],enumerable:!(r=x(t,o))||r.enumerable});return n},g=(n,t)=>a(i(c(n!=null?m(j(n)):{},"default",!t&&n&&n.__esModule?{get:()=>n.default,enumerable:!0}:{value:n,enumerable:!0})),n),M=(n=>(t,e)=>n&&n.get(t)||(e=a(i({}),t,1),n&&n.set(t,e),e))(typeof WeakMap!="undefined"?new WeakMap:0);var u=_((L,p)=>{p.exports=_jsx_runtime});var C={};f(C,{default:()=>h});var s=g(u());function b(n={}){let{wrapper:t}=n.components||{};return t?(0,s.jsx)(t,Object.assign({},n,{children:(0,s.jsx)(e,{})})):e();function e(){let r=Object.assign({p:"p"},n.components);return(0,s.jsx)(r.p,{children:"Enter mdx in above textarea and click on \'Preview\' button. \\n The first load might take some time as this service does not runs on a serverless function."})}}var h=b;return M(C);})(); ;return Component;';

  const [mdxString, setMdxString] = useState('');
  const router = useRouter();

  const [mdxCode, setMdxCode] = useState(DEFAULT_MDX_Code);
  const Component = useMemo(() => getMDXComponent(mdxCode), [mdxCode]);

  return (
    <div className='mx-auto max-w-4xl'>
      <Heading1 className={clsx(gradient, 'my-10 from-blue-400 to-green-400')}>
        Hyperdocs mdx preview
      </Heading1>
      <TextSmall className='my-10'>
        <Markdown
          text='Paste and check out bits of code here to see if the markdown has no
        syntax errors. You can also test out [homepage](hyperdocs/docs/homepage) components here!'
        />
      </TextSmall>
      <ReactTextareaAutosize
        minRows={20}
        className='w-full border-none bg-white font-mono focus:outline-none dark:bg-black'
        placeholder='Enter your markdown(mdx) here'
        value={mdxString}
        onChange={(e) => setMdxString(e.target.value)}
      />
      <Button
        onClick={() => {
          const req = axios.post(
            'https://hyperdocs-playground.lalitvijay9480.repl.co/mdx',
            { mdxString }
          );
          req.then((res) => {
            // window.open(res.data.url, '_blank');
            setMdxCode(res.data.mdxCode);
          });
        }}
      >
        Preview{' '}
        <ArrowDown className='relative -top-[2px] inline-block' size={20} />
      </Button>
      <hr className='my-10' />
      <div>
        <MDXRenderer>
          <Component
            // @ts-ignore
            components={{ ...DocsMDXcomponents, ...HomepageMDXComponents }}
          />
        </MDXRenderer>
      </div>
    </div>
  );
};

export default Playground;
